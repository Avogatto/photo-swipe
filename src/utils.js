const { REACT_APP_API_BASE: API_BASE } = process.env;

export async function apiFetch(endpoint, options = {}) {
  // { credentials: 'include' }
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    return response.json();
  } catch (err) {
    console.error(err.toString());
  }
}
