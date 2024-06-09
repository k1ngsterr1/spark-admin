import nodemailer from "nodemailer";
import { IEmailService } from "core/interfaces/IEmailService";

export class EmailService implements IEmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      pool: true,
      host: "pkz42.hoster.kz",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        // user: "info@sparkstudio.kz",
        pass: process.env.EMAIL_PASS,
        // pass: "Askar2005",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    code: string
  ): Promise<void> {
    const emailTemplate = `<!DOCTYPE html>
    <html lang="ru">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        color: #333;
      }
  
      p{
        font-size: 20px
      }
  
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #ff5722;
        color: white;
        padding: 10px 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
      }
      .content {
        line-height: 1.6;
        padding: 20px;
      }
      .code {
        font-weight: bold;
        font-size: 48px;
        text-align: center;
        margin: 20px 0;
        padding: 10px;
        background-color: #eee;
        border-radius: 4px;
        letter-spacing: 1px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        background-color: #f9f9f9;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
  
      .img{
        margin-top: 32px
      }
  
    </style>
    </head>
    <body>
    <div class="container">
   </div>
      <div class="header">
        <h1>Spark Admin | Spark Studio</h1>
      </div>
      <a href="https://ibb.co.com/rsfwrBW"><img src="https://i.ibb.co.com/Ry4DwX5/spark-product-logo.png" alt="spark-product-logo" border="0" width="128px" height="128px" ></a>
      <div class="content">
        <p>Здравствуйте, <strong>${name}</strong></p>
        <p>Пожалуйста подтвердите ваш аккаунт, чтобы полноценно пользоваться Spark Admin. Ваш код:</p>
        <div class="code">${code}</div>
      </div>
      <div class="footer">
        ©2024 Spark Studio. All rights reserved.
      </div>
    </div>
    </body>
    </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: "info@sparkstudio.kz",
      to: email,
      subject: "Код подтверждения Spark Admin",
      text: `Ваш код подтверждения: ${code}`,
      html: emailTemplate,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(
    email: string,
    name: string,
    code: string
  ): Promise<void> {
    const emailTemplate = `<!DOCTYPE html>
    <html lang="ru">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        color: #333;
      }
  
      p{
        font-size: 20px
      }
  
      .container {
        max-width: 1200px;
        margin: 0 auto;
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #ff5722;
        color: white;
        padding: 10px 20px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      .header h1 {
        margin: 0;
      }
      .content {
        line-height: 1.6;
        padding: 20px;
      }
      .code {
        font-weight: bold;
        font-size: 48px;
        text-align: center;
        margin: 20px 0;
        padding: 10px;
        background-color: #eee;
        border-radius: 4px;
        letter-spacing: 1px;
      }
      .footer {
        text-align: center;
        padding: 20px;
        font-size: 12px;
        background-color: #f9f9f9;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
  
      .img{
        margin-top: 32px
      }
  
    </style>
    </head>
    <body>
    <div class="container">
   </div>
      <div class="header">
        <h1>Spark Admin | Spark Studio</h1>
      </div>
      <a href="https://ibb.co.com/rsfwrBW"><img src="https://i.ibb.co.com/Ry4DwX5/spark-product-logo.png" alt="spark-product-logo" border="0" width="128px" height="128px" ></a>
      <div class="content">
        <p>Здравствуйте, <strong>${name}</strong></p>
        <p>Пожалуйста подтвердите ваш аккаунт, чтобы полноценно пользоваться Spark Admin. Ваш код:</p>
        <div class="code">${code}</div>
      </div>
      <div class="footer">
        ©2024 Spark Studio. All rights reserved.
      </div>
    </div>
    </body>
    </html>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: "info@sparkstudio.kz",
      to: email,
      subject: "Код сброса пароля Spark Admin",
      text: `Ваш код для сброса пароля: ${code}`,
      html: emailTemplate,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default EmailService;
