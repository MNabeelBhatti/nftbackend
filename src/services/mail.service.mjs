import nodemailer from "nodemailer";
// const logo = require("./logo.png");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhattinabeel92@gmail.com",
    pass: "ktjhnznfpwjgytwl",

    // user: "admin@picswagger.com",
    // pass: "wvvjlhkswsfzeolc",
  },
});
// const attachments = [
//   {
//     filename: "logo.png",
//     path: `${__dirname}/Nabeel.png`,
//     cid: "logo", //same cid value as in the html img src
//   },
// ];

const sendResetPasswordMail = async function (data) {
  //   return new Promise((resolve, reject) => {
  try {
    var mailOptions = {
      from: "support@nabeel.com",
      to: data.user.email,
      subject: "Resest Password",
      //   attachments,
      html: `<div>
        <br/> 
          <p>
            <img  src='cid:logo'/>
            </p>
          <p>
         <b>Dear ${data.user.name.charAt(0).toUpperCase()} ;
         
         </b>
          </p>
          <br/>  <br/>
          <p>

We noticed that you recently requested to reset your password.

To reset your password, please click the link below <br>
<br>
<button>
<a href=${data.link}>
Reset Password
</a>
</button>
<br><br/>
If you did not request to reset your password, you can ignore this message and your password will remain the same.

If you have any questions or concerns, please contact us at <u>support@nabeel.com</u>
<br><br/>
<b>Note: </b>This link active for only 30 min. Thanks
<br/>
<br/><br/> 
Sincerely,
<br/>
<br/>
Team Nabeel
          </p>
          </div>`,
    };

    await transporter.sendMail(mailOptions);
    return "email sent sucessfully";
  } catch (error) {
    console.log(error, "email not sent");
  }
  //   });
};

export { sendResetPasswordMail };
