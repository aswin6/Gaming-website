const createError = require('http-errors');

const passport = require('passport')
const { Strategy } = require('passport-discord');

const USERDATA = require('../model/userData');

passport.serializeUser((user, done) => {
    console.log('serializer')
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {

        console.log( 'deserializer')

        const user = await USERDATA.findById(id)
 

        done(null, user)

    } catch (err) {
        console.log(err, 'deserializer')
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
                if (discordUser.provider === 'discord') {
                    console.log('user is found')
                    return done(null, discordUser)
                }
                else {
                    console.log("User Exists")
                    return done(null, null)

                }
            }
            else {

                let item = {
                    username: profile.username,
                    email: profile.email,
                    provider: profile.provider,
                    proPlayer: false,
                    discordID: profile.id
                }


                const USER = await USERDATA(item)
                const savedIdData = await USER.save()
                console.log("User Created")

                return done(null, savedIdData)
            }


        } catch (err) {
            console.log(' catch error',err);
            return done(err, null)

        }

    })
)
