// Simple script to create admin user via frontend for testing
// This will be used until backend database is properly configured

const createAdminUser = () => {
  const adminUser = {
    id: 'admin-001',
    email: 'office@inventevolution.com',
    first_name: 'Invent',
    last_name: 'Evolution',
    role: 'admin',
    subscription_tier: 'enterprise',
    credits_available: 999999,
    avatar_url: null
  };

  // Store in localStorage for frontend testing
  localStorage.setItem('adminUser', JSON.stringify(adminUser));
  localStorage.setItem('accessToken', 'admin-token-test');
  
  console.log('✅ Admin user created for testing:', adminUser);
  console.log('🔐 Login credentials:');
  console.log('📧 Email: office@inventevolution.com');
  console.log('🔒 Password: Invent.25Evolution$');
  
  return adminUser;
};

export default createAdminUser;