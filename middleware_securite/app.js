import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getRegisteredUsers, checkCredentials, newUserRegistered } from './inMemoryUserRepository.js';

const app = express();
app.use(express.json());

let authenticatedUsers = {};

function firewall(req, res, next) {
  const nonProtected = ['/hello', '/authenticate', '/register'];
  const url = req.path;
  const token = req.headers.authorization;

  if (nonProtected.includes(url)) return next();

  if (!token || !authenticatedUsers[token]) {
    return res.status(403).json({ error: 'Accès refusé' });
  }

  next();
}

app.use(firewall);

console.log('Utilisateurs enregistrés au démarrage :', getRegisteredUsers());

app.get('/hello', (req, res) => {
  res.send('<h1>Hello</h1>');
});

app.get('/restricted1', (req, res) => {
  res.json({ message: 'topsecret' });
});

app.get('/restricted2', (req, res) => {
  res.send('<h1>Admin space</h1>');
});

app.post('/authenticate', (req, res) => {
  const { email, password } = req.body;
  const validUser = checkCredentials(email, password);

  if (!validUser) {
    return res.status(403).json({ error: 'Identifiants invalides' });
  }

  const token = uuidv4();
  authenticatedUsers[token] = { email };
  res.json({ token });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email et mot de passe requis' });

  const user = newUserRegistered(email, password);
  res.json({ message: 'Utilisateur enregistré', user });
});

app.listen(3000, () => console.log('Serveur lancé sur http://localhost:3000'));
