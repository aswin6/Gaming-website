const Discord = require("discord.js");


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
});




const clientMessage = (id ) => {
        try {
            console.log(id,"iddddddddd")
            let string = id
            client.users.fetch(id)
            .then(channel => {
                channel.send("Hello here!");
            })
            
        } catch (error) {
            console.log(error)
        }


    
}

client.on("disconnected", function () {
    // alert the console
    console.log("Disconnected!");

    // exit node.js with an error
    process.exit(1);
});

client.login(process.env.DISCORD_BOT_TOKEN);

module.exports = { clientMessage }



