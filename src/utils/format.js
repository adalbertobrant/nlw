// lib para o contador
const http = require('http');

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
// converte horas em minutos
function toMinutes(timeInHours) {
  let [hours, minutes] = timeInHours.split(':'); // desconstrução do array pegando dois elementos
  return Number(hours) * 60 + Number(minutes);
}

async function counter() {
  const contador = await http.get(
    { host: 'api.ipify.org', port: 80, path: '/' },
    function (resp) {
      resp.on('data', function (ip) {
        // envia os dados do ip
        console.log(' ip = ' + ip);
      });
    }
  );
}
module.exports = {
  subjects,
  weekdays,
  getSubject,
  toMinutes,
  counter,
};
