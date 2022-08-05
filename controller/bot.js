const Discord = require("discord.js");


const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

});




client.on('message', (message) => {
    
try {
    client.users.fetch('1004289059063074876').then(dm => {
        dm.send('Message to send')
    })
    
} catch (error) {
    console.log(error)
}

    
});

client.on("disconnected", function () {
    // alert the console
    console.log("Disconnected!");

    // exit node.js with an error
    process.exit(1);
});

client.login(process.env.DISCORD_BOT_TOKEN);





