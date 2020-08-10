const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
  //inserir dados
  proffyValue = {
    name: 'Adalberto Caldeira',
    avatar:
      'https://avatars3.githubusercontent.com/u/6125981?s=460&u=c1f198b08c3f5e7b893be3eac65873d274d918e3&v=4',
    whatsapp: '34991179515',
    bio:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.',
  };
  classValue = {
    subject: 1,
    cost: '50',
  };
  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 2000,
    },
    {
      weekday: 0,
      time_from: 520,
      time_to: 1280,
    },
  ];
  //await createProffy(db, { proffyValue, classValue, classScheduleValues });

  //consultar dados
  // todos os proffys
  const selectedProffys = await db.all('SELECT * FROM proffys');
  //consultar as classes de um determinado professor
  //e trazer junto os dados do professor
  const selectClassesAndProffys = await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `);
  // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
  // o horário do time_from precisa ser menor ou igual ao horário solicitado
  // o time_to precisa ser acima
  const selectClassesSchedules = await db.all(`
    SELECT class_schedule.* 
    FROM class_schedule
    WHERE class_schedule.class_id = 1
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "520"
    and class_schedule.time_to > "520"
  `);
  console.log(selectClassesSchedules);
});
