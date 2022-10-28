const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new ButtonBuilder()
        .setLabel('Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/ARu4hr6hJw"),
    )
    let invite = new EmbedBuilder()
     .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
     })  
    .setTitle("Invite & Support Link!")
    .setDescription(`Invite ${client.user} to your server today & enjoy seamless giveaways with advanced features!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter({
      text: `Requested by ${message.author.username} | ` + config.copyright, 
      iconURL: message.author.displayAvatarURL()
    });
    message.reply({ embeds: [invite], components: [row]});
}
