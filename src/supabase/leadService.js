import { supabase } from './config'

// Test database connection and table existence
export const testDatabaseConnection = async () => {
    try {
        console.log('Testing database connection...');
        
        // Test basic connection
        const { data: connectionTest, error: connectionError } = await supabase
            .from('leads')
            .select('count')
            .limit(1);
            
        if (connectionError) {
            console.error('Connection test failed:', connectionError);
            return { 
                success: false, 
                error: `Connection failed: ${connectionError.message}`,
                details: connectionError
            };
        }
        
        // Test table structure
        const { data: structureTest, error: structureError } = await supabase
            .from('leads')
            .select('id, name, phone, email, status')
            .limit(1);
            
        if (structureError) {
            console.error('Structure test failed:', structureError);
            return { 
                success: false, 
                error: `Table structure issue: ${structureError.message}`,
                details: structureError
            };
        }
        
        console.log('Database connection test successful');
        return { 
            success: true, 
            message: 'Database connection and table structure verified',
            recordCount: connectionTest?.length || 0
        };
        
    } catch (error) {
        console.error('Database test error:', error);
        return { 
            success: false, 
            error: error.message,
            details: error
        };
    }
};

// Get all leads with optional filters
export const getLeads = async (filters = {}) => {
    try {
        let query = supabase
            .from('leads')
            .select(`
                *,
                lead_notes (
                    id,
                    note,
                    created_by,
                    created_at
                ),
                lead_activities (
                    id,
                    activity_type,
                    description,
                    created_by,
                    created_at
                )
            `)
            .order('created_at', { ascending: false });

        // Apply filters
        if (filters.status && filters.status !== 'all') {
            query = query.eq('status', filters.status);
        }
        if (filters.source && filters.source !== 'all') {
            query = query.eq('source', filters.source);
        }
        if (filters.assignedTo && filters.assignedTo !== 'all') {
            query = query.eq('assigned_to', filters.assignedTo);
        }
        if (filters.priority && filters.priority !== 'all') {
            query = query.eq('priority', filters.priority);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching leads:', error);
        return { success: false, error: error.message };
    }
};

// Get a single lead by ID
export const getLeadById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select(`
                *,
                lead_notes (
                    id,
                    note,
                    created_by,
                    created_at
                ),
                lead_activities (
                    id,
                    activity_type,
                    description,
                    created_by,
                    created_at
                )
            `)
            .eq('id', id)
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching lead:', error);
        return { success: false, error: error.message };
    }
};

// Create a new lead
export const createLead = async (leadData) => {
    try {
        console.log('Creating lead with data:', leadData);
        
        // Test database connection first
        const { data: testData, error: testError } = await supabase
            .from('leads')
            .select('count')
            .limit(1);
            
        if (testError) {
            console.error('Database connection test failed:', testError);
            throw new Error(`Database connection failed: ${testError.message}`);
        }
        
        // Clean and prepare lead data - handle additional fields
        const cleanedData = {
            // Core fields
            name: leadData.name || '',
            phone: leadData.phone || '',
            email: leadData.email || '',
            location: leadData.location || '',
            property_type: leadData.property_type || leadData['Property Type'] || '',
            budget: leadData.budget || leadData['Budget'] || '',
            source: leadData.source || 'call',
            message: leadData.message || leadData['Message'] || '',
            status: leadData.status || 'new',
            priority: leadData.priority || 'medium',
            lead_type: leadData.lead_type || leadData['Lead Type'] || 'buyer',
            assigned_to: leadData.assigned_to || leadData['Assigned To'] || '',
            
            // Extended fields
            owner: leadData.owner || leadData['Owner'] || '',
            contact: leadData.contact || leadData['Contact'] || '',
            plot_no: leadData.plot_no || leadData['Plot No'] || '',
            size: leadData.size || leadData['Size'] || '',
            direction: leadData.direction || leadData['Direction'] || '',
            price: leadData.price || leadData['Price'] || '',
            negotiable: leadData.negotiable || leadData['Negotiable'] || '',
            address: leadData.address || leadData['Address'] || '',
            landmark: leadData.landmark || leadData['Landmark'] || '',
            commission: leadData.commission || leadData['Commission'] || '',
            age: leadData.age || leadData['Age'] || '',
            water: leadData.water || leadData['Water'] || ''
        };
        
        const { data, error } = await supabase
            .from('leads')
            .insert([cleanedData])
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            
            // Provide more specific error messages
            if (error.code === 'PGRST116') {
                throw new Error('Table "leads" does not exist. Please run the database setup script first.');
            } else if (error.code === '42703') {
                throw new Error('Database schema needs to be updated. Please run the extended_leads_schema.sql script.');
            } else if (error.code === '23502') {
                throw new Error(`Missing required field: ${error.details}`);
            } else if (error.code === '23505') {
                throw new Error('A lead with this phone number or email already exists.');
            } else {
                throw new Error(`Database error: ${error.message} (Code: ${error.code})`);
            }
        }

        console.log('Lead created successfully:', data);

        // Try to log activity, but don't fail the whole operation if this fails
        try {
            await logLeadActivity(data.id, 'note_added', `Lead created: ${cleanedData.name}`, 'System');
        } catch (activityError) {
            console.warn('Failed to log activity, but lead was created:', activityError);
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error creating lead:', error);
        return { 
            success: false, 
            error: error?.message || error?.details || error?.hint || 'Unknown error occurred'
        };
    }
};

// Update a lead
export const updateLead = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Log status change activity if status was updated
        if (updates.status) {
            await logLeadActivity(id, 'status_change', `Status changed to: ${updates.status}`, 'System');
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error updating lead:', error);
        return { success: false, error: error.message };
    }
};

// Delete a lead
export const deleteLead = async (id) => {
    try {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (error) {
            throw error;
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting lead:', error);
        return { success: false, error: error.message };
    }
};

// Add a note to a lead
export const addLeadNote = async (leadId, note, createdBy) => {
    try {
        const { data, error } = await supabase
            .from('lead_notes')
            .insert([{
                lead_id: leadId,
                note,
                created_by: createdBy
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        // Log activity
        await logLeadActivity(leadId, 'note_added', `Note added: ${note.substring(0, 50)}...`, createdBy);

        // Update last_contact timestamp
        await supabase
            .from('leads')
            .update({ last_contact: new Date().toISOString() })
            .eq('id', leadId);

        return { success: true, data };
    } catch (error) {
        console.error('Error adding lead note:', error);
        return { success: false, error: error.message };
    }
};

// Log lead activity
export const logLeadActivity = async (leadId, activityType, description, createdBy) => {
    try {
        const { data, error } = await supabase
            .from('lead_activities')
            .insert([{
                lead_id: leadId,
                activity_type: activityType,
                description,
                created_by: createdBy
            }])
            .select()
            .single();

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error logging lead activity:', error);
        return { success: false, error: error.message };
    }
};

// Get lead statistics
export const getLeadStats = async () => {
    try {
        const { data: leads, error } = await supabase
            .from('leads')
            .select('status, created_at');

        if (error) {
            throw error;
        }

        const total = leads.length;
        const statusCounts = leads.reduce((acc, lead) => {
            acc[lead.status] = (acc[lead.status] || 0) + 1;
            return acc;
        }, {});

        const converted = statusCounts.converted || 0;
        const conversionRate = total > 0 ? ((converted / total) * 100).toFixed(1) : 0;

        // Calculate this month's leads
        const thisMonth = new Date();
        thisMonth.setDate(1);
        const thisMonthLeads = leads.filter(lead => 
            new Date(lead.created_at) >= thisMonth
        ).length;

        return {
            success: true,
            data: {
                total,
                new: statusCounts.new || 0,
                contacted: statusCounts.contacted || 0,
                qualified: statusCounts.qualified || 0,
                converted,
                lost: statusCounts.lost || 0,
                conversionRate: parseFloat(conversionRate),
                thisMonth: thisMonthLeads
            }
        };
    } catch (error) {
        console.error('Error fetching lead stats:', error);
        return { success: false, error: error.message };
    }
};

// Get leads due for follow-up
export const getFollowUpLeads = async () => {
    try {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .lte('follow_up_date', today.toISOString())
            .neq('status', 'converted')
            .neq('status', 'lost')
            .order('follow_up_date', { ascending: true });

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error fetching follow-up leads:', error);
        return { success: false, error: error.message };
    }
};

// Search leads
export const searchLeads = async (searchTerm) => {
    try {
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error searching leads:', error);
        return { success: false, error: error.message };
    }
};

// Bulk update leads
export const bulkUpdateLeads = async (leadIds, updates) => {
    try {
        const { data, error } = await supabase
            .from('leads')
            .update(updates)
            .in('id', leadIds)
            .select();

        if (error) {
            throw error;
        }

        // Log activities for each lead
        for (const leadId of leadIds) {
            if (updates.status) {
                await logLeadActivity(leadId, 'status_change', `Bulk status change to: ${updates.status}`, 'System');
            }
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error bulk updating leads:', error);
        return { success: false, error: error.message };
    }
};