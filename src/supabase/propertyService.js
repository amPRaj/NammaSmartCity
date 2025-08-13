import { supabase } from './config'

const PROPERTIES_TABLE = 'properties'

// Add new property
export const addProperty = async (propertyData) => {
    console.log("🚀 Adding property to Supabase...");
    console.log("📊 Property data summary:", {
        title: propertyData.title,
        price: propertyData.price,
        location: propertyData.location,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area,
        images: propertyData.images?.length || 0,
        firstImageUrl: propertyData.images?.[0]?.substring(0, 50) + "..." || "No images"
    });

    try {
        // Create the property document for Supabase
        const propertyDoc = {
            // Basic Info
            title: propertyData.title,
            description: propertyData.description,
            price: parseFloat(propertyData.price),
            location: propertyData.location,
            type: propertyData.type,

            // Property Details
            bedrooms: parseInt(propertyData.bedrooms) || 0,
            bathrooms: parseInt(propertyData.bathrooms) || 0,
            area: parseFloat(propertyData.area) || 0,

            // Images from Cloudinary
            images: propertyData.images || [],

            // Additional Details
            amenities: propertyData.amenities || [],
            featured: propertyData.featured || false,

            // Timestamps
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            status: 'active'
        };

        console.log("📝 Saving to Supabase...");
        const { data, error } = await supabase
            .from(PROPERTIES_TABLE)
            .insert([propertyDoc])
            .select()
            .single();

        if (error) {
            throw error;
        }

        console.log("✅ SUCCESS! Property saved to Supabase");
        console.log("🆔 Document ID:", data.id);
        console.log("🖼️ Cloudinary images included:", propertyDoc.images.length);

        return {
            success: true,
            id: data.id,
            message: `Property "${propertyData.title}" saved with ${propertyDoc.images.length} images`
        };

    } catch (error) {
        console.error("❌ Supabase save failed:", error);

        return {
            success: false,
            error: `Failed to save to Supabase: ${error.message}`,
            details: error.code || 'unknown-error'
        };
    }
};

// Get all properties - Optimized for fast loading
export const getAllProperties = async () => {
    console.log("⚡ Loading properties from Supabase...");

    try {
        // Always try Supabase first for fresh data
        console.log("🚀 Querying Supabase properties table...");

        const { data: properties, error } = await supabase
            .from(PROPERTIES_TABLE)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("❌ Supabase query error:", error);
            
            // Check if it's a table not found error
            if (error.code === 'PGRST106' || error.message.includes('does not exist')) {
                return {
                    success: false,
                    error: 'Properties table does not exist. Please run the schema SQL first.',
                    data: [],
                    source: 'error'
                };
            }
            
            throw error;
        }

        console.log("✅ Successfully loaded", properties?.length || 0, "properties from Supabase");
        
        if (properties && properties.length > 0) {
            // Cache successful results
            localStorage.setItem('mock_properties', JSON.stringify(properties));
            console.log("💾 Cached", properties.length, "properties for faster loading");
            
            // Log first property for debugging
            console.log("📋 Sample property:", {
                id: properties[0].id,
                title: properties[0].title,
                price: properties[0].price,
                location: properties[0].location,
                images: properties[0].images?.length || 0
            });
        } else {
            console.log("⚠️ No properties found in database");
        }

        return { 
            success: true, 
            data: properties || [], 
            source: 'supabase',
            count: properties?.length || 0
        };
        
    } catch (error) {
        console.error("❌ Failed to load properties:", error);

        // Try to load from cache as fallback
        try {
            const cachedProperties = JSON.parse(localStorage.getItem('mock_properties') || '[]');
            if (cachedProperties.length > 0) {
                console.log("📱 Fallback: loaded", cachedProperties.length, "properties from cache");
                return { 
                    success: true, 
                    data: cachedProperties, 
                    source: 'cache-fallback',
                    warning: 'Loaded from cache due to connection error'
                };
            }
        } catch (cacheError) {
            console.error("❌ Cache fallback failed:", cacheError);
        }

        return {
            success: false,
            error: error.message,
            data: [],
            source: 'error',
            details: error
        };
    }
};

// Get property by ID
export const getPropertyById = async (id) => {
    try {
        const { data: property, error } = await supabase
            .from(PROPERTIES_TABLE)
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return { success: false, error: "Property not found" };
            }
            throw error;
        }

        return { success: true, data: property };
    } catch (error) {
        console.error("Error getting property:", error);
        return { success: false, error: error.message };
    }
};

// Update property
export const updateProperty = async (id, propertyData) => {
    try {
        const { data, error } = await supabase
            .from(PROPERTIES_TABLE)
            .update({
                ...propertyData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error updating property:", error);
        return { success: false, error: error.message };
    }
};

// Delete property
export const deleteProperty = async (id) => {
    try {
        const { error } = await supabase
            .from(PROPERTIES_TABLE)
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error("Error deleting property:", error);
        return { success: false, error: error.message };
    }
};

// Upload property images using Supabase Storage
export const uploadPropertyImages = async (files, propertyId) => {
    console.log("uploadPropertyImages called with:", files.length, "files for property:", propertyId);

    try {
        console.log("Attempting Supabase Storage upload...");
        const uploadPromises = files.map(async (file, index) => {
            console.log(`Uploading file ${index}:`, file.name, file.size);

            const fileName = `properties/${propertyId}/image_${index}_${Date.now()}_${file.name}`;

            const { data, error } = await supabase.storage
                .from('property-images')
                .upload(fileName, file);

            if (error) {
                throw error;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('property-images')
                .getPublicUrl(fileName);

            console.log(`File ${index} uploaded successfully:`, publicUrl);
            return publicUrl;
        });

        const imageUrls = await Promise.all(uploadPromises);
        console.log("All images uploaded successfully:", imageUrls.length);
        return { success: true, urls: imageUrls };
    } catch (error) {
        console.error("Error uploading images to Supabase:", error);
        console.log("Error code:", error.code);
        console.log("Error message:", error.message);

        // Fallback for development - convert to base64
        console.log("Attempting fallback to base64...");
        try {
            const base64Promises = files.map((file, index) => {
                console.log(`Converting file ${index} to base64:`, file.name);
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        console.log(`File ${index} converted to base64`);
                        resolve(e.target.result);
                    };
                    reader.onerror = (error) => {
                        console.error(`Error converting file ${index}:`, error);
                        resolve(null);
                    };
                    reader.readAsDataURL(file);
                });
            });

            const base64Urls = await Promise.all(base64Promises);
            const validUrls = base64Urls.filter(url => url !== null);
            console.log("Base64 conversion completed:", validUrls.length, "valid URLs");
            return { success: true, urls: validUrls, mock: true };
        } catch (mockError) {
            console.error("Fallback base64 conversion failed:", mockError);
            return { success: false, error: "Failed to process images: " + mockError.message };
        }
    }
};

// Get featured properties
export const getFeaturedProperties = async () => {
    try {
        const { data: properties, error } = await supabase
            .from(PROPERTIES_TABLE)
            .select('*')
            .eq('featured', true)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return { success: true, data: properties };
    } catch (error) {
        console.error("Error getting featured properties:", error);
        return { success: false, error: error.message };
    }
};