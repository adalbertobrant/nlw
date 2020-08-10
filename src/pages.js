const { subjects, weekdays, getSubject } = require('./utils/format');
const Database = require('./database/db');

//pagina inicial
function pageLanding(req, res) {
  return res.render('index.html');
}
//pagina consultores - professores
function consultores(req, res) {
  const filters = req.query;
  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render('consultores.html', { filters, subjects, weekdays });
  }

  // conversão de horas para minutos

  const query = `
  	SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
		SELECT class_schedule.* 
    	FROM class_schedule
    	WHERE class_schedule.class_id = classes.id
    	AND class_schedule.weekday = ${filters.weekday}
    	AND class_schedule.time_from <= ${filters.time_from}
    	AND class_schedule.time_to > ${filters.time_to}
	)
  `;

  return res.render('consultores.html', {
    //   consults,
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
module.exports = {
  pageLanding,
  consultores,
  giveClasses,
};
