const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Health check
  server.get('/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      server: 'simplified-next',
      port: port
    });
  });

  // Handle all requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      console.error('❌ Error starting server:', err);
      if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${port} is already in use. Trying port ${port + 1}...`);
        server.listen(port + 1, () => {
          console.log(`🚀 Server running on http://localhost:${port + 1}`);
        });
      }
    } else {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📱 Frontend: http://localhost:${port}`);
      console.log(`💚 Health: http://localhost:${port}/health`);
    }
  });
}).catch((ex) => {
  console.error('❌ Failed to start:', ex);
  process.exit(1);
});