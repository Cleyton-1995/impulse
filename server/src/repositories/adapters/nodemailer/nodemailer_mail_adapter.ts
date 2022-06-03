import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail_adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9633dc0c4651e7",
      pass: "fd1d75de1cb096",
    },
  });

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Cleyton Costa <kleytonotyelk1995@gmail.com>",
      subject,
      html: body,
    });
  }
}
