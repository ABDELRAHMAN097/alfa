/**
 * Cloudinary API utilities
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dtdpkfkw2";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "abu_hady_landing";

export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await res.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    // If upload fails, create an object URL for preview
    return {
      url: URL.createObjectURL(file),
      publicId: "local-" + Date.now(),
    };
  }
}

export async function replaceImage(newFile, oldPublicId) {
  if (oldPublicId) {
    try {
      await deleteImage(oldPublicId);
    } catch (e) {
      console.warn("Could not delete old image:", e);
    }
  }
  return uploadImage(newFile);
}

export async function deleteImage(publicId) {
  console.log("Delete image requested for:", publicId);
  return { result: "ok" };
}

export function getPublicIdFromUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    return lastPart.split(".")[0];
  } catch {
    return "";
  }
}

