const Discord = require("discord.js");


const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);

});



const botMessage = (id, twitch) => {
    try {
        console.log(id, "iddddddddd")
        let string = id
        bot.users.fetch(string)
            .then(channel => {
                channel.send(` https://discordapp.com/channels/@me/997360695807057940/`)

                // channel.send(`https://www.twitch.tv/${twitch}`);

            })
        return true
    } catch (error) {
        console.log(error)
    }



}

const botServerLink = ()=>{

}

bot.on("disconnected", function () {
    // alert the console
    console.log("Disconnected!");

    // exit node.js with an error
    process.exit(1);
});

bot.login(process.env.DISCORD_BOT_TOKEN);

module.exports = { botMessage,botServerLink }



