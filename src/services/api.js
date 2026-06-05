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

// Add a game to user's library
export async function addToLibrary(userId, gameId) {
  // First get current user
  const userRes = await fetch(`${API_URL}/${userId}`);
  const user = await userRes.json();
  
  // Check if game already in library
  const alreadyOwned = user.library.some(item => item.gameId === gameId);
  if (alreadyOwned) {
    throw new Error('Game already in library');
  }
  
  // Add new game with playtime 0
  const updatedLibrary = [...user.library, { gameId, playtime: 0 }];
  
  // Update user
  const updateRes = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ library: updatedLibrary })
  });
  return updateRes.json();
}

// Remove a game from user's library
export async function removeFromLibrary(userId, gameId) {
  const userRes = await fetch(`${API_URL}/${userId}`);
  const user = await userRes.json();
  
  const updatedLibrary = user.library.filter(item => item.gameId !== gameId);
  
  const updateRes = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ library: updatedLibrary })
  });
  return updateRes.json();
}

// Increase playtime by 1 hour
export async function incrementPlaytime(userId, gameId) {
  // Get current user
  const userRes = await fetch(`${API_URL}/${userId}`);
  const user = await userRes.json();
  
  // Find game in library
  const updatedLibrary = user.library.map(item => {
    if (item.gameId === gameId) {
      return { ...item, playtime: item.playtime + 1 };
    }
    return item;
  });
  
  // Update user
  const updateRes = await fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ library: updatedLibrary })
  });
  return updateRes.json();
}