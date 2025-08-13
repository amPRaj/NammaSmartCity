import { useState } from 'react';
import { supabase } from '../../supabase/config';

const SupabaseTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // Test 1: Basic connection
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.from('contacts').select('count', { count: 'exact' });
      
      if (error) {
        throw error;
      }

      setTestResult({
        success: true,
        message: `✅ Connection successful! Contacts table exists with ${data.length} records.`,
        details: data
      });

    } catch (error) {
      console.error('Connection test failed:', error);
      setTestResult({
        success: false,
        message: `❌ Connection failed: ${error.message}`,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testInsert = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      const testData = {
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        phone: '+91 9999999999',
        property_type: 'apartment',
        budget: '50L-1Cr',
        location: 'Test Location',
        message: 'This is a test inquiry',
        status: 'new'
      };

      const { data, error } = await supabase
        .from('contacts')
        .insert([testData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setTestResult({
        success: true,
        message: `✅ Test insert successful! Created contact with ID: ${data.id}`,
        details: data
      });

    } catch (error) {
      console.error('Insert test failed:', error);
      setTestResult({
        success: false,
        message: `❌ Insert failed: ${error.message}`,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Supabase Connection Test
      </h2>
      
      <div className="space-y-4">
        <button
          onClick={testConnection}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test Connection'}
        </button>

        <button
          onClick={testInsert}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 ml-2"
        >
          {isLoading ? 'Testing...' : 'Test Insert'}
        </button>

        {testResult && (
          <div className={`p-4 rounded-lg ${
            testResult.success 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <p className={`font-medium ${
              testResult.success 
                ? 'text-green-800 dark:text-green-200' 
                : 'text-red-800 dark:text-red-200'
            }`}>
              {testResult.message}
            </p>
            
            {testResult.details && (
              <pre className="mt-2 text-xs overflow-auto bg-gray-100 dark:bg-gray-700 p-2 rounded">
                {JSON.stringify(testResult.details, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Setup Instructions:
        </h3>
        <ol className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <li>1. Go to your Supabase dashboard</li>
          <li>2. Navigate to SQL Editor</li>
          <li>3. Copy and paste the contents of src/supabase/contactsSchema.sql</li>
          <li>4. Click "Run" to create the contacts table</li>
          <li>5. Come back and test the connection</li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseTest;