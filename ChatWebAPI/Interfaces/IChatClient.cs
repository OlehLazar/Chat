namespace ChatWebAPI.Interfaces;

public interface IChatClient
{
	public Task RecieveMessage(string userName, string message);
}
