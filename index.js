
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Cho phép Express phục vụ file tĩnh (CSS, JS, ảnh...)
app.use(express.static(path.join(__dirname, 'public')));

// Route trả về file index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Chạy server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

