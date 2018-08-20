const express = require('express');
// const bodyParser = require('body-parser');
const { checkSchema, validationResult }
  = require('express-validator/check');

const porta = 3000;
const server = express();

const USUARIOS = [
  { id: 1, nome: 'Douglas', profissao: 'Professor' },
  { id: 2, nome: 'José', profissao: 'Analista' },
  { id: 3, nome: 'João', profissao: 'Programador' },
  { id: 4, nome: 'Maria', profissao: 'Suporte' },
];

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use((request, response, next) => {
  const { token } = request.query;
  if (token === 'super-secreto') {
    next();
  } else {
    response.status(403).send('Acesso não permitido.');
  }
});

server.get('/usuarios', (request, response) => {
  response.status(200).json(USUARIOS)
});

server.get('/usuarios/:usuarioId',
  checkSchema({
    usuarioId: {
      in: 'params',
      isInt: {
        options: { min: 1 }
      },
      toInt: true,
      errorMessage: 'Informe o ID do usuário na URL.'
    }
  }),
  (request, response) => {
    // let usuarioEncontrado;
    // for (let i = 0; i < USUARIOS.length; i++) {
    //     const usuario = USUARIOS[i];
    //     if (usuario.id === parseInt(usuarioId)) {
    //         usuarioEncontrado = usuario;
    //         break;
    //     }
    // }

    // const usuarioId = request.params.usuarioId;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(422).json({
        errors: errors.array()
      });
      return;
    }

    const { usuarioId } = request.params;

    const usuarioEncontrado =
      USUARIOS.find(usuario => usuario.id === usuarioId)

    if (!usuarioEncontrado) {
      response.status(404).send('Usuário não encontrado.');
    } else {
      response.status(200).json(usuarioEncontrado);
    }
  });

server.post('/usuarios',
  checkSchema({
    nome: {
      in: 'body',
      isString: true,
      isLength: {
        options: { min: 1 }
      },
      trim: true,
      errorMessage: 'Informe o nome do usuário.'
    },
    profissao: {
      in: 'body',
      optional: true,
      isString: true,
      isLength: {
        options: { min: 1 }
      },
      trim: true,
      errorMessage: 'Informe a profissão usuário.'
    }
  }),
  (request, response) => {
    // let body = '';
    // request.on('data', (chunk) => {
    //     body += chunk;
    // })
    // request.on('end', () => {
    //     const usuario = JSON.parse(body);
    //     usuario.id = USUARIOS.length + 1;
    //     USUARIOS.push(usuario);
    //     response.status(201).json(usuario)
    // })
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.status(422).json({
        errors: errors.array()
      });
      return;
    }

    const { body } = request;
    const usuario = {
      id: USUARIOS.length + 1,
      nome: body.nome,
      profissao: body.profissao,
    }
    USUARIOS.push(usuario);
    response.status(201).json(usuario)
  });

server.listen(porta, () => {
  console.log('Servidor ouvindo na porta:', porta);
})