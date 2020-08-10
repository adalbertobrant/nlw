const express = require('express');
const server = express();
const nunjuncks = require('nunjucks');
const { subjects, weekdays, getSubject } = require('./utils/format');

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

//pagina inicial
function pageLanding(req, res) {
  return res.render('index.html');
}

//pagina consultores - professores
function consultores(req, res) {
  const filters = req.query;
  return res.render('consultores.html', {
    consults,
    filters,
    subjects,
    weekdays,
  });
}

// formulário para professores
function giveClasses(req, res) {
  const data = req.query;
  const isEmpty = Object.keys(data).length > 0;
  // adicionar a variável data a lista de consults
  if (isEmpty) {
    data.subject = getSubject(data.subject);
    consults.push(data);
    return res.redirect('/consultores');
  } else {
    return res.render('give-classes.html', { subjects, weekdays });
  }
}
