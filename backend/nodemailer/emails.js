import { mailTransporter } from "./nodemailer.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE,  } from "./emailTemplates.js";

const sendVerificationEmail = async (email, verificationToken)=>{
  try{
    mailTransporter
    .sendMail(
      {
        // from: 'subhashgedam10@gmail.com',
        // to: email,
        subject: 'Email Verification Code - Hyper Local ECommerce',
        html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken)
      },
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

const sendWelcomeEmail = async (email, name)=>{
    
  try{
      mailTransporter
    .sendMail(
      {
        // from: 'subhashgedam10@gmail.com',
        // to: email,
        subject: 'Welcome to HyperLocal',
        html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name.charAt(0).toUpperCase() + name.slice(1))
      },
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export {sendVerificationEmail, sendWelcomeEmail};