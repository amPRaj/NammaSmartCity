import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import CryptoJS from 'crypto-js';

// Cloudinary configuration
export const cld = new Cloudinary({
    cloud: {
        cloudName: 'df8hiy8pi'
    }
});

// Cloudinary upload configuration
export const CLOUDINARY_CONFIG = {
    cloudName: 'df8hiy8pi',
    apiKey: '682235923659981',
    apiSecret: 'Yifc9bjRQAeyUfPXvPEmNQmCNSo',
    uploadPreset: 'property_images' // You'll need to create this in Cloudinary dashboard
};

// Helper function to create optimized image URLs
export const createOptimizedImage = (publicId, options = {}) => {
    const {
        width = 800,
        height = 600,
        crop = 'fill',
        quality: imgQuality = 'auto'
    } = options;

    return cld
        .image(publicId)
        .format('auto')
        .quality(imgQuality)
        .resize(auto().gravity(autoGravity()).width(width).height(height));
};

// Helper function to create thumbnail
export const createThumbnail = (publicId) => {
    return cld
        .image(publicId)
        .format('auto')
        .quality('auto')
        .resize(auto().gravity(autoGravity()).width(300).height(200));
};

// Generate proper HMAC-SHA1 signature for Cloudinary uploads
const generateSignature = (params, apiSecret) => {
    // Sort parameters alphabetically and create query string
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');

    // Generate HMAC-SHA1 signature
    const signature = CryptoJS.HmacSHA1(sortedParams, apiSecret).toString();
    console.log('🔐 Generated signature for params:', sortedParams);

    return signature;
};

// Fast upload method with multiple fallback strategies
export const uploadToCloudinaryFast = async (file, folder = 'properties') => {
    console.log('⚡ Fast Upload: Starting optimized upload...');
    console.log('📁 File details:', { name: file.name, size: file.size, type: file.type });

    // Strategy 1: Try with a working upload preset (create one if needed)
    const workingPresets = ['ml_default', 'unsigned_preset', 'property_images'];

    for (const preset of workingPresets) {
        try {
            console.log(`🔄 Trying preset: ${preset}`);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', preset);
            if (folder) formData.append('folder', folder);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Upload successful with preset ${preset}!`, data.secure_url);
                return {
                    success: true,
                    url: data.secure_url,
                    publicId: data.public_id,
                    width: data.width,
                    height: data.height
                };
            } else {
                const errorText = await response.text();
                console.log(`❌ Preset ${preset} failed:`, response.status, errorText);
            }
        } catch (error) {
            console.log(`❌ Preset ${preset} error:`, error.message);
        }
    }

    // Strategy 2: Try direct upload with proper authentication
    try {
        console.log('🔄 Strategy 2: Direct authenticated upload...');

        const timestamp = Math.round(Date.now() / 1000);

        // Create signature parameters
        const signatureParams = {
            timestamp: timestamp
        };

        if (folder) {
            signatureParams.folder = folder;
        }

        // Generate proper signature
        const signature = generateSignature(signatureParams, CLOUDINARY_CONFIG.apiSecret);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signature);

        if (folder) {
            formData.append('folder', folder);
        }

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Direct authenticated upload successful!', data.secure_url);
            return {
                success: true,
                url: data.secure_url,
                publicId: data.public_id,
                width: data.width,
                height: data.height
            };
        } else {
            const errorText = await response.text();
            console.log('❌ Direct authenticated upload failed:', response.status, errorText);
        }
    } catch (error) {
        console.log('❌ Strategy 2 error:', error.message);
    }

    // Strategy 3: Try with proper signature
    try {
        console.log('🔄 Strategy 3: Trying signed upload...');
        const result = await uploadSigned(file, folder);
        if (result.success) {
            console.log('✅ Signed upload successful!');
            return result;
        }
    } catch (error) {
        console.log('❌ Strategy 3 failed:', error.message);
    }

    // All strategies failed - return detailed error
    return {
        success: false,
        error: 'All upload strategies failed. You may need to create an upload preset in your Cloudinary dashboard. Go to Settings > Upload > Add upload preset, name it "ml_default" and set it as unsigned.'
    };
};

// Strategy 1: Unsigned upload (requires upload preset)
const uploadUnsigned = async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Try default preset
    if (folder) formData.append('folder', folder);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
    );

    if (response.ok) {
        const data = await response.json();
        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height
        };
    } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
};

// Strategy 2: Signed upload
const uploadSigned = async (file, folder) => {
    const timestamp = Math.round(Date.now() / 1000);

    // Parameters for signature
    const uploadParams = {
        timestamp: timestamp,
    };

    if (folder) {
        uploadParams.folder = folder;
    }

    // Generate signature
    const signature = generateSignature(uploadParams, CLOUDINARY_CONFIG.apiSecret);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);

    if (folder) {
        formData.append('folder', folder);
    }

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
    );

    if (response.ok) {
        const data = await response.json();
        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height
        };
    } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
};

// Strategy 3: Basic upload without folder
const uploadBasic = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
    formData.append('timestamp', Math.round(Date.now() / 1000));

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
            method: 'POST',
            body: formData
        }
    );

    if (response.ok) {
        const data = await response.json();
        return {
            success: true,
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height
        };
    } else {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
};

// Simple fallback upload method
const uploadToCloudinarySimple = async (file, folder) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('api_key', CLOUDINARY_CONFIG.apiKey);
        formData.append('timestamp', Math.round(Date.now() / 1000));

        if (folder) {
            formData.append('folder', folder);
        }

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log('⚡ Simple upload successful!', data.secure_url);

            return {
                success: true,
                url: data.secure_url,
                publicId: data.public_id,
                width: data.width,
                height: data.height
            };
        } else {
            const errorText = await response.text();
            console.error('⚡ Simple upload failed:', response.status, errorText);

            return {
                success: false,
                error: `Upload failed: ${response.status} - ${errorText}`
            };
        }
    } catch (error) {
        console.error('⚡ Simple upload error:', error.message);
        return {
            success: false,
            error: `Upload failed: ${error.message}`
        };
    }
};

// Upload image to Cloudinary with multiple fallback methods (legacy)
export const uploadToCloudinary = async (file, folder = 'properties') => {
    console.log('Cloudinary: Starting upload process...');

    // Try multiple upload methods
    const uploadMethods = [
        // Method 1: Try with default unsigned preset
        async () => {
            console.log('Cloudinary: Trying method 1 - default unsigned preset');
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default'); // Default Cloudinary preset
            if (folder) formData.append('folder', folder);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        },

        // Method 2: Try without folder specification
        async () => {
            console.log('Cloudinary: Trying method 2 - without folder');
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'ml_default');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        },

        // Method 3: Try with signed upload (using API key)
        async () => {
            console.log('Cloudinary: Trying method 3 - signed upload');
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', CLOUDINARY_CONFIG.apiKey);

            const timestamp = Math.round(new Date().getTime() / 1000);
            formData.append('timestamp', timestamp);

            // For signed uploads, you'd normally need to generate a signature
            // For now, we'll try without signature as a basic upload
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            return await response.json();
        }
    ];

    // Try each method until one succeeds
    for (let i = 0; i < uploadMethods.length; i++) {
        try {
            console.log(`Cloudinary: Attempting upload method ${i + 1}...`);
            const data = await uploadMethods[i]();

            console.log(`Cloudinary: Upload method ${i + 1} successful!`, data.secure_url);
            return {
                success: true,
                url: data.secure_url,
                publicId: data.public_id,
                width: data.width,
                height: data.height
            };
        } catch (error) {
            console.error(`Cloudinary: Upload method ${i + 1} failed:`, error.message);

            // If this is the last method, return the error
            if (i === uploadMethods.length - 1) {
                console.error('Cloudinary: All upload methods failed');
                return {
                    success: false,
                    error: `All Cloudinary upload methods failed. Last error: ${error.message}`
                };
            }
        }
    }
};