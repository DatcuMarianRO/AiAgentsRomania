import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Validate environment variables
const apiKey = process.env.OPENROUTER_API_KEY;
const apiUrl = process.env.OPENROUTER_API_URL || 'https://openrouter.ai/api/v1';

if (!apiKey) {
  throw new Error('Missing OpenRouter API key. Check your .env file.');
}

// Create OpenRouter API client
const openRouterClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3000',
    'X-Title': 'AI Agents Romania'
  }
});

export default openRouterClient;