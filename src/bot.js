require('dotenv').config();

const {Client, Partials, ApplicationCommandOptionType} = require('discord.js');
const {Player} = require('discord-player');
const { VoiceConnectionStatus } = require('@discordjs/voice');
const {YoutubeExtractor} = require('@discord-player/extractor')

const {ChannelType} = require('discord.js');

const client = new Client({intents: 65531, partials: [Partials.Channel, Partials.Message]});
const PREFIX = process.env.PREFIX;
const player = new Player(client);


player.on('connectionCreate', (queue) => {
    queue.connection.voiceConnection.on('stateChange', (oldState, newState) => {
        if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
            queue.connection.voiceConnection.configureNetworking();
        }
    })
});

// player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`));

client.on('ready', async() => {
    console.log(`${client.user.tag} has logged in`);

    await player.extractors.register(YoutubeExtractor, {});

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
        name: 'randchar',
        description: 'Roll a Random Character'
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
        //If channel id is 958060354670301224 or if it is a DM channel don't log
        if(message.channel.id != '958060354670301224' && message.channel.type != ChannelType.DM){
            console.log(`${message.createdAt.toTimeString()} ${message.author.tag} in #${message.channel.name} in ${message.guild.name} sent: ${message.content}`);
        }
        if(message.author.bot){
            return
        }

        if(message.content.startsWith(PREFIX)){
            const [CMD_NAME, ...args] = message.content.substring(PREFIX.length).trim().split(/\s+/);

            if(CMD_NAME === 'roll' || CMD_NAME === 'Roll'){
                require('./commands/roller/roll.js').run(message, args);
            } else if(CMD_NAME === 'randChar' || CMD_NAME === 'RandChar'){
                require('./commands/roller/randChar.js').run(message);
            } else if(CMD_NAME === 'play' || CMD_NAME === 'Play'){
                require('./commands/music/play.js').run(message, args);
            } else if(CMD_NAME === 'skip' || CMD_NAME === 'Skip'){
                require('./commands/music/skip.js').run(message);
            } else if(CMD_NAME === 'stop' || CMD_NAME === 'Stop'){
                require('./commands/music/stop.js').run(message);
            } else if(CMD_NAME === 'queue' || CMD_NAME === 'Queue'){
                require('./commands/music/queue.js').run(player, message);
            } else if(CMD_NAME === 'clear' || CMD_NAME === 'Clear'){
                require('./commands/music/clear.js').run(player, message);
            } else if(CMD_NAME === 'pause' || CMD_NAME === 'Pause'){
                require('./commands/music/pause.js').run(player, message);
            } else if(CMD_NAME === 'resume' || CMD_NAME === 'Resume'){
                require('./commands/music/resume.js').run(player, message);
            } else if(CMD_NAME === 'shuffle' || CMD_NAME === 'Shuffle'){
                require('./commands/music/shuffle.js').run(player, message);
            } else if(CMD_NAME === 'loop' || CMD_NAME === 'Loop'){
                require('./commands/music/loop.js').run(message);
            } else if(CMD_NAME === 'rickRoll'){
                require('./commands/music/rickRoll.js').run(message);
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

            console.log(`${interaction.user.tag} in #${interaction.channel.name} in ${interaction.guild.name} used: ${commandName}`);

            if(commandName === 'roll'){
                require('./commands/roller/roll.js').run(interaction, [options.getString('dice')]);
            } else if(commandName === 'randchar'){
                require('./commands/roller/randChar.js').run(interaction);
            } else if(commandName === 'play'){
                require('./commands/music/play.js').run(interaction, [options.getString('query')]);
            } else if(commandName === 'skip'){
                require('./commands/music/skip.js').run(interaction);
            } else if(commandName === 'stop'){
                require('./commands/music/stop.js').run(interaction);
            } else if(commandName === 'queue'){
                require('./commands/music/queue.js').run(interaction);
            } else if(commandName === 'clear'){
                require('./commands/music/clear.js').run(player, interaction);
            } else if(commandName === 'pause'){
                require('./commands/music/pause.js').run(interaction);
            } else if(commandName === 'resume'){
                require('./commands/music/resume.js').run(player, interaction);
            } else if(commandName == 'shuffle'){
                require('./commands/music/shuffle.js').run(player, interaction);
            } else if(commandName == 'loop'){
                require('./commands/music/loop.js').run(interaction);
            }
        }

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);