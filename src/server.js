const express = require('express');
const server = express();
const nunjuncks = require('nunjucks');

// dados dinâmicos
const consults = [
  {
    name: 'Adalberto Caldeira',
    avatar:
      'https://avatars3.githubusercontent.com/u/6125981?s=460&u=c1f198b08c3f5e7b893be3eac65873d274d918e3&v=4',
    whatsapp: '34991179515',
    bio:
      'Cirurgião Dentista, especialista em Ortodontia.<br> Tem mestrado em clínica odontológica com área de concentração em prótese sobre implantes.</br>',
    subject: 'Redes Sociais para profissionais de saúde',
    cost: '50',
    weekday: [0, 1, 2, 3, 4, 5, 6],
    time_from: [720],
    time_to: [2000],
  },
  {
    name: 'Adalberto C. Brant Filho',
    avatar:
      'https://avatars3.githubusercontent.com/u/6125981?s=460&u=c1f198b08c3f5e7b893be3eac65873d274d918e3&v=4',
    whatsapp: '34991179515',
    bio:
      'Cirurgião Dentista, especialista em Ortodontia.<br> Tem mestrado em clínica odontológica com área de concentração em prótese sobre implantes.</br>Desenvolvimento de e-books digitais.',
    subject: 'e-publicidade',
    cost: '100',
    weekday: [3],
    time_from: [720],
    time_to: [1720],
  },
];

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

function pageLanding(req, res) {
  return res.render('index.html');
}
function consultores(req, res) {
  return res.render('consultores.html');
}
function giveClasses(req, res) {
  return res.render('give-classes.html');
}
