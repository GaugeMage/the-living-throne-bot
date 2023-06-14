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
        }, channel).then(async res => {
            if(!res || !res.tracks.length) return await message.reply("No results were found");

            if(res.playlist){
                await message.reply(`Enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks`);
            }

            await res.playlist ? player.play(channel, res.tracks[0], res.playlist) : player.play(channel, res.tracks[0]);
        });
    } catch (e) {
        console.log(e);
    }
}