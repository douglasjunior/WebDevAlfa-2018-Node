var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = "aA}QNw>'q^p~)bp(Va4{//efDM>D7,CjDdg?[~Xzx,h$:sh=.a"

/* GET users listing. */
router.get('/', function (req, res, next) {
  const { token } = req.headers;
  try {
    const payload = jwt.verify(token, SECRET_KEY)
    console.log('Token válido', payload)
    res.status(200).send('Acesso permitido.')
  } catch (exception) {
    console.error('Token inválido', exception)
    res.status(403).send('Acesso negado.')
  }
});

const USERNAME = 'douglas';
const PASSWORD = 'vaicurintia';

router.post('/login', function (request, response) {
  const { body } = request;
  const { username, password } = body;

  if (username === USERNAME && password === PASSWORD) {
    // usuário logado
    const payload = {
      username
    }
    const token = jwt.sign(payload, SECRET_KEY);
    response.status(200).json({
      token
    });
  } else {
    response.status(401).send('Usuário ou senha incorretos.');
  }
});

module.exports = router;
