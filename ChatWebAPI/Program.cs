using ChatWebAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy.WithOrigins("http://localhost:5174")
		.AllowAnyHeader()
		.AllowAnyMethod()
		.AllowCredentials();
	});
});

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors();

app.MapHub<ChatHub>("/chat");

app.Run();
