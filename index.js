const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const data = {
    one: "oneOne",
    two: "twoTwo"
  }
  res.json(data);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on port ${port}`);
