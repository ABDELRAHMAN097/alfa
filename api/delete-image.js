import { v2 as cloudinary } from "cloudinary";

/**
 * Vercel Serverless Function: POST /api/delete-image
 * Deletes an image from Cloudinary using server-side credentials
 */
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    }

    let publicId = body?.publicId;

    if (!publicId) {
      res.status(400).json({
        success: false,
        message: "publicId is required",
      });
      return;
    }

    publicId = String(publicId).trim().replace(/\.[^/.]+$/, "");

    // Ignore local blob/placeholder IDs
    if (publicId.startsWith("local-") || publicId.startsWith("blob:")) {
      res.status(200).json({ success: true, message: "Local placeholder, no deletion needed" });
      return;
    }

    const cloudName = (
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.VITE_CLOUDINARY_CLOUD_NAME ||
      "dtdpkfkw2"
    ).trim();

    const apiKey = (
      process.env.CLOUDINARY_API_KEY ||
      "572185387652824"
    ).trim();

    const apiSecret = (
      process.env.CLOUDINARY_API_SECRET ||
      "eh8AFjMNKk9WbhS1ycPkkBjNMkQ"
    ).trim();

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to delete Cloudinary image",
      error: String(error),
    });
  }
}
