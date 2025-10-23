const nodemailer = require('nodemailer');

async function sendNotification({ session, emails, message }) {
  if(!Array.isArray(emails) || emails.length === 0) {
    throw new Error('No recipient emails provided');
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const html = `
    <div style="font-family:Inter, Arial, sans-serif; padding:20px;">
      <h3>Cybersecurity Calendar Reminder</h3>
      <p>Hello Student,</p>
      <p>Your next session <strong>${session.title}</strong> starts at ${new Date(session.date).toLocaleString()}.</p>
      <p>Join here → <a href="${session.meetingLink}">${session.meetingLink}</a></p>
      <p>${message || ''}</p>
      <footer style="margin-top:20px;">© 2025 Sohail Academy – Automated Reminder System</footer>
    </div>`;

  const res = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: emails.join(','),
    subject: `Reminder: ${session.title} at ${new Date(session.date).toLocaleString()}`,
    html,
  });
  return res;
}

module.exports = { sendNotification };
