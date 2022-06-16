import sgMail, { MailDataRequired } from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${year}年${month}月${day}日 ${hour}時${minute}分`;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!); //SendGridのAPIキー
    const today = formatDate(new Date());

    const msg: MailDataRequired = {
      to: req.body.email,
      from: process.env.MAIL_ADDRESS!,
      subject: "【運営】お問合せありがとうございます。",
      text: `以下の内容でお問い合わせを受け付けいたしました。
1週間以内に【担当者 高橋】よりご連絡いたしますので、今しばらくお待ちくださいませ。

━━━━━━□■□　お問い合わせ内容　□■□━━━━━━
お名前: ${req.body.name}
E-Mail: ${req.body.email}

お問い合せ日時：${today}
お問い合わせ内容:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${req.body.message}`,
      html:
        "お問合せを受け付けました。回答をお待ちください。" + req.body.message,
    };

    try {
      await sgMail.send(msg);
      res.status(201);
    } catch (error: any) {
      console.error(error);
      console.error(error.response.body);
      res.status(error.status);
    }
  }
}
