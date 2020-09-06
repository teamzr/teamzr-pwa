const next = require('next');
const express = require('express');
const { default: sslRedirect } = require('heroku-ssl-redirect');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(sslRedirect());

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Teamzr pwa ready on http://localhost:${port}`);
  });
});
