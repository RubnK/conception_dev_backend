const { getUsers, insertUser } = require('./db_utils');

async function main() {
  console.log('Liste des utilisateurs avant insertion :');
  console.log(await getUsers());

  console.log('\nInsertion d\'un nouvel utilisateur :');
  await insertUser({ email: 'nouvel_utilisateur@test.com' });

  console.log('\nListe des utilisateurs après insertion :');
  console.log(await getUsers());
}

main();
