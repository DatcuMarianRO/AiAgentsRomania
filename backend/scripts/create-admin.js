const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'your-supabase-url';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  try {
    const adminData = {
      email: 'office@inventevolution.com',
      password: 'Invent.25Evolution$',
      first_name: 'Invent',
      last_name: 'Evolution',
      role: 'admin',
      subscription_tier: 'enterprise',
      credits_available: 999999
    };

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminData.password, saltRounds);

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', adminData.email)
      .single();

    if (existingUser) {
      console.log('Admin user already exists, updating...');
      
      const { data, error } = await supabase
        .from('users')
        .update({
          first_name: adminData.first_name,
          last_name: adminData.last_name,
          role: adminData.role,
          subscription_tier: adminData.subscription_tier,
          credits_available: adminData.credits_available,
          password_hash: hashedPassword,
          updated_at: new Date().toISOString()
        })
        .eq('email', adminData.email)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('✅ Admin user updated successfully:', {
        id: data.id,
        email: data.email,
        role: data.role,
        subscription_tier: data.subscription_tier
      });
    } else {
      console.log('Creating new admin user...');

      const { data, error } = await supabase
        .from('users')
        .insert([{
          email: adminData.email,
          password_hash: hashedPassword,
          first_name: adminData.first_name,
          last_name: adminData.last_name,
          role: adminData.role,
          subscription_tier: adminData.subscription_tier,
          credits_available: adminData.credits_available,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('✅ Admin user created successfully:', {
        id: data.id,
        email: data.email,
        role: data.role,
        subscription_tier: data.subscription_tier
      });
    }

    console.log('\n🎉 Admin account ready!');
    console.log('📧 Email: office@inventevolution.com');
    console.log('🔐 Password: Invent.25Evolution$');
    console.log('👑 Role: admin');
    console.log('💎 Tier: enterprise');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();