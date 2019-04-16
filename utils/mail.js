// // this file is for automatic email updates via nodemailer
// var db = require("../models");
// var thismonth = require("./date");

// const nodemailer = require('nodemailer')
// // we need to get the info from the databasde and create the actual mail content here
// var name;
// var email;
// var message;

// // this part will post from our send route
// sendEmail (name, email, message) {
//     fetch('/send', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         message: message
//       })
//     })
//     .then((res) => res.json())
//     .then((res) => {
//       console.log('here is the response: ', res);
//     })
//     .catch((err) => {
//       console.error('here is the error: ', err);
//     })
//    }

// //    i think we need to require this in the app on server


// //   the transporter will actually send the emails from the service we set up
// app.post('/send', function(req, res, next) {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'test-email@gmail.com',
//         pass: 'test123'
//       }
//     })
//   }
//     const mailOptions = {
//       from: `${req.body.email}`,
//       to: 'test-email@gmail.com',
//       subject: `${req.body.name}`,
//       text: `${req.body.message}`,
//       replyTo: `${req.body.email}`
//     }
//     transporter.sendMail(mailOptions, function(err, res) {
//         if (err) {
//           console.error('there was an error: ', err);
//         } else {
//           console.log('here is the res: ', res)
//         }
//       })
//     })