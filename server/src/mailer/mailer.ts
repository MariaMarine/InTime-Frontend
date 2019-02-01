import * as  nodemailer from 'nodemailer';
export class MailService {

    async mail(mail: string) {
    nodemailer.createTestAccount((err, account) => {
     const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'intime.traffic@gmail.com',
            pass: 'yfutcqtkjhcmyhbo',
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

     const mailOptions = {
        from: 'intime.traffic@gmail.com',
        to: [mail],
        subject: `Account created!`,
        text: 'Account created',
        html: `<b>InTime account created for user ${mail}. 
        Please contact your admin for your pasword.
        You can then change it at http://localhost:4200/profile.</p>`,
    };

     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // tslint:disable-next-line:no-console
            return console.log(error);
        }
        // tslint:disable-next-line:no-console
        console.log('Message sent: %s', info.messageId);
        });
    });
    }
}
