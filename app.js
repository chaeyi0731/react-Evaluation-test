const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, './html/index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
