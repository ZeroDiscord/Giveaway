module.exports.run = async (client, message) => {
    const Discord = require("discord.js");
    const ms = require("ms");

      // If the member doesn't have enough permissions
  if (
    !message.member.permissions.has("ManageMessages") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: You need to have the manage messages permissions to start giveaways."
    );
  }
  
    let time = "";
    let winnersCount;
    let prize = "";
    let giveawayx = "";
    let embed = new Discord.EmbedBuilder()
      .setTitle("Edit A Giveaway!")
      .setColor('#2F3136')
      .setFooter({ 
        text: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL() 
      })
      .setTimestamp();
    const msg = await message.reply({
      embeds:
        [embed.setDescription(
          "Which Giveaway Would You Like To Edit?\nProvide The Giveaway Message's ID\n **Must Reply within 30 seconds!**"
        )]
    }
    );
    let xembed = new Discord.EmbedBuilder()
      .setTitle("Oops! Looks Like We Met A Timeout! 🕖")
      .setColor("#FF0000")
      .setDescription('💥 Snap our luck!\nYou took too much time to decide!\nUse ``edit`` again to edit a giveaway!\nTry to respond within **30 seconds** this time!')
      .setFooter({ 
        text: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL() 
      })
      .setTimestamp();
  
    const filter = m => m.author.id === message.author.id && !m.author.bot;
    const collector = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
  
    collector.on("collect", async collect => {
  
      const response = collect.content;
      let gid = response;
      // check if the ID is valid

      
      await collect.delete()
        if (!client.giveawaysManager.giveaways.find((g) => g.messageID === gid)) {
           return msg.edit({
                embeds: [
                  embed.setDescription(
                    "Uh-Oh! Looks like you provided an Invalid Message ID!\n**Try Again?**\n Example: ``677813783523098627``"
                  )]
              }
              );
        }
      else {
        collector.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `Alright! Next, What Would be our new time for the giveaway to be ended \n** Must Reply within 30 seconds!**`
              )]
          }
          )
        );
      }
      const collector2 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000
      });
      collector2.on("collect", async collect2 => {
  
        let mss = ms(collect2.content);
        await collect2.delete()
        if (!mss) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Aw Snap! Looks Like You Provided Me With An Invalid Duration\n**Try Again?**\n Example: ``-10 minutes``,``-10m``,``-10``\n **Note: - (minus) Inidicates you want to reduce the time!**"
              )]
          }
          );
        } else {
          time = mss;
          collector2.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Alright! Next, How may winners should I roll for the giveaway now?\n**Must Reply within 30 seconds.**`
                )]
            }
            )
          );
        }
        const collector3 = await message.channel.createMessageCollector(filter, {
          max: 3,
          time: 30000,
          errors: ['time']
        });
        collector3.on("collect", async collect3 => {
  
          const response3 = collect3.content.toLowerCase();
          await collect3.delete()
          if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
            return msg.edit({
              embeds: [
                embed.setDescription(
                  "Boi! Winners Must Be A Number or greater than equal to one!\n**Try Again?**\n Example ``1``,``10``, etcetra."
                )]
            }
            );
          } else {
            winnersCount = parseInt(response3);
            collector3.stop(
              msg.edit({
                embeds: [
                  embed.setDescription(
                    `Alright, Generous Human! Next, What should be the new prize for the giveaway?\n**Must Reply within 30 seconds!**`
                  )]
              })
            )
          }
          const collector4 = await message.channel.createMessageCollector(filter, {
          max: 3,
          time: 30000,
          errors: ['time']
        });
          collector4.on("collect", async collect4 => {
  
            const response4 = collect4.content.toLowerCase();
            prize = response4;
            await collect4.delete()
            collector4.stop(
              console.log(giveawayx),
              msg.edit({
                embeds: [
                  embed.setDescription(
                    `Edited`
                  )]
              }
              )
            );
            client.giveawaysManager.edit(gid, {
              newWinnerCount: winnersCount,
              newPrize: prize,
              addTime: time
            })
          });
        });
      });
    });
    collector.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });
      }
    })
    try {
      collector2.on('end', (collected, reason) => {
        if (reason == 'time') {
  
          message.reply({ embeds: [xembed] });
        }
      });
      collector3.on('end', (collected, reason) => {
        if (reason == 'time') {
          message.reply({ embeds: [xembed] });
  
        }
      })
      collector4.on('end', (collected, reason) => {
        if (reason == 'time') {
  
          message.reply({ embeds: [xembed] });
        }
      })
    } catch (e) { }
  }
