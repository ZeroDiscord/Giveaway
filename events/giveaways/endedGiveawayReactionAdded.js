const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**Aw snap! Looks Like that giveaway has already ended!**`).catch(e => {})
  }
}