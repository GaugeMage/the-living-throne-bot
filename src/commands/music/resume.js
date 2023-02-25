exports.run = async(player, message) => {
    const queue = player.getQueue(message.guild);
    if(!queue || !queue.playing) return await message.reply("No music is being played");
    const success = queue.setPaused(false);
    return await message.reply(success ? "Resumed the music" : "Something went wrong");
}