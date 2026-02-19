const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from Multi-Env CI/CD Pipeline!");
});

server.listen(3000);
