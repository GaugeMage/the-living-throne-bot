exports.run = async(player, message) => {
    try {
        const queue = player.getQueue(message.guild.id);
        if(!queue){
            return message.reply('There is no Queue');
        }
        queue.clear();
        message.reply('Cleared the Queue');
    } catch (error) {
        console.log(error);
    }
}