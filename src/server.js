const express = require('express');
const server = express();
const nunjuncks = require('nunjucks');
const { pageLanding, consultores, giveClasses } = require('./pages');

//configuração do nunjuncks
nunjuncks.configure('src/views', {
  express: server,
  noCache: true,
});
server
  //arquivos estáticos (imagens, css,scripts)
  .use(express.static('public'))
  //rotas da aplicação
  .get('/', pageLanding)
  .get('/consultores', consultores)
  .get('/give-classes', giveClasses)
  .listen(5500);
