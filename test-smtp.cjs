const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'bodymagdy097@gmail.com',
    pass: 'tphtimsepiwtveec'
  }
});

async function run() {
  try {
    await transporter.verify();
    console.log('>>> GMAIL SMTP VERIFIED SUCCESSFULLY! <<<');
    
    const info = await transporter.sendMail({
      from: '"مركز ألفا كير الطبي" <bodymagdy097@gmail.com>',
      to: 'bodymagdy097@gmail.com',
      subject: 'رمز التحقق لاستعادة كلمة المرور - مركز ألفا كير',
      html: `
        <div dir="rtl" style="font-family:sans-serif;padding:30px;background:#f4f6f8;text-align:center;">
          <div style="max-width:480px;margin:0 auto;background:#ffffff;padding:30px;border-radius:16px;">
            <h2 style="color:#1f2937;">مركز ألفا كير الطبي</h2>
            <p style="color:#4b5563;font-size:15px;">رمز التحقق الخاص بك لاستعادة كلمة المرور هو:</p>
            <div style="font-size:36px;font-weight:900;letter-spacing:8px;color:#88a531;padding:16px;background:#f8faf2;border:2px dashed #88a531;border-radius:12px;margin:20px auto;display:inline-block;font-family:monospace;">
              849201
            </div>
            <p style="color:#9ca3af;font-size:12px;">هذا الرمز صالح لمدة 15 دقيقة. لا تشاركه مع أي شخص.</p>
          </div>
        </div>
      `
    });
    console.log('>>> TEST EMAIL SENT SUCCESSFULLY! MessageId:', info.messageId);
  } catch (err) {
    console.error('SMTP ERROR:', err.message);
  }
}

run();
