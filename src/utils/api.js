export async function makeRequest(endpoint, options) {
  const fetchOpts = {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const response = await fetch(endpoint, fetchOpts);
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('json')) return response.json();
    return response.text();
  } catch (err) {
    console.log(`failed to make request to ${endpoint}`, err.toString());
  }
}

export async function fetchUserOptions() {
  const { users } = await makeRequest('/api/users');
  return users.map(({ fullName, userEmail }) => ({
    key: userEmail,
    text: fullName,
    value: userEmail,
  }));
}

export async function fetchPhotos(albumId) {
  const { photos } = await makeRequest(`/api/albums/${albumId}/photos`);
  return photos || [];
}

export async function fetchAlbums() {
  const { albums } = await makeRequest('/api/albums');
  return albums || [];
}

export async function fetchSharedAlbums() {
  const { albums } = await makeRequest('/api/albums/shared');
  return albums || [];
}

export async function createUser(user) {
  const result = await makeRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });
  return result;
}

export async function createAlbum(album) {
  const result = await makeRequest('/api/albums', {
    method: 'POST',
    body: JSON.stringify(album),
  });
  return result;
}

export async function fetchTaggedUsers(albumId, photoId) {
  const result = await makeRequest(
    `/api/albums/${albumId}/photos/${photoId}/users`,
    {
      method: 'GET',
    }
  );
  return result.taggedUsers || [];
}

export async function updateTaggedUsers(albumId, photoId, taggedUsers) {
  try {
    const update = await makeRequest(
      `/api/albums/${albumId}/photos/${photoId}/users`,
      {
        method: 'POST',
        body: JSON.stringify({
          taggedUsers,
        }),
      }
    );
    return update;
  } catch (e) {
    console.error(e);
  }
}
