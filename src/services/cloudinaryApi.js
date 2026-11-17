/**
 * Cloudinary API utilities
 * Handles image uploading (client-side) and deletion (via /api/delete-image)
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dtdpkfkw2";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "abu_hady_landing";

/**
 * Upload an image file directly to Cloudinary (Unsigned upload)
 * @param {File|Blob} file
 * @returns {Promise<{ url: string, publicId: string }>}
 */
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
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || "Failed to upload image to Cloudinary");
    }

    const data = await res.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    // If upload fails, create an object URL for preview and throw or return fallback
    return {
      url: URL.createObjectURL(file),
      publicId: "local-" + Date.now(),
      error: err.message,
    };
  }
}

/**
 * Delete an image by its publicId via the /api/delete-image endpoint
 * Works both in Vite dev and in Vercel production serverless function
 * @param {string} publicId
 * @returns {Promise<{ success: boolean, result?: any }>}
 */
export async function deleteImage(publicId) {
  if (!publicId || typeof publicId !== "string" || publicId.startsWith("local-") || publicId.startsWith("blob:")) {
    return { success: true, message: "No remote deletion needed" };
  }

  try {
    const res = await fetch("/api/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.message || "Failed to delete image");
    }

    return await res.json();
  } catch (err) {
    console.warn("Cloudinary deleteImage error:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Replace an existing image: uploads new one and removes old one
 * @param {File|Blob} newFile
 * @param {string} oldPublicId
 * @returns {Promise<{ url: string, publicId: string }>}
 */
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

/**
 * Extract Cloudinary public_id from a Cloudinary image URL
 * @param {string} url
 * @returns {string}
 */
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
