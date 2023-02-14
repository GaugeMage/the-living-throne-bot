require('dotenv').config();

const {Client, Partials, ApplicationCommandOptionType} = require('discord.js');

const client = new Client({intents: 65531, partials: [Partials.Channel, Partials.Message]});
const PREFIX = process.env.PREFIX;

client.on('ready', async() => {
    console.log(`${client.user.tag} has logged in`);

    let commands = client.application?.commands;

    commands?.create({
        name: 'roll',
        description: 'Roll Dice',
        options: [
            {
                name: "dice",
                type: ApplicationCommandOptionType.String,
                description: "The dice you want to roll",
                required: true
            }
        ]
    })

    commands?.create({
        name: 'play',
        description: 'Play a Song',
        options: [
            {
                name: "query",
                type: ApplicationCommandOptionType.String,
                description: "The song you want to play",
                required: true
            }
        ]
    })

    commands?.create({
        name: 'skip',
        description: 'Skip a Song'
    })

    commands?.create({
        name: 'stop',
        description: 'Stop the Music'
    })

    commands?.create({
        name: 'queue',
        description: 'Show the Queue'
    })

    commands?.create({
        name: 'clear',
        description: 'Clear the Queue'
    })

    commands?.create({
        name: 'pause',
        description: 'Pause the Music'
    })

    commands?.create({
        name: 'resume',
        description: 'Resume the Music'
    })

    commands?.create({
        name: 'shuffle',
        description: 'Shuffle the Queue'
    })

    commands?.create({
        name: 'loop',
        description: 'Loop the Queue'
    })
});

client.on('messageCreate', async(message) => {
    try {
        if(message.author.bot){
            return
        }

        if(message.content.startsWith(PREFIX)){
            const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);

            if(CMD_NAME === 'roll' || CMD_NAME === 'Roll'){
                require('./commands/roll.js').run(message, args);
            } else if(CMD_NAME === 'play' || CMD_NAME === 'Play'){
                require('./commands/music/play.js').run(message, args);
            }
        }

    } catch (error) {
        console.log(error);
    }
});

client.on('interactionCreate', async(interaction) => {
    try {
        if(interaction.isCommand()){
            const {commandName, options} = interaction;
            if(commandName === 'roll'){
                require('./commands/roll.js').run(interaction, [options.getString('dice')]);
            }
        }

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);