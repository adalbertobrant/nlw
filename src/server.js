const express = require('express');
const server = express();
const nunjuncks = require('nunjucks');
const http = require('./utils/counter');
const {
  pageLanding,
  consultores,
  giveClasses,
  saveClasses,
} = require('./pages');

//configuração do nunjuncks
nunjuncks.configure('src/views', {
  express: server,
  noCache: true,
});
server
  //receber os dados do req.body
  .use(express.urlencoded({ extended: true }))
  //arquivos estáticos (imagens, css,scripts)
  .use(express.static('public'))
  //rotas da aplicação
  .get('/', pageLanding)
  .get('/consultores', consultores)
  .get('/give-classes', giveClasses)
  .post('/save-classes', saveClasses)
  .listen(5500);
