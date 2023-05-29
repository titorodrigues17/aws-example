const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Conexión a la base de datos MongoDB Atlas
mongoose.connect('mongodb+srv://students:Unidades2023@clusternuevo.qltlfr6.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});

// Definición del esquema de datos
const studentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  autoselft: Number
});

// Definición del modelo de estudiante
const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'index.html');
  res.sendFile(filePath);
});

app.get('/main.html', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'main.html');
  res.sendFile(filePath);
});

app.use(express.json());

app.get('/students', (req, res) => {
  // Obtener todos los estudiantes de la base de datos
  Student.find({}).exec()
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      console.error('Error retrieving students:', err);
      res.status(500).json({ error: 'Error retrieving students' });
    });
});

app.post('/students', (req, res) => {
  const { name, surname, autoselft } = req.body;

  // Crear un nuevo estudiante con los datos recibidos
  const newStudent = new Student({
    name: name,
    surname: surname,
    autoselft: autoselft
  });

  // Guardar el estudiante en la base de datos
  newStudent.save()
    .then(savedStudent => {
      res.json(savedStudent);
    })
    .catch(err => {
      console.error('Error saving student:', err);
      res.status(500).json({ error: 'Error saving student' });
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
