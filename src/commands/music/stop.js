exports.run = async (player, message) => {
    const queue = player.getQueue(message.guild);
    if(!queue || !queue.playing) return await message.reply("No music is being played");
    queue.destroy();
    return await message.reply({ content: "⏹️ | Stopped the music!", ephemeral: true });
}