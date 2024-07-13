const { useMainPlayer, Player } = require("discord-player");
const {ChannelType} = require("discord.js");

exports.run = async(message, args) => {
    await message.deferReply();
    if(message.channel.type === ChannelType.DM){
        return await message.reply("You can't use this command in DMs");
    }

    if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const player = useMainPlayer();

    const channel = message.member.voice.channel;

    //We are going to parse the link.
    // The format should be: https://www.youtube.com/watch?v=VIDEO_ID
    // Some formats to test for:
    // https://www.youtube.com/watch?v=VIDEO_ID&list=LISTID&index=INDEX
    // https://youtu.be/VIDEO_ID?si=SHARE_ID
    // The above formats should be turned into https://www.youtube.com/watch?v=VIDEO_ID
    //Code:
    let query = args.join(" ");
    if(query.includes("&list=")){
        //Remove the list part
        query = query.split("&list=")[0];
    }

    if(query.includes("?si=")){
        //Remove the share part and then change the youtu.be/VIDEO_ID to youtube.com/watch?v=VIDEO_ID
        query = query.split("?si=")[0];
        query = query.replace("youtu.be/", "youtube.com/watch/?v=");
    }

    try {
        const { track } = await player.play(channel, query, {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: message, // we can access this metadata object using queue.metadata later on
            }
        });

        return await message.editReply(`**${track.title}** now playing!`);
    } catch (e) {
        console.log(e);
        return await message.editReply("An error occurred while playing the song");
    }
}