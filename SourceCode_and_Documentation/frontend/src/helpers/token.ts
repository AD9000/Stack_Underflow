function getToken(item: string) {
  return localStorage.getItem(item);
}

function storeToken(key: string, value: string) {
  localStorage.setItem(key, value)
}

export { getToken, storeToken };