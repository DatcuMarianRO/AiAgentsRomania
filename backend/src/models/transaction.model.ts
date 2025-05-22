import supabase from '../config/database';
import { Transaction, TransactionType } from '../types/database';
import { AppError } from '../utils/errorHandler';
import userModel from './user.model';

class TransactionModel {
  // Create a new transaction
  async create(transactionData: {
    user_id: string;
    type: TransactionType;
    amount: number;
    description: string;
    reference_id?: string;
    stripe_payment_id?: string;
  }): Promise<Transaction> {
    // Start a transaction in Supabase
    const { data, error } = await supabase.rpc('create_transaction', {
      p_user_id: transactionData.user_id,
      p_type: transactionData.type,
      p_amount: transactionData.amount,
      p_description: transactionData.description,
      p_reference_id: transactionData.reference_id,
      p_stripe_payment_id: transactionData.stripe_payment_id
    });

    if (error) {
      throw new AppError(`Error creating transaction: ${error.message}`, 500);
    }

    // Update user credits
    await userModel.updateCredits(transactionData.user_id, transactionData.amount);

    return data;
  }

  // Get transaction by ID
  async getById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new AppError(`Error fetching transaction: ${error.message}`, 500);
    }

    return data;
  }

  // Get user transactions
  async getUserTransactions(
    userId: string,
    options: {
      page?: number;
      limit?: number;
      type?: TransactionType;
      sort_order?: 'asc' | 'desc';
    } = {}
  ): Promise<{ transactions: Transaction[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      type,
      sort_order = 'desc',
    } = options;

    const offset = (page - 1) * limit;

    // Start building the query
    let query = supabase
      .from('transactions')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

    // Apply type filter if provided
    if (type) {
      query = query.eq('type', type);
    }

    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: sort_order === 'asc' })
      .range(offset, offset + limit - 1);

    // Execute the query
    const { data, error, count } = await query;

    if (error) {
      throw new AppError(`Error fetching user transactions: ${error.message}`, 500);
    }

    return {
      transactions: data || [],
      total: count || 0,
    };
  }

  // Get transaction summary for user
  async getUserTransactionSummary(userId: string): Promise<{ 
    total_credits_purchased: number;
    total_credits_spent: number;
    total_earnings: number;
  }> {
    const { data, error } = await supabase.rpc('get_user_transaction_summary', {
      p_user_id: userId
    });

    if (error) {
      throw new AppError(`Error fetching transaction summary: ${error.message}`, 500);
    }

    return data;
  }
}

export default new TransactionModel();