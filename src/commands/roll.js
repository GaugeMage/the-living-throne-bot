exports.run = async(message, args) => {
    require('../helpers/checkArgs').run(args, message);

    console.log(args)
    //Split the string after d
    const temp = args[0].split('d');
    const temp2 = temp[1].split('+');
    //Get the number of dice
    const diceAmount = Number(temp[0]);
    //Get the dice type
    const diceType = Number(temp2[0]);
    //Get the modifier
    const modifier = Number(temp2[1]);

    let rolls = [];
    let total = 0;
    for(let i = 0; i < diceAmount; i++){
        rolls.push(Math.floor(Math.random() * diceType) + 1);
        total += rolls[i];
    }
    //If modifier exists, add it to the total
    if(modifier){
        total += Number(modifier);
    }

    //Tests to see if the message is a slash command
    if(message.isCommand){
        return message.reply(`<@${message.user.id}> rolled ${args}\n**Result:** ${total}`);
    }
    message.channel.send(`<@${message.author.id}> rolled ${args}\n**Result:** ${total}`);
};