exports.run = async (player, message) => {
    const queue = player.getQueue(message.guild);
    if(!queue || !queue.playing) return await message.reply("No music is being played");
    const success = queue.skip();
    return await message.reply(success ? "Skipped the song" : "Something went wrong");
}