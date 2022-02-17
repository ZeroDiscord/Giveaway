const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  let m = await message.reply("Sending request to websocket...")
  let pong = new Discord.MessageEmbed()
    .setAuthor({
      text: `🏓 Pong!`, 
      iconURL: message.author.displayAvatarURL
    })
    .setTitle("Client's Ping")
    .setColor('#2F3136')	
    .setTimestamp()
    .addField("Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
    .addField("API Latency", `${Math.round(client.ws.ping)}ms`, true)
    .setFooter({
      text: `Requested by ${message.author.tag}`, 
      iconURL: message.author.displayAvatarURL()
      });
     m.delete()
  message.reply({ content: " ", embeds: [pong] })
}
