const {useQueue} = require("discord-player");

const {PaginatedMessage} = require("@sapphire/discord.js-utilities");

exports.run = async(message, args) => {

    //Get the queue
    const queue = useQueue(message.guild.id);
    
    //Check if there is a queue
    if(!queue) return await message.reply("There is no queue for this guild");
    
    let pagesNum = Math.ceil(queue.tracks.size / 5);
    if (pagesNum <= 0) pagesNum = 1;

    const tracks = queue.tracks.map((track, idx) => `**${++idx})** [${track.title}](${track.url})`);
    const paginatedMessage = new PaginatedMessage();

    //Display the queue
    // return message.reply({
    //     embeds: [
    //         {
    //             title: "Queue",
    //             description: queue.tracks.map((track, i) => {
    //                 return `${i+1}. ${track.title}`;
    //             }
    //             ).join("\n")
    //         }
    //     ]
    // });

    // handle error if pages exceed 25 pages
    if (pagesNum > 25) pagesNum = 25;
    for (let i = 0; i < pagesNum; i++) {
        const list = tracks.slice(i * 5, i * 5 + 5).join('\n');

        paginatedMessage.addPageEmbed((embed) =>
            embed
                .setColor('Red')
                .setDescription(
                    `**Queue** for **session** in **${queue.channel?.name}:**\n${list === '' ? '\n*• No more queued tracks*' : `\n${list}`}
                    \n**Now Playing:** [${queue.currentTrack?.title}](${queue.currentTrack?.url})\n`
                )
                .setFooter({
                    text: `${queue.tracks.size} track(s) in queue`
                })
        );
    }

    return paginatedMessage.run(message);
}