module.exports = {
	name: 'delete',
	description: ' Delete a giveaway',

	options: [
        {
            name: 'giveaway',
            description: 'The giveaway to delete (message ID or giveaway prize)',
            type: 'STRING',
            required: true
        }
    ],

	run: async (client, interaction) => {
		// If the member doesn't have enough permissions
		if (
			!interaction.member.permissions.has('MANAGE_MESSAGES') &&
			!interaction.member.roles.cache.some(r => r.name === 'Giveaways')
		) {
			return interaction.reply({
				content:
					':x: You need to have the manage messages permissions to delete giveaways.',
				ephemeral: true
			});
		}
    
const query = interaction.options.getString('giveaway');

        // try to find the giveaway with prize alternatively with ID
        const giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        // If no giveaway was found
        if (!giveaway) {
            return interaction.reply({
                content: ':x: Unable to find a giveaway for `' + query + '`.',
                ephemeral: true
            });
        }
    if (!giveaway.ended) {
            return interaction.reply({
                content: ':x: This giveaway has not ended, end it first to delete it!',
                ephemeral: true
            });
        }

        // Delete the giveaway
        client.giveawaysManager.delete(giveaway.messageId)
            // Success message
            .then(() => {
                // Success message
                interaction.reply(`:white_check_mark: Giveaway was succesfully deleted`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};
