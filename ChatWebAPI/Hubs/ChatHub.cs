using ChatWebAPI.Interfaces;
using ChatWebAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatWebAPI.Hubs;

public class ChatHub : Hub<IChatClient>
{
	public async Task JoinChat(UserConnection connection)
	{
		await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

		await Clients.Group(connection.ChatRoom)
			.ReceiveMessage("Admin", $"{connection.UserName} joins this chat.");
	}
}
