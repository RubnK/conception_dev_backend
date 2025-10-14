const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>bonjour html</h1></body></html>');
});

app.get('/some-json', (req, res) => {
  const personne = { age: 22, nom: 'Jane' };
  res.json(personne);
});

app.get('/transaction', (req, res) => {
  const transactions = [100, 2000, 3000];
  res.json(transactions);
});

app.get('/exo-query-string', (req, res) => {
  console.log(req.query);
  const { age } = req.query;
  if (age) {
    res.send(`<h1>Age: ${age}</h1>`);
  } else {
    res.send('hello');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})