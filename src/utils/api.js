const { REACT_APP_API_BASE: API_BASE } = process.env;

/* MOCK DATA TO REPLACE LATER */
const userList = [
  { name: 'Sara Rubin', email: 'sara.rubin@example.com' },
  { name: 'Mackenzie Turner', email: 'mackenzie.turner@example.com' },
  { name: 'John Smith', email: 'john.smith@example.com' },
  { name: 'Jane Miller', email: 'jane.miller@example.com' },
];

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

export async function fetchUserOptions(endpoint, options) {
  // const { userList } = await apiFetch(INSERT API CALL TO FETCH USER LIST);
  return (userList || []).map(({ name, email }) => ({
    key: email,
    text: name,
    value: email,
  }));
}
