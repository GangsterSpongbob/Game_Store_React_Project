const API_URL = 'http://localhost:5000/users';
const GAMES_URL = 'http://localhost:5000/games';

// Fetch all users
export async function getUsers() {
  const res = await fetch(API_URL);
  return res.json();
}

// Register new user
export async function registerUser(email, username, password) {
  const users = await getUsers();
  
  if (users.some(u => u.email === email)) {
    throw new Error('Email already registered');
  }

  const newUser = { email, username, password, library: [] };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  return res.json();
}

// Login: find user by email and password
export async function loginUser(email, password) {
  const users = await getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  return user;
}

// Change username
export async function updateUser(userId, updatedData) {
  const res = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
  return res.json();
}

export async function getGames() {
  const res = await fetch(GAMES_URL);
  return res.json();
}

export async function getGameById(id) {
  const res = await fetch(`${GAMES_URL}/${id}`);
  return res.json();
}