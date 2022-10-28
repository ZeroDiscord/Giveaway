const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.EmbedBuilder()
        .setTimestamp()
        .setTitle('❓ Hold Up Did You Just Remove a Reaction From A Giveaway?')
        .setColor("#2F3136")
        .setDescription(
          `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) was recorded but you un-reacted, since you don't need **${giveaway.prize}** I would have to choose someone else 😭`
        )
        .setFooter({ text: "Think It was a mistake? Go react again!" })
      ]
    }).catch(e => {})

  }
}
