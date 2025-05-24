import supabase from '../config/database';
import { User, UserRole, SubscriptionTier } from '../types/database';
import { AppError } from '../utils/errorHandler';

class UserModel {
  // Get user by ID
  async getById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(`Error fetching user: ${error.message}`, 500);
    }

    return data;
  }

  // Get user by email
  async getByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw new AppError(`Error fetching user by email: ${error.message}`, 500);
    }

    return data;
  }

  // Create new user
  async create(userData: Partial<User>): Promise<User> {
    // Set default values
    const newUser = {
      ...userData,
      role: userData.role || 'user' as UserRole,
      subscription_tier: userData.subscription_tier || 'free' as SubscriptionTier,
      credits_available: userData.credits_available || 0,
    };

    const { data, error } = await supabase
      .from('users')
      .insert([newUser])
      .select()
      .single();

    if (error) {
      throw new AppError(`Error creating user: ${error.message}`, 500);
    }

    return data;
  }

  // Update user
  async update(id: string, userData: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new AppError(`Error updating user: ${error.message}`, 500);
    }

    return data;
  }

  // Update user credits
  async updateCredits(id: string, amount: number): Promise<User> {
    // First get current credits to ensure we don't go negative
    const user = await this.getById(id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    const newCredits = user.credits_available + amount;
    
    // Don't allow negative credits
    if (newCredits < 0) {
      throw new AppError('Insufficient credits', 400);
    }
    
    return this.update(id, { credits_available: newCredits });
  }

  // Delete user
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(`Error deleting user: ${error.message}`, 500);
    }
  }
}

export default new UserModel();