exports.run = async(player, message) => {
    //TODO: Add flexibility to queue
    const queue = player.getQueue(message.guild);
    if(!queue || !queue.playing) return await message.reply("No music is being played");
    const success = queue.shuffle();
    return await message.reply(success ? "Shuffled the queue" : "Something went wrong");
}
