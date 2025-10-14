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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})