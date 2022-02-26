const express = require('express');
const app = express();

app.get('/hello', (req, res) =>
  res.send('Hello World!'));

  /**
 * Start a server at port 4000 locally.
 */
const PORT = 4000;
app.listen(PORT);
