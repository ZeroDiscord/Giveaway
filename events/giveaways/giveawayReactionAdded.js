const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("Entery Approved! | You have a chance to win!!")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been approved!`
    )
    .setFooter("Subscribe to ZeroSync on YT!")
    .setTimestamp()
   let denied =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle(":x: Entery Denied | Databse Entery Not Found & Returned!")
    .setDescription(
      `Your entry to [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) has been denied, please review the requirements to the giveaway properly.`
    )
    .setFooter("Subscribe to ZeroSync on YT!")

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          });
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        });
      }

      return reactor.send({
        embeds: [approved]
      });
    } else {
        return reactor.send({
          embeds: [approved]
        });
    }
    }
  }
