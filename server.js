const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'index.html');
  res.sendFile(filePath);
});

app.get('/main.html', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'main.html');
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
