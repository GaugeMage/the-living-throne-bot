const {useQueue} = require("discord-player");

exports.run = async(interaction) => {
    if(!interaction.member.voice.channelId) return await interaction.reply("You are not in a voice channel");
    
    const queue = useQueue(interaction.guild.id);

    if(!queue) return await interaction.reply("There is no queue for this guild");
    if(!queue.currentTrack) return await interaction.reply("There is no track playing");

    queue.node.stop();
    interaction.reply("Stopped!");
}