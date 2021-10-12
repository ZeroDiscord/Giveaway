const register = require('../../utils/slashsync');
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });
  // Register slash commands - ( If you are one of those people who read the codes I highly suggest ignoring this because I am very bad at what I am doing, thanks LMAO )
  console.log(`[ / | Slash Command ] - ✅ Loaded all slash commands!`)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`;
  console.log(`[STATUS] ${client.user.tag} is now online!\n[INFO] Bot by ZeroSync https://www.youtube.com/c/ZeroSync\n[Invite Link] ${invite}`);
  const activities = [`All Giveaways Running Smoothly`, `ZeroSync on YouTube`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 20000);

};
