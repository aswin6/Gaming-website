const UserData = require('../model/userData');
const USERDATA = require('../model/userData');
const createError = require('http-errors');

const passport = require('passport')
const { Strategy } = require('passport-discord');


passport.serializeUser((user, done) => {
    console.log("serializer", user.id)
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserData.findById(id)
        if (!user) throw new Error('User not Found')

        console.log(user, 'deserializer')
        done(null, user)

    } catch (error) {
        console.log(error, 'deserializer')
        done(err, null)
    }
});


passport.use(new Strategy({

    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'http://localhost:8887/api/auth/discord/redirect',
    scope: ['identify', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        try {

            const discordUser = await USERDATA.findOne({ email: profile.email })

            if (discordUser) {
                if(discordUser.provider != 'discord'){
                    const discordError =  createError.Conflict(`${profile.email} is already been registered by ${discordUser.provider}. Use it to login`)
                    console.log(discordError)
                    return done(null, null)
                }
             else{
                console.log("User Exists")
                return done(null, discordUser)


             }
            }
            else {

                let item = {
                    username: profile.username,
                    email: profile.email,
                    provider: profile.provider,
                    proPlayer: false,
                }


                const USER = new USERDATA(item)
                const savedIdData = await USER.save()
                console.log("User Created")

                return done(null, savedIdData)
            }


        } catch (err) {
            console.log(err);
            return done(err, null)

        }

    })
)
