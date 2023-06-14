const { useMasterPlayer } = require("discord-player");
const {YoutubeExtractor} = require("@discord-player/extractor");

exports.run = async(message, args) => {
    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const player = useMasterPlayer();

    // player.extractors.register(YoutubeExtractor, {})
    player.extractors.loadDefault();

    const channel = message.member.voice.channel;

    try {
        const { track } = await player.play(channel, args.join(" "), {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: message // we can access this metadata object using queue.metadata later on
            }
        });
 
        return message.reply(`**${track.title}** now playing!`);
    } catch (e) {
        console.log(e);
    }
}