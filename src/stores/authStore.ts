const TOKEN_KEY = "auth_token";

let inMemoryToken: string | null = null;

export function setToken(token: string) {
  inMemoryToken = token;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (inMemoryToken) return inMemoryToken;
  const token = localStorage.getItem(TOKEN_KEY);
  inMemoryToken = token;
  return token;
}

export function clearAuth() {
  inMemoryToken = null;
  localStorage.removeItem(TOKEN_KEY);
}
