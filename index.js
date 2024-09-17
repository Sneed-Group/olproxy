const http = require('http');
const querystring = require('querystring');
const axios = require('axios');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
        const params = new URLSearchParams(body);

      axios.post('https://ollama-api.nodemixaholic.com/api/generate', {
        model: params.model,
        prompt: params.prompt
      })
      .then(response => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response.data));
      })
      .catch(error => {
        res.writeHead(418, { 'Content-Type': 'text/plain' });
        res.end('I\'m a teapot. I can\'t proxy ollama. (418 that\'s actually a 500...)');
      });
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

server.listen(6699, () => {
  console.log('Server listening on port 6699');
});