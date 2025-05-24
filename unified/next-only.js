// Simple Next.js dev server without Express wrapper
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Next.js development server...');
console.log('📂 Directory:', process.cwd());

// Start Next.js directly
const nextProcess = spawn('npx', ['next', 'dev', '-p', '4000'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

nextProcess.on('error', (error) => {
  console.error('❌ Failed to start Next.js:', error);
});

nextProcess.on('exit', (code) => {
  console.log(`📱 Next.js process exited with code ${code}`);
});

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  nextProcess.kill('SIGTERM');
  process.exit(0);
});