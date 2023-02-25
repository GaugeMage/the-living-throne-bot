exports.run = async(player, message) => {
    const queue = player.getQueue(message.guild);
    if(!queue || !queue.playing) return await message.reply("No music is being played");
    queue.setRepeatMode(queue.repeatMode ? 0 : 2);
    return await message.reply({ content: queue.repeatMode ? "🔁 | Repeating the queue!" : "❌ | Not repeating the queue!", ephemeral: true });
}