import { uploadToCloudinary, uploadToCloudinaryFast, createOptimizedImage, createThumbnail } from '../config/cloudinary';

// Compress image before upload for faster performance
const compressImage = (file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth || height > maxHeight) {
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw and compress
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(resolve, 'image/jpeg', quality);
        };

        img.src = URL.createObjectURL(file);
    });
};

// Test function to debug upload issues
export const testCloudinaryUpload = async (file) => {
    console.log("🧪 Testing Cloudinary upload with file:", file.name, file.size);

    try {
        const result = await uploadToCloudinaryFast(file, 'test');
        console.log("🧪 Test result:", result);
        return result;
    } catch (error) {
        console.error("🧪 Test failed:", error);
        return { success: false, error: error.message };
    }
};

// Upload multiple property images with optimizations
export const uploadPropertyImages = async (files, propertyId, onProgress) => {
    console.log("🚀 Fast Upload: Starting upload of", files.length, "files");
    console.log("🚀 Property ID:", propertyId);
    console.log("🚀 Files details:", files.map(f => ({ name: f.name, size: f.size, type: f.type })));

    try {
        // Step 1: Compress images in parallel for faster upload
        console.log("📦 Compressing images for faster upload...");
        const compressionPromises = files.map(async (file, index) => {
            if (file.size > 500000) { // Only compress files > 500KB
                const compressed = await compressImage(file, 0.85, 1920, 1080);
                console.log(`📦 File ${index + 1} compressed: ${file.size} → ${compressed.size} bytes`);
                return compressed;
            }
            return file;
        });

        const compressedFiles = await Promise.all(compressionPromises);
        if (onProgress) onProgress(20);

        // Step 2: Upload in batches for better performance
        const BATCH_SIZE = 3; // Upload 3 images at a time
        const results = [];

        for (let i = 0; i < compressedFiles.length; i += BATCH_SIZE) {
            const batch = compressedFiles.slice(i, i + BATCH_SIZE);
            console.log(`⚡ Uploading batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(compressedFiles.length / BATCH_SIZE)}`);

            const batchPromises = batch.map(async (file, batchIndex) => {
                const globalIndex = i + batchIndex;
                console.log(`☁️ Uploading file ${globalIndex + 1}:`, files[globalIndex].name);

                // Use fastest upload method first
                console.log(`🔄 Attempting upload for file ${globalIndex + 1}:`, files[globalIndex].name, `(${Math.round(file.size / 1024)}KB)`);
                const result = await uploadToCloudinaryFast(file, `properties/${propertyId}`);

                console.log(`📊 Upload result for file ${globalIndex + 1}:`, result);

                if (result.success) {
                    console.log(`✅ File ${globalIndex + 1} uploaded successfully to:`, result.url);
                    return {
                        url: result.url,
                        publicId: result.publicId,
                        width: result.width,
                        height: result.height,
                        thumbnail: createThumbnail(result.publicId).toURL(),
                        optimized: createOptimizedImage(result.publicId).toURL()
                    };
                } else {
                    console.error(`❌ Failed to upload file ${globalIndex + 1}:`, result.error);
                    console.error(`❌ Full error details:`, result);
                    return null;
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);

            // Update progress
            const progress = 20 + ((i + BATCH_SIZE) / compressedFiles.length) * 70;
            if (onProgress) onProgress(Math.min(progress, 90));
        }

        const successfulUploads = results.filter(result => result !== null);
        console.log("🎉 Fast Upload completed:", successfulUploads.length, "successful uploads");

        if (onProgress) onProgress(100);

        return {
            success: true,
            images: successfulUploads,
            count: successfulUploads.length
        };

    } catch (error) {
        console.error("💥 Fast Upload error:", error);

        // Quick fallback to base64 (no compression)
        console.log("🔄 Quick fallback to local storage...");
        try {
            const base64Results = await Promise.all(
                files.map((file, index) => {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => resolve({
                            url: e.target.result,
                            publicId: `local_${Date.now()}_${index}`,
                            width: null,
                            height: null,
                            thumbnail: e.target.result,
                            optimized: e.target.result,
                            isBase64: true
                        });
                        reader.onerror = () => resolve(null);
                        reader.readAsDataURL(file);
                    });
                })
            );

            const validResults = base64Results.filter(result => result !== null);
            console.log("📱 Local storage completed:", validResults.length, "files");

            return {
                success: true,
                images: validResults,
                count: validResults.length,
                fallback: true
            };
        } catch (fallbackError) {
            console.error("💥 Fallback failed:", fallbackError);
            return {
                success: false,
                error: "Upload failed completely",
                images: [],
                count: 0
            };
        }
    }
};

// Delete image from Cloudinary
export const deleteCloudinaryImage = async (publicId) => {
    try {
        // Note: Deleting requires server-side implementation due to API secret
        console.log("Cloudinary: Delete request for:", publicId);

        // For now, we'll just return success
        // In production, you'd call your backend API to delete the image
        return { success: true };
    } catch (error) {
        console.error("Cloudinary: Delete error:", error);
        return { success: false, error: error.message };
    }
};

// Get optimized image URL
export const getOptimizedImageUrl = (publicId, options = {}) => {
    if (!publicId || publicId.startsWith('data:')) {
        // Return as-is for base64 images
        return publicId;
    }

    return createOptimizedImage(publicId, options).toURL();
};

// Get thumbnail URL
export const getThumbnailUrl = (publicId) => {
    if (!publicId || publicId.startsWith('data:')) {
        // Return as-is for base64 images
        return publicId;
    }

    return createThumbnail(publicId).toURL();
};