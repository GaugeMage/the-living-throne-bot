exports.run = async(player, message) => {
    const {EmbedBuilder} = require("discord.js");
    const queue = player.getQueue(message.guildId);
    if (!queue) return await message.reply({ content: "❌ | No music is being played!", ephemeral: true });
    return await message.reply({ embeds: [new EmbedBuilder()
        .setColor("#A020F0")
        .setAuthor({name: "Server Queue ", iconURL: message.guild.iconURL()})
        .setDescription(queue.tracks.length >= 1 ? queue.tracks.map((track, i) => {
            return `#${i + 1} - ${track.title}`
        }).join("\n") : "No songs in queue!")
    ], ephemeral: true});
}