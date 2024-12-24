using ChatWebAPI.Interfaces;
using ChatWebAPI.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace ChatWebAPI.Hubs;

public class ChatHub : Hub<IChatClient>
{
	private readonly IDistributedCache _cache;

	public ChatHub(IDistributedCache cache)
	{
		_cache = cache;
	}

	public async Task JoinChat(UserConnection connection)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);
		var stringConnection = JsonSerializer.Serialize(connection);

		await _cache.SetStringAsync(Context.ConnectionId, stringConnection);
		await Clients.Group(connection.ChatRoom)
			.ReceiveMessage("Admin", $"{connection.UserName} joins this chat.");
	}

	public async Task SendMessage(string message)
	{
		var stringConnection = await _cache.GetAsync(Context.ConnectionId);

		var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);

		if (connection is not null)
		{
			await Clients.Group(connection.ChatRoom)
			.ReceiveMessage(connection.UserName, message);
		}
	}
}
