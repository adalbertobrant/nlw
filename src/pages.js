const {
  subjects,
  weekdays,
  getSubject,
  toMinutes,
  counter,
} = require('./utils/format');
const Database = require('./database/db');

//pagina inicial
function pageLanding(req, res) {
  return res.render('index.html');
}
//pagina consultores - professores
async function consultores(req, res) {
  const filters = req.query;
  if (!filters.subject || !filters.weekday || !filters.time) {
    return res.render('consultores.html', { filters, subjects, weekdays });
  }
  // conversão de horas para minutos
  const epochMinutes = toMinutes(filters.time);
  const query = `
  	SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
		SELECT class_schedule.* 
    	FROM class_schedule
    	WHERE class_schedule.class_id = classes.id
    	AND class_schedule.weekday = ${filters.weekday}
    	AND class_schedule.time_from <= ${epochMinutes}
    	AND class_schedule.time_to > ${epochMinutes}
  )
  AND classes.subject = '${filters.subject}'
  `;
  // em caso de erro na hora da consulta do banco de dados
  try {
    const db = await Database;
    const consults = await db.all(query);
    consults.map((consult) => {
      consult.subject = getSubject(consult.subject);
    });
    return res.render('consultores.html', {
      consults,
      subjects,
      filters,
      weekdays,
    });
  } catch (error) {
    console.log(error);
  }
  /*return res.render('consultores.html', {
    //consults,
    filters,
    subjects,
    weekdays,
  });*/
}
// Página de formulário para professores
function giveClasses(req, res) {
  return res.render('give-classes.html', { subjects, weekdays });
}
// método post para receber os dados do formulário

async function saveClasses(req, res) {
  const createProffy = require('./database/createProffy');
  const proffyValue = {
    name: req.body.name,
    avatar: req.body.avatar,
    whatsapp: req.body.whatsapp,
    bio: req.body.bio,
  };
  const classValue = {
    subject: req.body.subject,
    cost: req.body.cost,
  };
  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: toMinutes(req.body.time_from[index]),
      time_to: toMinutes(req.body.time_to[index]),
    };
  });
  try {
    const db = await Database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });
    let queryString = '?subject=' + getSubject(req.body.subject);
    console.log(getSubject(req.body.subject));
    queryString += '&weekday=' + req.body.weekday[0];
    queryString += '&time=' + req.body.time_from[0];
    return res.redirect('/consultores' + queryString);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  pageLanding,
  consultores,
  giveClasses,
  saveClasses,
};
