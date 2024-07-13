const { useMainPlayer } = require("discord-player");

exports.run = async(message) => {
    // if(!message.member.voice.channelId) return await message.reply("You are not in a voice channel");
    const player = useMainPlayer();

    //General in Living Throne: 915235671839506506
    //Spade's Palace: 1220534226387079310
    //Test on testing server: 790274605301891097
    const channel = "1220534226387079310";
    
    // Songs:
    // Rick Astley:https://www.youtube.com/watch?v=dQw4w9WgXcQ
    //Scott troll: https://youtu.be/GSjlxbxAymM?si=8HJ7TRmQkHgv0xcI
    // Don't trust a hoe: https://youtu.be/GSjlxbxAymM?si=Fvmog_xY0MkEE9cx
    const song = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 
    try {
        // Play rick roll:
        const { track } = await player.play(channel, song, {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: message // we can access this metadata object using queue.metadata later on
            }
        });

        
        //Print the track title and url in console
        // console.log(`Song used in play: ${track.title} [${track.url}]`);
        // return await message.reply(`**${track.title}** now playing!`);
    } catch (e) {
        console.log(e);
    }
}