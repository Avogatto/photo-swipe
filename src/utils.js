const { REACT_APP_API_BASE: API_BASE } = process.env;

export async function apiFetch(endpoint, options) {
  const fetchOpts = options || { credentials: 'include' };
  try {
<<<<<<< HEAD
    const response = await fetch(`${API_BASE}${endpoint}`, fetchOpts);
    return response.json();
=======
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    console.log('response', response);
    return {};
    // return response.json();
>>>>>>> first pass at getting email
  } catch (err) {
    console.error(err.toString());
  }
}
