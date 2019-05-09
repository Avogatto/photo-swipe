const { REACT_APP_API_BASE: API_BASE } = process.env;

export async function apiFetch(endpoint, options) {
  const fetchOpts = options || { credentials: 'include' };
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, fetchOpts);
    return response.json();
  } catch (err) {
    console.error(err.toString());
  }
}
