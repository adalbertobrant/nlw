const { subjects, weekdays, getSubject } = require('./utils/format');
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
// Página de formulário para professores
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
