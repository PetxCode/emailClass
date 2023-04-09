import nodemailer from "nodemailer";
import { google } from "googleapis";

const GOOGLE_ID =
  "1028339484309-ub37qib4fb9plurdv8q2sig6agg87c1j.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESHTOKEN =
  "1//04RwSYNNEoVwDCgYIARAAGAQSNwF-L9Iri4hd03ICWbJzThf8XkWzKzSIPaXX2Q9K2V4RViAaFtideYAq8lHgSpOgDdBc0KvBQ0E";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_REDIRECT);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

export const verifyMyAccount = async () => {
  try {
    const getAccessToken: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "peterotunuya2@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESHTOKEN,
        accessToken: getAccessToken,
      },
    });

    const mailer = {
      from: "no-reply💌💌💌 <peterotunuya2@gmail.com>",
      to: "brighterdayscodelab@gmail.com",
      subject: "",
      html: `<div>Welcome back...</div>`,
    };

    transport.sendMail(mailer);
  } catch (err) {
    console.log(err);
  }
};
