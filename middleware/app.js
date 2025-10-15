const express = require('express');
const app = express();

function loggerMiddleware(req, res, next) {
  console.log('Nouvelle requête entrante : ' + req.method + ' ' + req.url + ' - ' + new Date().toISOString());
  next();
}

app.use(express.json());
app.use(loggerMiddleware);

app.use('/', express.static('templates'));
app.use('/public', express.static('public'));

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
