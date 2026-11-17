import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { email, code } = body || {};
    if (!email || !code) {
      return res.status(400).json({ success: false, message: "Email and code are required" });
    }

    const rawUser = process.env.EMAIL_USER || process.env.SMTP_USER || process.env.GMAIL_USER;
    const rawPass = process.env.EMAIL_PASS || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    const smtpUser = (rawUser || "").trim();
    const smtpPass = (rawPass || "").replace(/\s+/g, "");

    if (!smtpUser || !smtpPass) {
      console.warn("[Alfa Care] SMTP credentials not set in environment variables. Code generated for:", email);
      return res.status(200).json({
        success: true,
        smtpConfigured: false,
        message: "Code generated. Set EMAIL_USER and EMAIL_PASS to send via Gmail SMTP.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"مركز ألفا كير الطبي" <${smtpUser}>`,
      to: email,
      subject: "رمز التحقق لاستعادة كلمة المرور - مركز ألفا كير",
      text: `رمز التحقق الخاص بك لاستعادة كلمة المرور هو: ${code}\nهذا الرمز صالح لمدة 15 دقيقة.\nلا تشارك هذا الرمز مع أي شخص.`,
      html: `
        <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 40px 20px;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e5e7eb;">
            <div style="background: linear-gradient(135deg, #88a531 0%, #68821e 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">مركز ألفا كير الطبي</h1>
              <p style="color: #ecfccb; margin: 6px 0 0; font-size: 14px;">خدمات طبية وتأهيلية متكاملة</p>
            </div>
            <div style="padding: 32px 28px; text-align: center;">
              <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 12px;">استعادة كلمة المرور</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                لقد تلقينا طلباً لإعادة تعيين كلمة المرور الخاصة بحسابك المسجل. استخدم رمز التحقق التالي لإتمام العملية:
              </p>
              <div style="background: #f7fee7; border: 2px dashed #88a531; border-radius: 16px; padding: 18px 24px; display: inline-block; margin-bottom: 24px;">
                <span style="font-family: monospace; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #4d7c0f; display: block;">
                  ${code}
                </span>
              </div>
              <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 0 0 16px;">
                هذا الرمز صالح لمدة <strong style="color: #111827;">15 دقيقة</strong> فقط.
              </p>
              <p style="color: #dc2626; font-size: 12px; margin: 0; background: #fef2f2; padding: 10px; border-radius: 10px; border: 1px solid #fee2e2;">
                🔒 لأمان حسابك، لا تشارك هذا الرمز مع أي شخص على الإطلاق.
              </p>
            </div>
            <div style="background: #f9fafb; padding: 16px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">إذا لم تقم بطلب استعادة كلمة المرور، يمكنك تجاهل هذه الرسالة بأمان.</p>
            </div>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: "Email sent successfully via Gmail SMTP" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return res.status(500).json({ success: false, message: error?.message || "Failed to send email" });
  }
}
