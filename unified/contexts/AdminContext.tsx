import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for platform settings
export interface PlatformSettings {
  // General Settings
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  
  // Security Settings
  passwordMinLength: number;
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorAuth: boolean;
  
  // Email Settings
  smtpHost: string;
  smtpPort: number;
  emailFrom: string;
  emailNotifications: boolean;
  
  // API Settings
  rateLimit: number;
  apiTimeout: number;
  enableApiDocs: boolean;
  corsEnabled: boolean;
  
  // Payment Settings
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  freePlanCredits: number;
  basicPlanPrice: number;
  premiumPlanPrice: number;
  enterprisePlanPrice: number;
  
  // AI Settings
  defaultModelProvider: string;
  maxTokensPerRequest: number;
  enableContentModeration: boolean;
  conversationHistory: number;
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'creator' | 'admin';
  subscription_tier: 'free' | 'basic' | 'premium' | 'enterprise';
  credits_available: number;
  created_at: string;
  last_login: string;
  status: 'active' | 'inactive' | 'suspended';
  total_conversations: number;
  total_spent: number;
  avatar_url?: string;
}

export interface SystemAlert {
  id: number;
  level: 'info' | 'warning' | 'error';
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface AdminContextType {
  // Platform Settings
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  savePlatformSettings: () => Promise<void>;
  
  // Users Management
  users: User[];
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  
  // System Monitoring
  systemAlerts: SystemAlert[];
  resolveAlert: (alertId: number) => void;
  addAlert: (alert: Omit<SystemAlert, 'id' | 'timestamp'>) => void;
  
  // Maintenance Mode
  enableMaintenanceMode: () => void;
  disableMaintenanceMode: () => void;
  
  // Statistics
  platformStats: {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    totalConversations: number;
  };
  refreshStats: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  // Default platform settings
  const [settings, setSettings] = useState<PlatformSettings>({
    siteName: 'AI Agents România',
    siteDescription: 'Marketplace Premium de Agenți AI specializați pe coduri CAEN',
    maintenanceMode: false,
    registrationEnabled: true,
    passwordMinLength: 8,
    sessionTimeout: 24,
    maxLoginAttempts: 5,
    twoFactorAuth: false,
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    emailFrom: 'noreply@ai-agents-romania.com',
    emailNotifications: true,
    rateLimit: 1000,
    apiTimeout: 30,
    enableApiDocs: true,
    corsEnabled: true,
    stripeEnabled: true,
    paypalEnabled: false,
    freePlanCredits: 100,
    basicPlanPrice: 149,
    premiumPlanPrice: 299,
    enterprisePlanPrice: 1299,
    defaultModelProvider: 'openrouter',
    maxTokensPerRequest: 4000,
    enableContentModeration: true,
    conversationHistory: 30
  });

  // Mock users data (in production this would come from backend)
  const [users, setUsers] = useState<User[]>([
    {
      id: 'admin-001',
      email: 'office@inventevolution.com',
      first_name: 'Invent',
      last_name: 'Evolution',
      role: 'admin',
      subscription_tier: 'enterprise',
      credits_available: 999999,
      created_at: '2025-01-15',
      last_login: '2025-05-22',
      status: 'active',
      total_conversations: 0,
      total_spent: 0
    },
    {
      id: 'user-001',
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'user',
      subscription_tier: 'premium',
      credits_available: 2500,
      created_at: '2025-05-10',
      last_login: '2025-05-22',
      status: 'active',
      total_conversations: 147,
      total_spent: 299
    },
    {
      id: 'user-002',
      email: 'maria.popescu@company.ro',
      first_name: 'Maria',
      last_name: 'Popescu',
      role: 'creator',
      subscription_tier: 'basic',
      credits_available: 850,
      created_at: '2025-04-22',
      last_login: '2025-05-21',
      status: 'active',
      total_conversations: 89,
      total_spent: 149
    },
    {
      id: 'user-003',
      email: 'alex.business@startup.com',
      first_name: 'Alexandru',
      last_name: 'Ionescu',
      role: 'user',
      subscription_tier: 'enterprise',
      credits_available: 15000,
      created_at: '2025-03-15',
      last_login: '2025-05-20',
      status: 'active',
      total_conversations: 523,
      total_spent: 1299
    },
    {
      id: 'user-004',
      email: 'test.user@email.com',
      first_name: 'Test',
      last_name: 'User',
      role: 'user',
      subscription_tier: 'free',
      credits_available: 50,
      created_at: '2025-05-01',
      last_login: '2025-05-15',
      status: 'inactive',
      total_conversations: 12,
      total_spent: 0
    }
  ]);

  // System alerts
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([
    {
      id: 1,
      level: 'warning',
      message: 'Utilizarea memoriei a depășit 70% pe serverul principal',
      timestamp: '2025-05-22T01:15:00Z',
      resolved: false
    },
    {
      id: 2,
      level: 'info',
      message: 'Backup automat completat cu succes',
      timestamp: '2025-05-22T00:00:00Z',
      resolved: true
    },
    {
      id: 3,
      level: 'error',
      message: 'Conexiune intermitentă cu baza de date Redis',
      timestamp: '2025-05-21T23:45:00Z',
      resolved: true
    }
  ]);

  // Platform statistics
  const [platformStats, setPlatformStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRevenue: 89450,
    totalConversations: 125634
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('platformSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }

    const savedUsers = localStorage.getItem('platformUsers');
    if (savedUsers) {
      try {
        const parsed = JSON.parse(savedUsers);
        setUsers(parsed);
      } catch (error) {
        console.error('Error parsing saved users:', error);
      }
    }

    const savedAlerts = localStorage.getItem('systemAlerts');
    if (savedAlerts) {
      try {
        const parsed = JSON.parse(savedAlerts);
        setSystemAlerts(parsed);
      } catch (error) {
        console.error('Error parsing saved alerts:', error);
      }
    }
  }, []);

  // Update platform statistics whenever users change
  useEffect(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const totalRevenue = users.reduce((sum, user) => sum + user.total_spent, 0);
    const totalConversations = users.reduce((sum, user) => sum + user.total_conversations, 0);

    setPlatformStats({
      totalUsers,
      activeUsers,
      totalRevenue,
      totalConversations
    });
  }, [users]);

  // Functions
  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('platformSettings', JSON.stringify(updated));
      return updated;
    });
  };

  const savePlatformSettings = async () => {
    // In production, this would call backend API
    localStorage.setItem('platformSettings', JSON.stringify(settings));
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Settings saved successfully');
        resolve();
      }, 500);
    });
  };

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => {
      const updated = prev.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      );
      localStorage.setItem('platformUsers', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => {
      const updated = prev.filter(user => user.id !== userId);
      localStorage.setItem('platformUsers', JSON.stringify(updated));
      return updated;
    });
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}`,
    };
    
    setUsers(prev => {
      const updated = [...prev, newUser];
      localStorage.setItem('platformUsers', JSON.stringify(updated));
      return updated;
    });
  };

  const resolveAlert = (alertId: number) => {
    setSystemAlerts(prev => {
      const updated = prev.map(alert => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      );
      localStorage.setItem('systemAlerts', JSON.stringify(updated));
      return updated;
    });
  };

  const addAlert = (alert: Omit<SystemAlert, 'id' | 'timestamp'>) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    
    setSystemAlerts(prev => {
      const updated = [newAlert, ...prev];
      localStorage.setItem('systemAlerts', JSON.stringify(updated));
      return updated;
    });
  };

  const enableMaintenanceMode = () => {
    updateSettings({ maintenanceMode: true });
    addAlert({
      level: 'warning',
      message: 'Modul de mentenanță a fost activat',
      resolved: false
    });
  };

  const disableMaintenanceMode = () => {
    updateSettings({ maintenanceMode: false });
    addAlert({
      level: 'info',
      message: 'Modul de mentenanță a fost dezactivat',
      resolved: false
    });
  };

  const refreshStats = () => {
    // In production, this would fetch fresh data from backend
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    
    setPlatformStats(prev => ({
      ...prev,
      totalUsers,
      activeUsers
    }));
  };

  const value: AdminContextType = {
    settings,
    updateSettings,
    savePlatformSettings,
    users,
    updateUser,
    deleteUser,
    addUser,
    systemAlerts,
    resolveAlert,
    addAlert,
    enableMaintenanceMode,
    disableMaintenanceMode,
    platformStats,
    refreshStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};