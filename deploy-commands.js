const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

// load envs
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const nodeEnv = process.env.NODE_ENV;

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreching ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        let data;
        if (nodeEnv == 'production') {
            data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
        }
        else {
            data = await rest.put(
                Routes.applicationCommands(clientId, guildId),
                { body: commands },
            );
        }

        console.log(`Sucessfully reloaded ${data.length} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();