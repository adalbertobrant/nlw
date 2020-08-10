const express = require('express');
const server = express();
const nunjuncks = require('nunjucks');

// consultorias disponíveis
const subjects = [
  'Planejamento Ortodôntico',
  'Análise Facial',
  'Análise 3D',
  'Análise Dinâmica das Arcadas',
  'Aparatologia Extra-Facial',
  'Aparelhos Ortopédicos - Intra Orais',
  'Fios Ortodonticos',
  'Ética Ortodôntica',
  'Mecânica Ortodôntica',
  'Discrepâncias Dentárias',
  'Marketing Ortodôntico',
  'Artigos,Monografias,Dissertações',
  'Produtos digitais',
  'Outros',
];
const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

//transforma número em string
function getSubject(subjectNumber) {
  const position = +subjectNumber - 1;
  return subjects[position];
}

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
