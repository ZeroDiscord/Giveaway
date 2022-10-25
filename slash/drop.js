const messages = require("../utils/message");
const {  ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'drop',
    description: 'Create a drop giveaway',
    options: [
        {
            name: 'winners',
            description: 'How many winners the giveaway should have',
            type: ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'prize',
            description: 'What the prize of the giveaway should be',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'channel',
            description: 'The channel to start the giveaway in',
            type: ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to start giveaways.',
                ephemeral: true
            });
        }

        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
      
    if (!giveawayChannel.isTextBased()) {
      return interaction.reply({
        content: ':x: Please select a text channel!',
        ephemeral: true
      });
    }   
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Please select a valid winner count! greater or equal to one.',
      })
    }

        // Start the giveaway
        client.giveawaysManager.start(giveawayChannel, {
            // The number of winners for this drop
            winnerCount: giveawayWinnerCount,
            // The prize of the giveaway
            prize: giveawayPrize,
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ? interaction.user : null,
            // specify drop
            isDrop: true,
            // Messages
            messages
        });

        interaction.reply(`Giveaway started in ${giveawayChannel}!`);

    }
};
