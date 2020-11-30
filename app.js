const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

const studentsData = JSON.parse(
  fs.readFileSync('./data/students.json', 'utf-8')
);

// ROUTES
// Homepage
app.get('/', (req, res) => {
  res.send('Homepage');
});

// GET students
app.get('/students', (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: studentsData.length,
    data: {
      studens: studentsData,
    },
  });
});

// GET url students
app.get('/students/:id?', (req, res) => {
  console.log(req.params);
  const studentId = parseInt(req.params.id);

  const student = studentsData.find((student) => student.id === studentId);

  if (!student) {
    res.status(404).json({
      status: '404',
      message: 'Id not on server',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      student,
    },
  });
});

// POST student
app.post('/students', (req, res) => {
  const idCreated = studentsData[studentsData.length - 1].id + 1;
  const studentCreated = Object.assign({ id: idCreated }, req.body);

  studentsData.push(studentCreated);

  fs.writeFile('./data/students.json', JSON.stringify(studentsData), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        student: studentCreated,
      },
    });
  });
});

//
app.listen(8000, () => {
  console.log('Server Started');
});
