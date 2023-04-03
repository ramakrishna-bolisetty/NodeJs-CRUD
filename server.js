const express = require('express');
var bodyParser = require('body-parser');
const app = express()
const port = 3000;
const router = require('./routes/users.js');
app.use(bodyParser.json());
app.use('/', router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
