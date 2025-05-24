import React from 'react';
import Head from 'next/head';

export default function DebugPage() {
  return (
    <>
      <Head>
        <title>Debug Page - AI Agents România</title>
      </Head>
      
      <div style={{ 
        minHeight: '100vh', 
        background: '#0a0a0a', 
        color: '#ffffff',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Debug Page</h1>
        <p style={{ marginBottom: '1rem' }}>This is a simple debug page to test if the application is working.</p>
        
        <div style={{ 
          padding: '1rem', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          marginBottom: '1rem' 
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Environment Info:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>✅ Page is rendering</li>
            <li>✅ CSS is working</li>
            <li>✅ JavaScript is enabled</li>
            <li>🔍 Check browser console for errors</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <a href="/" style={{ 
            color: '#3b82f6', 
            textDecoration: 'underline',
            fontSize: '1.2rem' 
          }}>
            ← Back to Homepage
          </a>
        </div>
      </div>
    </>
  );
}