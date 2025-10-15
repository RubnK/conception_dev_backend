const registeredUsers = [
  { email: 'admin@test.com', password: '1234' },
  { email: 'user@test.com', password: 'abcd' }
];

export function getRegisteredUsers() {
  return registeredUsers;
}

export function checkCredentials(email, password) {
  return registeredUsers.find(u => u.email === email && u.password === password);
}

export function newUserRegistered(email, password) {
  const newUser = { email, password };
  registeredUsers.push(newUser);
  return newUser;
}
