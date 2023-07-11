exports.run = async(message, args) => {
    try {
        require('../../helpers/checkArgs').run(args, message);

        //Check if the string has a d in it
        if(!args[0].includes('d')){
            return message.reply("Invalid dice format. Please use the format `XdY` where X is the number of dice and Y is the type of dice");
        }

        //Split the string after d
        const temp = args[0].split('d');
        const temp2 = temp[1].split('+');
        const temp3 = temp[1].split('-');

        //Check if there is a + or - in the string
        if(temp3[1]){
            temp2[0] = temp3[0];
            temp2[1] = `-${temp3[1]}`;
        }
        //Get the number of dice. If there is no number, assume 1
        const diceAmount = temp[0] ? Number(temp[0]) : 1;
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
    } catch (error) {
        console.log(error);
    }
};