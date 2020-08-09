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
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
    subject: 'Oclusão',
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
      'Cirurgião Dentista, especialista em Ortodontia.Tem mestrado em clínica odontológica com área de concentração em prótese sobre implantes.Desenvolvimento de e-books digitais.',
    subject: 'Cefalometria',
    cost: '100',
    weekday: [3],
    time_from: [720],
    time_to: [1720],
  },
];
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
  return res.render('give-classes.html');
}
