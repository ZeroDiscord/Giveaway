module.exports = {
    name: "end",
    description: '🎉 End an already running giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The giveaway to end (message ID or giveaway prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You need to have the manage messages permissions to end giveaways.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('giveaway');

        // fetching the giveaway with message Id or prize
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway Id
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found with the corresponding input
        if (!giveaway) {
            return interaction.reply({
                content: 'Unable to find a giveaway for `' + query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'This giveaway has already ended!',
                ephemeral: true
            });
        }

        // Edit the giveaway
        client.giveawaysManager.end(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`**[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** Has Now Ended!`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};