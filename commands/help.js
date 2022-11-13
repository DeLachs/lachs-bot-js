const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('.'),
    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle('Help')
                .addFields(
                    { name: '/quote add', value: 'Creates a new quote.\nSyntax: ``/quote_new quoted: User/UserID text: str``', inline: false },
                    { name: '/quote get', value: 'Gets a quote from the database.\nSyntax: ``/quote get``', inline: false },
                );
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
        catch (error) {
            console.log(error);
            const embed = new EmbedBuilder()
                .setColor('Red')
                .setDescription('The interaction failed if the error persists over 30 minutes contact the developer.');
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
