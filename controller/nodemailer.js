const nodemailer = require('nodemailer');

//email

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ashin209@gmail.com",
        pass: "vippbflmysnszhro",
    },
});


const otp_mail = (email, otp) => {


    var mailOptions = {
        to: email,
        subject: "Otp for registration is: ",
        html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
    };
    console.log(otp)
    return mailOptions

}


const Welcome_mail = (email) => {

    let uRL = 'https://discord.gg/XjRAn7RK'
    var mailOptions = {
        to: email,
        subject: "Welcome to GGEra ",
        html: `<h3>Join our Dicord Channel </h3>
                <h1 style='font-weight:bold;'>
                 ${uRL} 
                </h1>` // html body
    };
    console.log('welcome mail')
    return mailOptions
}



// send mail with defined transport object

const OTP_Mailer = async (email, otp) => {



    transporter.sendMail(otp_mail(email, otp), (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otp');
    });




}

const Welcome_Mailer = async (email) => {



    transporter.sendMail(Welcome_mail(email), (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('otp');
    });




}

module.exports = { OTP_Mailer, Welcome_Mailer}