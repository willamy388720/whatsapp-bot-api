import { env } from "@/env";
import Email from "email-templates";
import path from "path";

const email = new Email({
  message: {
    from: "zebot@example.com",
  },
  send: true,
  views: {
    root: path.join(__dirname, "../emails"),
  },
  transport: {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  },
});

type SendMail = {
  toEmail: string;
  name: string;
  phoneNumber: string;
  groupMessage: string;
  maliciousMessage: string;
  maliciousContactName: string;
  maliciousPhoneNumber: string;
};

export async function sendEmail({
  toEmail,
  name,
  phoneNumber,
  groupMessage,
  maliciousMessage,
  maliciousContactName,
  maliciousPhoneNumber,
}: SendMail) {
  try {
    await email.send({
      template: "notification",
      message: {
        to: toEmail,
      },
      locals: {
        name,
        phoneNumber,
        groupMessage,
        paramsURL: encodeURI(
          `${maliciousMessage}2z2e2${maliciousContactName}2z2e2${maliciousPhoneNumber}`
        ),
      },
    });
  } catch (error) {
    throw error;
  }
}

type SendDecisionEmail = {
  toEmail: string;
  malicousPhoneNumber: string;
};

export async function sendPositiveEmail({
  toEmail,
  malicousPhoneNumber,
}: SendDecisionEmail) {
  try {
    await email.send({
      template: "positive",
      message: {
        to: toEmail,
      },
      locals: { malicousPhoneNumber },
    });
  } catch (error) {
    throw error;
  }
}

export async function sendNegativeEmail({
  toEmail,
  malicousPhoneNumber,
}: SendDecisionEmail) {
  try {
    await email.send({
      template: "negative",
      message: {
        to: toEmail,
      },
      locals: { malicousPhoneNumber },
    });
  } catch (error) {
    throw error;
  }
}
