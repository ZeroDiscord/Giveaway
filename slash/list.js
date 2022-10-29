const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'list',
  description: '🎉 List all the active giveaways for this server.',
  run: async (client, interaction) => {
    const select = new Discord.SelectMenuBuilder()
      .setCustomId('select')
      .setPlaceholder('Choose a type of giveaway to view!')
      .addOptions([
        {
          label: '🎉 Normal Giveaways',
          description: 'Check the giveaways currently running in your server!',
          value: 'normal',
        },
      ]);
    const row = new Discord.ActionRowBuilder().addComponents([select]);
    let giveaways = client.giveawaysManager.giveaways.filter(
      (g) => g.guildId === `${interaction.guild.id}` && !g.ended
    );
    if (!giveaways.some((e) => e.messageId)) {
      return interaction.reply('💥 No Giveaways To Be Displayed');
    }
    const msg = await interaction.channel.send({
      embeds: [
        new Discord.EmbedBuilder()
          .setDescription('Choose an option in the select menu to get started!')
          .setColor('#f542ec')
          .setTimestamp(),
      ],
      components: [row],
    });
    let embed = new Discord.EmbedBuilder()
      .setTitle('Currently Active Giveaways')
      .setColor('#f58142')
      .setFooter({
          text: `Requested by ${interaction.user.username} | ` + config.copyright,
          iconURL: interaction.user.displayAvatarURL()
      })
      .setTimestamp();
    const filter = (x) =>
      x.customId == 'select' && x.user.id == interaction.member.id;
    const collector = await interaction.channel.createMessageComponentCollector(
      { filter, time: 60000, max: 1 }
    );
    await interaction.deferReply();
    collector.on('collect', async (i) => {
      const val = i.values[0];
      if (val == 'normal') {
        await Promise.all(
          giveaways.map(async (x) => {
            embed.addFields({ name:
              `Normal Giveaway:`, value: `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nStarted:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`
              });
          })
        );
        msg.delete();
        interaction.editReply({ embeds: [embed], components: [] });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == 'time') {
        interaction.editReply({
          content: 'Collector Destroyed, Try Again!',
          components: [],
        });
      }
    });
  },
};