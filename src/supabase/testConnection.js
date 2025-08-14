import { supabase } from './config';

// Test database connection
export const testDatabaseConnection = async () => {
    try {
        console.log('🔍 Testing database connection...');
        
        // Try to fetch from a simple table or create a test query
        const { data, error } = await supabase
            .from('service_enquiries')
            .select('count(*)')
            .limit(1);

        if (error) {
            console.error('❌ Database connection test failed:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Database connection successful');
        return { success: true, data };
    } catch (error) {
        console.error('❌ Database connection exception:', error);
        return { success: false, error: error.message };
    }
};

// Test service enquiry insertion
export const testServiceEnquiryInsertion = async () => {
    try {
        console.log('🧪 Testing service enquiry insertion...');
        
        const testData = {
            service_name: 'Test Service',
            client_name: 'Test User',
            client_email: 'test@example.com',
            client_phone: '+1234567890',
            message: 'This is a test enquiry',
            status: 'new'
        };

        const { data, error } = await supabase
            .from('service_enquiries')
            .insert([testData])
            .select();

        if (error) {
            console.error('❌ Test insertion failed:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Test insertion successful:', data);
        
        // Clean up test data
        if (data && data[0]?.id) {
            await supabase
                .from('service_enquiries')
                .delete()
                .eq('id', data[0].id);
            console.log('🧹 Test data cleaned up');
        }

        return { success: true, data };
    } catch (error) {
        console.error('❌ Test insertion exception:', error);
        return { success: false, error: error.message };
    }
};