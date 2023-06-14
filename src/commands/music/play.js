const { useMasterPlayer } = require("discord-player");
const { YouTubeExtractor } = require("@discord-player/extractor");
// const { YouTubeExtractor } = require("discord-player");

exports.run = async(message, args) => {
    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const player = useMasterPlayer();

    const channel = message.member.voice.channel;

    try {
        // Play the song
        await player.search(args.join(" "), {
            requestedBy: message.author,
            searchEngine: `ext:${YouTubeExtractor.identifier}`
        }, channel).then(x => x.tracks)

        //Play the song
        await player.play(message.guild.id, x[0], {
            firstResult: true
        });
    } catch (e) {
        console.log(e);
    }
}