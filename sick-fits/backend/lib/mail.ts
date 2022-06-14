import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text: string): string => {
  return `
  <div style="
  border: 1px solid black;
  pading: 20px;
  font-family: sans-serif;
  font-size: 20px;
  line-heigh: 2;
  ">
  <h2>Hello there</h2>
  <p>${text}</p>
  <p>😘, felsey</p>
  </div>
  `;
};

export const sendPasswordResetEmail = async (
  resetToken: string,
  to: string
): Promise<void> => {
  // email the user a token
  const info = await transport.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your password reset tolen is here
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}&email=${to}">Click here to reset</a>
    `),
  });
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
};
