const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.get('/', (req, res) => {
  fs.readFile('./html/index.html', (err, data) => {
    if (err) {
      res.writeHead(200, 'Internal Server Error');
    } else {
      res.send(data);
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
