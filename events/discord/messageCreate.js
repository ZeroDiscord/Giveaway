module.exports = (client, message) => {
    // return if author is a bot
    if (message.author.bot) return;
  
    // return if message does not match prefix (in command)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
  
    // Defining what are arguments and commands
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Get the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If command does not exist return
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args);
};
