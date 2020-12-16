const mailer = require('nodemailer');

exports.smtp = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false
};

exports.gmail = {
  service: 'gmail',
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS
  }
};

exports.send = (smtp, body) => {
  return new Promise((resolve, reject) => {
    const smtpTransport = mailer.createTransport(smtp);

    smtpTransport.sendMail(body, (err, info) => {
      if (err) {
        reject(err);
      }

      resolve(info);
    });
  });
};
