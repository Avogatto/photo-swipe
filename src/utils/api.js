const { REACT_APP_API_BASE: API_BASE } = process.env;

export async function apiFetch(endpoint, options) {
  const fetchOpts = {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `${API_BASE}${endpoint}`;
  let response;

  try {
    response = await fetch(url, fetchOpts);
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('json')) return response.json();
    return response.text();
  } catch (err) {
    console.log(`failed to make fetch request to ${url}`, err.toString());
  }
}

export async function fetchUserOptions() {
  const { users } = await apiFetch('/users');
  return users.map(({ fullName, userEmail }) => ({
    key: userEmail,
    text: fullName,
    value: userEmail,
  }));
}

export async function createUser(user) {
  const result = await apiFetch('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return result;
}

export async function createAlbum(album) {
  const result = await apiFetch('/albums', {
    method: 'POST',
    body: JSON.stringify(album),
  });
  return result;
}
