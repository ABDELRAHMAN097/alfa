import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";

// Vite configuration with Cloudinary dev middleware
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const cloudName = (
    env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME ||
    "dtdpkfkw2"
  ).trim();

  const apiKey = (
    env.CLOUDINARY_API_KEY ||
    process.env.CLOUDINARY_API_KEY ||
    "572185387652824"
  ).trim();

  const apiSecret = (
    env.CLOUDINARY_API_SECRET ||
    process.env.CLOUDINARY_API_SECRET ||
    "eh8AFjMNKk9WbhS1ycPkkBjNMkQ"
  ).trim();

  const setupDeleteApi = (middlewares) => {
    middlewares.use(async (req, res, next) => {
      const cleanUrl = (req.url || "").split("?")[0].replace(/\/+$/, "");
      if (cleanUrl === "/api/delete-image" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body || "{}");
            let publicId = parsed.publicId;

            if (!publicId) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  message: "publicId is required",
                })
              );
              return;
            }

            publicId = String(publicId).trim().replace(/\.[^/.]+$/, "");

            cloudinary.config({
              cloud_name: cloudName,
              api_key: apiKey,
              api_secret: apiSecret,
            });

            const result = await cloudinary.uploader.destroy(publicId, {
              resource_type: "image",
              invalidate: true,
            });

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, result }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message:
                  error?.message || "Failed to delete Cloudinary image",
                error,
              })
            );
          }
        });
        return;
      }
      next();
    });
  };

  const setupSendOtpApi = (middlewares) => {
    middlewares.use(async (req, res, next) => {
      const cleanUrl = (req.url || "").split("?")[0].replace(/\/+$/, "");
      if (cleanUrl === "/api/send-otp" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        req.on("end", async () => {
          try {
            const parsed = JSON.parse(body || "{}");
            const { email, code } = parsed;

            if (!email || !code) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, message: "Email and code are required" }));
              return;
            }

            const rawUser = env.EMAIL_USER || process.env.EMAIL_USER || env.SMTP_USER || process.env.SMTP_USER;
            const rawPass = env.EMAIL_PASS || process.env.EMAIL_PASS || env.SMTP_PASS || process.env.SMTP_PASS;

            const smtpUser = (rawUser || "").trim();
            const smtpPass = (rawPass || "").replace(/\s+/g, "");

            if (smtpUser && smtpPass) {
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: { user: smtpUser, pass: smtpPass },
              });

              await transporter.sendMail({
                from: `"مركز ألفا كير الطبي" <${smtpUser}>`,
                to: email,
                subject: "رمز التحقق لاستعادة كلمة المرور - مركز ألفا كير",
                text: `رمز التحقق الخاص بك لاستعادة كلمة المرور هو: ${code}\nصالح لمدة 15 دقيقة.`,
                html: `
                  <div dir="rtl" style="font-family:sans-serif;padding:30px;background:#f4f6f8;">
                    <div style="max-width:500px;margin:0 auto;background:#ffffff;padding:26px;border-radius:16px;">
                      <h2 style="color:#1f2937;margin:0 0 10px;">مركز ألفا كير الطبي</h2>
                      <p style="color:#4b5563;font-size:14px;">رمز التحقق السري الخاص بك هو:</p>
                      <div style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#88a531;padding:16px;background:#f8faf2;border:2px dashed #88a531;border-radius:12px;margin:16px 0;text-align:center;font-family:monospace;">
                        ${code}
                      </div>
                      <p style="color:#6b7280;font-size:12px;">هذا الرمز صالح لمدة 15 دقيقة. لا تشاركه مع أي شخص لأمان حسابك.</p>
                    </div>
                  </div>
                `,
              });
            } else {
              console.log("[Dev Server] OTP generated for email:", email);
            }

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, message: "Processed" }));
          } catch (error) {
            console.error("Vite OTP middleware error:", error);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, message: error.message }));
          }
        });
        return;
      }
      next();
    });
  };

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "dev-server-apis",
        configureServer(server) {
          setupDeleteApi(server.middlewares);
          setupSendOtpApi(server.middlewares);
        },
        configurePreviewServer(server) {
          setupDeleteApi(server.middlewares);
          setupSendOtpApi(server.middlewares);
        },
      },
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});