const passport = require('passport')
const { Strategy } = require('passport-discord');
const UserData = require('../model/userData');
const USERDATA = require('../model/userData');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserData.findById(id)
        if (!user) throw new Error('User not Found')

        console.log(user)
        done(null, user)

    } catch (error) {
        console.log(error)
        done(err, null)
    }
});


passport.use(new Strategy({

    clientID: '1004491847609090179',
    clientSecret: '43ye7zYeqHPX0vBDHdKah8-lgXGCin4j',
    callbackURL: 'http://localhost:8887/api/auth/discord/redirect',
    scope: ['identify', 'email']
},
    async (accessToken, refreshToken, profile, done) => {

        try {

            const discordUser = await USERDATA.findOne({ email: profile.email })

            if (discordUser) {
                console.log("User Exists")
                return done(null, discordUser)
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
            next(err)
            return done(err, null)

        }

    })
)
