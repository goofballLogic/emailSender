const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const emailTo = process.env.SENDGRID_TO;
const emailFrom = process.env.SENDGRID_FROM;

exports.emailSender = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const formData = req.body;
    const json = JSON.stringify(formData, null, 2);

    // Construct the email content
    const emailContent = {
      to: emailTo,
      from: emailFrom,
      subject: `E-mail forward: ${json.substring(0, 100)}`,
      text: json,
    };

    console.log("Sending", emailContent);
    // Send email
    await sendgrid.send(emailContent);

    console.log("Sent", emailContent);

    if(req.query.redirect) {

      console.log("Redirecting based on query", req.query);
      res.redirect(req.query.redirect);

    } else {

      res.status(200).send('Form submitted successfully');

    }

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to process form submission');
  }
};

