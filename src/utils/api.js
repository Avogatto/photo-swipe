const { REACT_APP_API_BASE: API_BASE } = process.env;

export async function apiFetch(endpoint, options) {
  const fetchOpts = options || { credentials: 'include' };
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
