exports.run = async (message, args) => {
    const {Player} = require('discord-player');
    const player = new Player(message.client);

    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const queue = player.createQueue(message.guild, {
        ytdlOptions: {
            filter: "audioonly",
            highWaterMark: 1 << 30,
            dlChunkSize: 0,
        },
        metaData: {
            channel: message.channel,
        }
    });
    try {
        if(!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        queue.destroy();
        return await message.reply("Could not join your voice channel!");
    }
    const track = await player.search(args.join(" "), {
        requestedBy: message.author,
    }).then(x => x.tracks[0]);
    if(!track) return await message.reply("No results found");
    queue.play(track);
}