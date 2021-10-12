const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: '🏓Check my ping!',
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#2F3136')	
			.setTitle('Client Ping')
			.addField('**Latency**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
			.addField('**API Latency**', `\`${Math.round(client.ws.ping)}ms\``)
			.setTimestamp()
			.setFooter(`${interaction.user.username}`, interaction.user.avatarURL());
        interaction.reply({
          embeds: [pembed]
        });
    },
};