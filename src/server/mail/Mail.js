var nodemailer = require("nodemailer");

class SendMail {
  constructor() {
    this.generalMail = "nnodemail@gmail.com";
    this.CISOMail = "ori.nahu@gmail.com";

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: this.generalMail,
        pass: "aespuqhymdnbhbgi",
      },
    });
  }

  sendMailToCISO(_id, title) {
    var mailOptions = {
      from: this.generalMail,
      to: this.CISOMail,
      subject: "Pr need review",
      text: `Pr Id number: ${_id} title:${title} need code review`,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  sendMailToPrOwner(_id, title, ownerMail) {
    var mailOptions = {
      from: this.generalMail,
      to: this.CISOMail,
      subject: "Pr need review",
      text: `Pr Id number: ${_id} title:${title} changes_requested`,
    };

    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = SendMail;
