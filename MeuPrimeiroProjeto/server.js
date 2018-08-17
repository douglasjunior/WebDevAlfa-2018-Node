// function requestCallback(request, response) {

// }

// const server = http.createServer(requestCallback);

// const server = http.createServer(function (request, response) {

// });

const http = require('http');
const porta = 3000;

const server = http.createServer((request, response) => {
    console.log('Requisição recebida.');

    response.setHeader('content-type', 'text/html; charset=utf-8');
    response.writeHead(200);
    response.write(`
        <html>
            <head></head>
            <body>
                <p><strong>Olá</strong> Mundo!</p>
            </body>
        </html>
    `);
    response.end();
});

server.listen(porta, () => {
    console.log('Servidor rodando na porta:', porta);
});
