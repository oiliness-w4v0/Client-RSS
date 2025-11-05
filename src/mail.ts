import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
})

export async function sendMail(to: string, html: string) {
  await transporter.sendMail({
    from: `@油腻_W4V0 ~ <${process.env.EMAIL_AUTH_USER}>`,
    to,
    subject: '每日一言',
    html,
  })
}
