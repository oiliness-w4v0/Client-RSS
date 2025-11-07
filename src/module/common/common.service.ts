import { transporter } from '~/lib/mail'

// 发送邮件
export async function sendMail(to: string, html: string) {
  await transporter.sendMail({
    from: `@油腻_W4V0 ~ <${process.env.EMAIL_AUTH_USER}>`,
    to,
    subject: '每日一言',
    html,
  })
}
