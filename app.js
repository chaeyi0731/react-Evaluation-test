const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3000;

app.use(express.static('html'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
