// https://github.com/googlesamples/google-photos/blob/master/REST/PhotoFrame/app.js

const { URLSearchParams } = require('url');
const persist = require('node-persist');
const fetch = require('node-fetch');
const {
  apiBase,
  requests: { albumPageSize },
} = require('../../config');
const {
  getShareTokens
} = require('./user');

let albumCache = null;
let sharedAlbumCache = null;

async function initializeCache() {
  albumCache = persist.create({
    dir: 'persist-albumcache/',
    ttl: 600000,
  });
  sharedAlbumCache = persist.create({
    dir: 'persist-sharedalbumcache/',
    ttl: 600000,
  });
  return Promise.all([albumCache.init(), sharedAlbumCache.init()]);
}

async function fetchJson({ body, endpoint, params, searchParams, userToken }) {
  const searchParamsString = new URLSearchParams(searchParams).toString();
  const fullUrl = `${apiBase}/${endpoint}?${searchParamsString}`;
  console.log('Maing request to:', fullUrl);
  const response = await fetch(fullUrl, {
    ...params,
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  });
  const result = await response.json();
  if (response.status !== 200) throw result;
  return result;
}

async function joinAlbum(userToken, userId, shareToken) {
  const endpoint = `sharedAlbums:join`;
  const params = { method: 'POST' };
  const body = { shareToken };
  const result = await fetchJson({ body, endpoint, params, userToken });
  console.log('WE GOT A RESULT', result);
  await sharedAlbumCache.removeItem(userId);
  return result;
}

async function joinPendingAlbums(userToken, userId) {
  const shareTokens = getShareTokens(userId);
  const joinAllPromises = shareTokens.map(token => {
    return async () => {
      return joinAlbum(userToken, userId, token);
    };
  });
  return Promise.all(joinAllPromises);
}

async function shareAlbum(userToken, userId, albumId) {
  const endpoint = `albums/${albumId}:share`;
  const params = { method: 'POST' };
  const body = {
    sharedAlbumOptions: {
      isCollaborative: false,
      isCommentable: true,
    },
  };
  const result = await fetchJson({ body, endpoint, params, userToken });
  console.log('WE GOT A RESULT', result);
  await sharedAlbumCache.removeItem(userId);
  return result;
}

async function createAlbum(userToken, userId, title) {
  const params = { method: 'POST' };
  const body = { album: { title } };
  const album = await fetchJson({
    body,
    endpoint: 'albums',
    params,
    userToken,
  });
  console.log('THIS IS RESULT', album);
  await albumCache.removeItem(userId);
  return album;
}

async function getPaginatedAlbumsList(userToken, endpoint) {
  let albumsList = [];
  let albums = null;
  let searchParams = {
    pageSize: albumPageSize,
    excludeNonAppCreatedData: true,
  };
  do {
    const result =
      (await fetchJson({ endpoint, searchParams, userToken })) || {};
    albums = result[endpoint];
    if (albums) {
      console.log(`Number of ${endpoint} received: ${albums.length}`);
      albumsList = albumsList.concat(albums);
    }
    searchParams = { ...searchParams, pageToken: result.nextPageToken };
  } while (searchParams.pageToken);

  console.log(`${endpoint} loaded.`);
  return albumsList;
}

async function getAlbums(userToken, userId) {
  const cachedAlbums = await albumCache.getItem(userId);
  if (cachedAlbums) {
    console.log('Loaded albums from cache.');
    return cachedAlbums;
  }
  console.log('Loading albums from API.');
  try {
    const data = await getPaginatedAlbumsList(userToken, 'albums');
    await albumCache.setItem(userId, data);
    return data;
  } catch (err) {
    await albumCache.removeItem(userId);
    throw err;
  }
}

async function getSharedAlbums(userToken, userId) {
  const cachedAlbums = await sharedAlbumCache.getItem(userId);
  if (cachedAlbums) {
    console.log('Loaded shared albums from cache.');
    return cachedAlbums;
  }
  console.log('Loading shared albums from API.');
  try {
    const data = await getPaginatedAlbumsList(userToken, 'sharedAlbums');
    await sharedAlbumCache.setItem(userId, data);
    return data;
  } catch (err) {
    await sharedAlbumCache.removeItem(userId);
    throw err;
  }
}

module.exports = {
  createAlbum,
  getAlbums,
  getSharedAlbums,
  initializeCache,
  joinAlbum,
  joinPendingAlbums,
  shareAlbum,
  getShareTokens,
};
