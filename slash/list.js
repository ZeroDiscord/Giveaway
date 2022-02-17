const Discord = require("discord.js")

module.exports = {
    name: 'list',
    description: '🎉 List all the active giveaways for this guild.',
    run: async (client, interaction) => {
        const select = new Discord.MessageSelectMenu().setCustomId("select").setPlaceholder("Choose a type of giveaway to view!").addOptions([
            {
              label: '🎉 Normal Giveaways',
              description: 'Check the normal giveaways currently running in your server!',
              value: 'normal',
            },
            {
              label: "⚙ Guild Requirement Giveaways!",
              description: "Check the giveaways running with a guild requirement!",
              value: "guildReq"
            },
          ])
          const row = new Discord.MessageActionRow().addComponents([select])
          let giveaways = client.giveawaysManager.giveaways.filter(g => g.guildId === `${interaction.guild.id}` && !g.ended);
          if (!giveaways.some(e => e.messageId)) {
            return interaction.reply('💥 No Giveaways To Be Displayed')
          }
  const msg = await interaction.channel.send({ embeds: [new Discord.MessageEmbed().setDescription("Choose an option in the select menu to get started!").setColor("#2F3136").setTimestamp()], components: [row] })
          let embed = new Discord.MessageEmbed()
            .setTitle("Currently Active Giveaways")
            .setColor("#2F3136")
            .setFooter({
               text: `Requested by ${interaction.user.username} | GiveawayBot™ v3 By ZeroSync`,
               iconURL: interaction.user.displayAvatarURL()
            })
            .setTimestamp()
          let embedGuild = new Discord.MessageEmbed()
            .setTitle("Currently Active Join Requirement Giveaways")
            .setColor("#2F3136")
            .setFooter({
               text: `Requested by ${interaction.user.username} | GiveawayBot™ v3 By ZeroSync`,
               iconURL: interaction.user.displayAvatarURL()
            })
          .setTimestamp()
          const filter = x => x.customId == "select" && x.user.id == interaction.member.id
          const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 60000, max: 1 })
          await interaction.deferReply()
          collector.on("collect", async (i) => {
            const val = i.values[0]
            if (val == "normal") {
              await Promise.all(giveaways.map(async (x) => {
                embed.addField(`Normal Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})\nStarted:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
              }));
              msg.delete()
              interaction.editReply({ embeds: [embed], components: [] })
            }
            if (val == "guildReq") {
               if (val == "guildReq") {
              if (!giveaways.some(e => e.extraData)){  interaction.editReply({ content: '💥 No Giveaways To Be Displayed', embeds: [], components: [] })
               msg.delete()
               return
            }
               }
              await Promise.all(giveaways.map(async (x) => {
                if (x.extraData) {
                  const guild = client.guilds.cache.get(x.extraData.server)
                  const channel = guild.channels.cache
                    .filter((channel) => channel.type === 'text')
                    .first()
                  const inv = await channel.createInvite()
                  embedGuild.addField(`Join Requirement Giveaway:`, `**Prize:** **[${x.prize}](https://discord.com/channels/${x.guildId}/${x.channelId}/${x.messageId})**\n**Requirement: [This Server](${inv})**\n**Started:** <t:${((x.startAt)/1000).toFixed(0)}:R> (<t:${((x.startAt)/1000).toFixed(0)}:f>)\n**Ends:** <t:${((x.endAt)/1000).toFixed(0)}:R> (<t:${((x.endAt)/1000).toFixed(0)}:f>)`)
                }
              }));
              msg.delete()
              interaction.editReply({ embeds: [embedGuild], components: [] })
              
            }
          })
          collector.on("end",(collected, reason) => {
            if(reason == "time"){
         interaction.editReply({ content: "👀 Collector Destroyed, Try Again!", components: [] })
            }
        })  
    },
};
