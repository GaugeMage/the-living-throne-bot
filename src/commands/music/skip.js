const {useQueue} = require("discord-player");

exports.run = async(message, args) => {
    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    
    const queue = useQueue(message.guild.id);

    if(!queue) return await message.reply("There is no queue for this guild");
    if(!queue.currentTrack) return await message.reply("There is no track playing");

    queue.node.skip();
    message.reply("Skipped!");
}