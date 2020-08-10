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
