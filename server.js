const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

let otpStore = {};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    
        user: 'getcover02@gmail.com',
        pass: 'agaq ifkj sbyl rpwc',  // Replace with your app password
    },
});

app.get('/test', (req, res) => {
    res.send('Server is running');
});
app.use(express.static('public'));

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp;

    const mailOptions = {
        from: 'getcover02@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.json({ success: false, message: 'Failed to send OTP.' });
        }
        res.json({ success: true });
    });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (otpStore[email] === otp) {
        delete otpStore[email]; // Remove OTP after successful verification
        return res.json({ success: true });
    }
    res.json({ success: false, message: 'Invalid OTP.' });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
