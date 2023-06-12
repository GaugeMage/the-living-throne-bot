const {useQueue, QueueRepeatMode} = require("discord-player");

const repeatModes = [
	{ name: 'Off', value: QueueRepeatMode.OFF },
	{ name: 'Track', value: QueueRepeatMode.TRACK },
	{ name: 'Queue', value: QueueRepeatMode.QUEUE },
	{ name: 'Autoplay', value: QueueRepeatMode.AUTOPLAY }
];

exports.run = async(interaction) => {
    const queue = useQueue(interaction.guild.id);

    if(!queue){
        return await interaction.reply("There is no queue for this guild");
    }

    if(!queue.currentTrack){
		return interaction.reply({ content: `There is no track **currently** playing`, ephemeral: true });
    }

    await queue.repeatMode === 0 ? queue.setRepeatMode(2) : queue.setRepeatMode(0);

    return await interaction.reply(`Repeat mode set to ${repeatModes[queue.repeatMode].name}`);
}