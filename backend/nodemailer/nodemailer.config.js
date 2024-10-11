import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const mailTransporter =
  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'subhashgedam10@gmail.com',
        pass: process.env.NODEMAILER_PASS
      }
    }
  );

export {mailTransporter};

  
