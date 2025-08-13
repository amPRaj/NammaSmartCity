import { useState } from 'react';
import { getAllProperties } from '../../supabase/propertyService';
import { supabase } from '../../supabase/config';

const PropertyTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testPropertyConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      console.log('Testing property connection...');
      
      // Test 1: Direct Supabase query
      const { data: directData, error: directError } = await supabase
        .from('properties')
        .select('*')
        .limit(5);

      if (directError) {
        throw new Error(`Direct query failed: ${directError.message}`);
      }

      // Test 2: Using service function
      const serviceResult = await getAllProperties();

      setTestResult({
        success: true,
        directQuery: {
          count: directData?.length || 0,
          data: directData || []
        },
        serviceQuery: {
          success: serviceResult.success,
          count: serviceResult.data?.length || 0,
          data: serviceResult.data || [],
          source: serviceResult.source
        }
      });

    } catch (error) {
      console.error('Property test failed:', error);
      setTestResult({
        success: false,
        error: error.message,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testTableExists = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      // Check if properties table exists
      const { data, error } = await supabase
        .from('properties')
        .select('count', { count: 'exact' });

      if (error) {
        throw error;
      }

      setTestResult({
        success: true,
        message: `✅ Properties table exists with ${data.length} records`,
        tableExists: true
      });

    } catch (error) {
      console.error('Table check failed:', error);
      setTestResult({
        success: false,
        message: `❌ Properties table check failed: ${error.message}`,
        tableExists: false,
        error: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = () => {
    localStorage.removeItem('mock_properties');
    setTestResult({
      success: true,
      message: '✅ Cache cleared! Try refreshing the properties page.'
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Property Connection Test
      </h2>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testTableExists}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 mr-2"
        >
          {isLoading ? 'Testing...' : 'Check Table Exists'}
        </button>

        <button
          onClick={testPropertyConnection}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 mr-2"
        >
          {isLoading ? 'Testing...' : 'Test Property Fetch'}
        </button>

        <button
          onClick={clearCache}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg mr-2"
        >
          Clear Cache
        </button>
      </div>

      {testResult && (
        <div className={`p-4 rounded-lg ${
          testResult.success 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <p className={`font-medium mb-2 ${
            testResult.success 
              ? 'text-green-800 dark:text-green-200' 
              : 'text-red-800 dark:text-red-200'
          }`}>
            {testResult.message || (testResult.success ? 'Test Successful!' : 'Test Failed!')}
          </p>
          
          {testResult.directQuery && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Direct Supabase Query:</h3>
              <p>Found {testResult.directQuery.count} properties</p>
              {testResult.directQuery.data.length > 0 && (
                <div className="mt-2">
                  <p className="font-medium">Sample Property:</p>
                  <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1 overflow-auto">
                    {JSON.stringify(testResult.directQuery.data[0], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}

          {testResult.serviceQuery && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Service Query:</h3>
              <p>Success: {testResult.serviceQuery.success ? 'Yes' : 'No'}</p>
              <p>Count: {testResult.serviceQuery.count}</p>
              <p>Source: {testResult.serviceQuery.source}</p>
            </div>
          )}
          
          {testResult.error && (
            <pre className="mt-2 text-xs overflow-auto bg-gray-100 dark:bg-gray-700 p-2 rounded">
              {JSON.stringify(testResult.details || testResult.error, null, 2)}
            </pre>
          )}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Troubleshooting Steps:
        </h3>
        <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>1. Check if properties table exists in Supabase</li>
          <li>2. Verify RLS policies allow reading</li>
          <li>3. Check if properties have correct data structure</li>
          <li>4. Clear localStorage cache</li>
          <li>5. Check browser console for errors</li>
        </ol>
      </div>
    </div>
  );
};

export default PropertyTest;