const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new MessageEmbed()
.setTitle(`Commands of ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**Please Select a category to view all its commands**')
.addField(`Links:`,`- [Youtube Channel](https://youtube.com/c/Zerosync)\n- [Discord Server](https://discord.gg/ARu4hr6hJw)\n- [GitHub](https://github.com/ZeroDiscord/Giveaway)`,true)
.setTimestamp()
.setFooter({
  text: `Requested by ${message.author.username} | GiveawayBot™ v3 By ZeroSync`, 
  iconURL: message.author.displayAvatarURL()
});

  const giveaway = new MessageEmbed()
  .setTitle("Categories » Giveaway")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the giveaway commands:```")
  .addFields(
    { name: '🎉 Çekiliş Başlat'  , value: `Sununucunuzda Çekiliş Başlatırsınız\n > **Types: __\`slash\` / \`çekiliş-başlat\`__**`, inline: true },
    { name: '🎉 Drop' , value: `Sunucunuzda Drop Çekiliş Yaparsınız\n > **Types: __\`slash\` / \`drop\`__**`, inline: true },
    { name: '🎉 Çekiliş Düzenle' , value: `Yaptıgınız Çekilişi Düzenlersiniz\n > **Types: __\`slash\` / \`çekiliş-düzenle\`__**`, inline: true },
    { name: '🎉 Çekiliş Bitir' , value: `Yaptıgınız Çekilişi Bitirirsiniz\n > **Types: __\`slash\` / \`çekiliş-bitir\`__**`, inline: true },
    { name: '🎉 Çekiliş Liste' , value: `Sunucunuzdaki Aktif Çekilişlere Bakarsınız\n > **Types: __\`slash\` / \`çekiliş-liste\`__**`, inline: true },
    { name: '🎉 Çekiliş Durdur' , value: `Aktif Çekilişleri Durdurursunuz\n > **Type: __\`slash\`/ \`çekiliş-durdursunuz\__**`, inline: true },
    { name: '🎉 Yeniden Çek' , value: `Kazanan Kişiyi Yeniden Çekersinjz\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: '🎉 Çekiliş Devam' , value: `Durdurdugunuz Çekilişi Devam Ettirsiniz\n > **Type: __\`slash\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Requested by ${message.author.username} | GiveawayBot™ v3 By ZeroSync`, 
    iconURL: message.author.displayAvatarURL()
  });

  const general = new MessageEmbed()
  .setTitle("Categories » General")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the general bot commands:```")
  .addFields(
    { name: 'Help'  , value: `Shows all available commands to this bot!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Invite' , value: `Get the bot's invite link!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Ping' , value: `Check the bot's websocket latency!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Requested by ${message.author.username} | GiveawayBot™ v3 By ZeroSync`, 
    iconURL: message.author.displayAvatarURL()
  });
  
  const components = (state) => [
    new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("help-menu")
        .setPlaceholder("Please Select a Category")
        .setDisabled(state)
        .addOptions([{
                label: `Giveaways`,
                value: `giveaway`,
                description: `View all the giveaway based commands!`,
                emoji: `🎉`
            },
            {
                label: `General`,
                value: `general`,
                description: `View all the general bot commands!`,
                emoji: `⚙`
            }
        ])
    ),
];

const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector(
            {
                filter,
                componentType: "SELECT_MENU",
                idle: 300000,
                dispose: true,
            });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "giveaway") {
                interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => {});
            } else if (interaction.values[0] === "general") {
                interaction.update({ embeds: [general], components: components(false) }).catch((e) => {});
            }
        });
        collector.on("end", (collected, reason) => {
            if (reason == "time") {
                initialMessage.edit({
                   content: "Collector Destroyed, Try Again!",
                   components: [],
                });
             }
        });
}
