import { createClient } from '@/utils/supabase/client';
import { User, Agent, AgentCategory } from '@/types';

const supabaseClient = createClient();

// Supabase service for client-side interactions
const supabaseService = {
  // Auth methods
  auth: {
    // Get current session
    getSession: async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      return data.session;
    },

    // Sign up with email and password
    signUp: async (email: string, password: string, userData: Partial<User>) => {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      if (error) throw error;
      return data;
    },

    // Sign in with email and password
    signIn: async (email: string, password: string) => {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    },

    // Sign out
    signOut: async () => {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      return true;
    },

    // Update user
    updateUser: async (userData: Partial<User>) => {
      const { data, error } = await supabaseClient.auth.updateUser({
        data: userData
      });
      if (error) throw error;
      return data;
    },

    // Reset password
    resetPassword: async (email: string) => {
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return data;
    }
  },

  // User methods
  users: {
    // Get current user profile
    getCurrentUser: async () => {
      const { data: user, error } = await supabaseClient
        .from('users')
        .select('*')
        .single();
      
      if (error) throw error;
      return user as User;
    },

    // Update user profile
    updateProfile: async (userId: string, profileData: Partial<User>) => {
      const { data, error } = await supabaseClient
        .from('users')
        .update(profileData)
        .eq('id', userId)
        .select()
        .single();
      
      if (error) throw error;
      return data as User;
    }
  },

  // Agent methods
  agents: {
    // Get agent by ID
    getById: async (id: string) => {
      const { data, error } = await supabaseClient
        .from('agents')
        .select(`
          *,
          creator:creator_id(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Agent & { creator: Pick<User, 'id' | 'first_name' | 'last_name' | 'avatar_url'> };
    },

    // List agents with filters
    list: async (options: {
      page?: number;
      limit?: number;
      category_id?: string;
      creator_id?: string;
      visibility?: 'public' | 'private' | 'unlisted';
      featured?: boolean;
      search?: string;
    } = {}) => {
      const {
        page = 1,
        limit = 10,
        category_id,
        creator_id,
        visibility = 'public',
        featured,
        search
      } = options;

      let query = supabaseClient
        .from('agents')
        .select(`
          *,
          creator:creator_id(
            id,
            first_name,
            last_name,
            avatar_url
          )
        `, { count: 'exact' });

      // Apply filters
      if (category_id) {
        query = query.eq('category_id', category_id);
      }

      if (creator_id) {
        query = query.eq('creator_id', creator_id);
      }

      if (visibility) {
        query = query.eq('visibility', visibility);
      }

      if (featured !== undefined) {
        query = query.eq('featured', featured);
      }

      if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      return {
        agents: data,
        total: count || 0,
        page,
        limit,
        pages: Math.ceil((count || 0) / limit)
      };
    },

    // Get agent categories
    getCategories: async () => {
      const { data, error } = await supabaseClient
        .from('agent_categories')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      return data as AgentCategory[];
    }
  }
};

export default supabaseService;