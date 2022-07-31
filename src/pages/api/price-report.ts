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
      to: process.env.MAIL_ADDRESS,
      from: process.env.MAIL_ADDRESS!,
      subject: "【報告】掲載ミスの報告がありました。",
      html: `<br/>
      <p>掲載ミスの報告がありました。</p>
      <br/>
      <p>□■□━━━━━━□■□</p>
      <p>お問い合わせ内容</p>
      <p>□■□━━━━━━□■□</p>
      <p>${today}</p>
      <p>クリニック: ${req.body.clinic}</p>
      <p>部位名: ${req.body.plan}</p>
      <p>金額: ${req.body.price}円</p>
      <p>備考:</p>
      <p>${req.body.text}</p>
      <p>━━━━━━━━━━━━</p>`,
    };

    try {
      await sgMail.send(msg);
      res.status(201);
      res.json(msg);
    } catch (error: any) {
      console.error(error);
      res.status(error.status);
    }
  }
}
