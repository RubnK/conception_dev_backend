require('dotenv').config();
const { Client } = require('pg');

function getConnection() {
  return new Client({
    host: 'localhost',
    database: 'mabase',
    user: process.env.dbuser,
    password: process.env.dbpwd,
    port: 5432
  });
}

async function getUsers() {
  const client = getConnection();
  await client.connect();
  const mails = await client.query('SELECT * FROM users');
  await client.end();
  return mails.rows;
}

async function insertUser(user) {
  const client = getConnection();
  await client.connect();
  await client.query('INSERT INTO users (email) VALUES ($1)', [user.email]);
  await client.end();
  console.log('Utilisateur ajouté :', user.email);
}

module.exports = { getUsers, insertUser };
