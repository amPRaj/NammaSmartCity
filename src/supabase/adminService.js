import { supabase } from './config'

// Admin credentials (in production, store these securely)
const ADMIN_EMAIL = "admin@nammasmartcity.com";
const ADMIN_PASSWORD = "NammaSmart2024!";

// Admin login with Supabase Auth
export const adminLogin = async (email, password) => {
    try {
        if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
            return { success: false, error: "Invalid credentials" };
        }

        // Sign in with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // If user doesn't exist, create it (for development)
            if (error.message.includes('Invalid login credentials') || error.message.includes('User not found')) {
                try {
                    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                        email: email,
                        password: password,
                    });

                    if (signUpError) {
                        throw signUpError;
                    }

                    return { success: true, user: signUpData.user };
                } catch (createError) {
                    // If Supabase auth is not configured, use mock authentication
                    const mockUser = {
                        id: 'mock-admin-uid',
                        email: email,
                        user_metadata: { displayName: 'Admin User' }
                    };
                    return { success: true, user: mockUser };
                }
            }
            throw error;
        }

        return { success: true, user: data.user };
    } catch (error) {
        console.error("Admin login error:", error);
        return { success: false, error: error.message };
    }
};

// Admin logout
export const adminLogout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
        return { success: true };
    } catch (error) {
        console.error("Admin logout error:", error);
        return { success: false, error: error.message };
    }
};

// Check if user is admin
export const isAdmin = (user) => {
    return user && user.email === ADMIN_EMAIL;
};

// Listen to auth state changes
export const onAdminAuthStateChanged = (callback) => {
    try {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            const user = session?.user || null;
            callback(isAdmin(user) ? user : null);
        });

        return () => {
            subscription?.unsubscribe();
        };
    } catch (error) {
        console.error("Auth state change error:", error);
        // Return a mock unsubscribe function
        callback(null);
        return () => { };
    }
};

// Get current user
export const getCurrentUser = async () => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        return { success: true, user: isAdmin(user) ? user : null };
    } catch (error) {
        console.error("Error getting current user:", error);
        return { success: false, error: error.message };
    }
};