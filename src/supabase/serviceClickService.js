import { supabase } from './config';

// Generate a simple session ID for tracking
const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
};

// Get user's IP address (simplified)
const getUserIP = async () => {
    try {
        // Use a timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch('https://api.ipify.org?format=json', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.log('Could not get IP:', error);
        return 'unknown';
    }
};

// Track service click
export const trackServiceClick = async (serviceName, serviceCategory = 'real_estate') => {
    try {
        console.log('📊 Tracking service click:', serviceName);
        
        const sessionId = getSessionId();
        const userAgent = navigator.userAgent;
        
        // Get IP in background, don't wait for it
        let userIP = 'unknown';
        getUserIP().then(ip => {
            userIP = ip;
        }).catch(() => {
            userIP = 'unknown';
        });

        const { data, error } = await supabase
            .from('service_clicks')
            .insert([{
                service_name: serviceName,
                service_category: serviceCategory,
                user_ip: userIP,
                user_agent: userAgent,
                session_id: sessionId
            }])
            .select();

        if (error) {
            console.error('❌ Error tracking service click:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service click tracked successfully');
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('❌ Exception in trackServiceClick:', error);
        return { success: false, error: error.message };
    }
};

// Get service analytics
export const getServiceAnalytics = async () => {
    try {
        console.log('📈 Fetching service analytics...');
        
        const { data, error } = await supabase
            .from('service_analytics')
            .select('*')
            .order('total_clicks', { ascending: false });

        if (error) {
            console.error('❌ Error fetching service analytics:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service analytics fetched successfully');
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('❌ Exception in getServiceAnalytics:', error);
        return { success: false, error: error.message };
    }
};

// Get service clicks with filters
export const getServiceClicks = async (filters = {}) => {
    try {
        console.log('📊 Fetching service clicks with filters:', filters);
        
        let query = supabase
            .from('service_clicks')
            .select('*')
            .order('click_timestamp', { ascending: false });

        // Apply filters
        if (filters.serviceName) {
            query = query.eq('service_name', filters.serviceName);
        }
        if (filters.serviceCategory) {
            query = query.eq('service_category', filters.serviceCategory);
        }
        if (filters.dateFrom) {
            query = query.gte('click_timestamp', filters.dateFrom);
        }
        if (filters.dateTo) {
            query = query.lte('click_timestamp', filters.dateTo);
        }
        if (filters.limit) {
            query = query.limit(filters.limit);
        }

        const { data, error } = await query;

        if (error) {
            console.error('❌ Error fetching service clicks:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Service clicks fetched successfully:', data?.length || 0);
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('❌ Exception in getServiceClicks:', error);
        return { success: false, error: error.message };
    }
};

// Get popular services
export const getPopularServices = async (limit = 10) => {
    try {
        console.log('🔥 Fetching popular services...');
        
        const { data, error } = await supabase
            .from('service_clicks')
            .select('service_name, service_category, count(*)')
            .group('service_name, service_category')
            .order('count', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('❌ Error fetching popular services:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Popular services fetched successfully');
        return { success: true, data: data || [] };
    } catch (error) {
        console.error('❌ Exception in getPopularServices:', error);
        return { success: false, error: error.message };
    }
};