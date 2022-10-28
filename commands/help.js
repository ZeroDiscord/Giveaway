const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require("discord.js");
const config = require('../config.json');

module.exports.run = async (client, message, args) => {

const embed = new EmbedBuilder()
.setTitle(`Commands of ${client.user.username}`)
.setColor('#2F3136')
.setDescription('**Please Select a category to view all its commands**')
.addFields({ name: `Links:`, value: `- [Youtube Channel](https://youtube.com/c/Zerosync)\n- [Discord Server](https://discord.gg/ARu4hr6hJw)\n- [GitHub](https://github.com/ZeroDiscord/Giveaway)`, inline: true })
.setTimestamp()
.setFooter({
  text: `Requested by ${message.author.username} | ` + config.copyright, 
  iconURL: message.author.displayAvatarURL()
});

  const giveaway = new EmbedBuilder()
  .setTitle("Categories » Giveaway")
  .setColor('#2F3136')
  .setDescription("```yaml\nHere are the giveaway commands:```")
  .addFields(
    { name: 'Create / Start'  , value: `Start a giveaway in your guild!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Drop' , value: `Start a drop giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Edit' , value: `Edit an already running giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'End' , value: `End an already running giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'List' , value: `List all the giveaways running within this guild!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Pause' , value: `Pause an already running giveaway!\n > **Type: __\`slash\`__**`, inline: true },
    { name: 'Reroll' , value: `Reroll an ended giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
    { name: 'Resume' , value: `Resume a paused giveaway!\n > **Type: __\`slash\`__**`, inline: true },
  )
  .setTimestamp()
  .setFooter({
    text: `Requested by ${message.author.username} | ` + config.copyright, 
    iconURL: message.author.displayAvatarURL()
  });

  const general = new EmbedBuilder()
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
    text: `Requested by ${message.author.username} | ` + config.copyright, 
    iconURL: message.author.displayAvatarURL()
  });
  
  const components = (state) => [
    new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
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
                componentType: ComponentType.SelectMenu,
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
