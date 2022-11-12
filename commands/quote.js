const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Sequelize } = require('sequelize');
const { Quotes } = require('../dbObjects');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Quote a user on Discord, doesn\'t need to be on this server.')
                .addUserOption(option =>
                    option
                        .setName('quoted')
                        .setDescription('Select a user from this Server or provide a valid user ID.')
                        .setRequired(true))
                .addStringOption(option =>
                    option
                        .setName('text')
                        .setDescription('.')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Returns a quote from the Database.')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'add') {
            const quoted = interaction.options.getUser('quoted');
            const text = interaction.options.getString('text');
            try {
                const quote = await Quotes.create({
                    guild_id: interaction.guild.id,
                    quoted_id: quoted.id,
                    text: text,
                    author_id: interaction.user.id,
                    unix_timestamp: Date.now().valueOf(),
                });
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`**<@${quote.quoted_id}> once said:**\n\n*"${quote.text}"*\n\nQuoted by: <@${quote.author_id}>`)
                    .setTimestamp(quote.unix_timestamp)
                    .setFooter({ text: `#${quote.id}` });
                await interaction.reply({ embeds: [embed] });
            }
            catch (error) {
                console.log(error);
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription('The interaction failed if the error persists over 30 minutes contact the developer.');
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
        else if (interaction.options.getSubcommand() === 'get') {
            try {
                const quotes = await Quotes.findAll({
                    where: { guild_id: interaction.guild.id },
                    order: Sequelize.literal('random()'), limit: 1,
                });
                // i don't want to use this but it works KEKW
                const quote = quotes[0];
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`**<@${quote.quoted_id}> once said:**\n\n*"${quote.text}"*\n\nQuoted by: <@${quote.author_id}>`)
                    .setTimestamp(quote.unix_timestamp)
                    .setFooter({ text: `#${quote.id}` });
                interaction.reply({ embeds: [embed] });
            }
            catch (error) {
                console.log(error);
                const embed = new EmbedBuilder()
                    .setColor('Red')
                    .setDescription('The interaction failed if the error persists over 30 minutes contact the developer.');
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    },
};
