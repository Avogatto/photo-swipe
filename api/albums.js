// https://github.com/googlesamples/google-photos/blob/master/REST/PhotoFrame/app.js

const { URLSearchParams } = require('url');
const fetch = require('node-fetch');
const firebase = require('firebase');
const {
  apiBase,
  requests: { albumPageSize, searchPageSize },
} = require('../config');
const { getShareTokens } = require('./user');

const db = firebase.firestore();

async function fetchJson({ body, endpoint, params, searchParams, userToken }) {
  const searchParamsString = searchParams
    ? `?${new URLSearchParams(searchParams).toString()}`
    : '';
  const fullUrl = `${apiBase}/${endpoint}${searchParamsString}`;
  console.log('Making request to:', fullUrl);
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

async function joinAlbum(userToken, shareToken) {
  const endpoint = `sharedAlbums:join`;
  const params = { method: 'POST' };
  const body = { shareToken };
  const result = await fetchJson({ body, endpoint, params, userToken });
  console.log('WE GOT A RESULT', result);
  return result;
}

async function joinPendingAlbums(userToken, userId) {
  const shareTokens = await getShareTokens(userId);
  const joinAllPromises = shareTokens.map(token => {
    return async () => {
      return joinAlbum(userToken, userId, token);
    };
  });
  return Promise.all(joinAllPromises);
}

async function updateAlbumStatus(albumId, active) {
  try {
    await db
      .collection('albums')
      .doc(albumId)
      .set(
        {
          active,
        },
        { merge: true }
      );
    console.log('success!');
  } catch (err) {
    console.error(err);
    throw new Error('Could not update album status.');
  }
}

async function activateAlbum(userToken, albumId) {
  try {
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
    await updateAlbumStatus(albumId, true);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error('Could not activate album.');
  }
}

async function createAlbum(userToken, title) {
  const params = { method: 'POST' };
  const body = { album: { title } };
  const album = await fetchJson({
    body,
    endpoint: 'albums',
    params,
    userToken,
  });
  console.log('THIS IS RESULT', album);
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

function getAlbums(userToken) {
  console.log('Loading albums from API.');
  return getPaginatedAlbumsList(userToken, 'albums');
}

async function getAlbumPhotos(userToken, albumId) {
  console.log('Loading album photos from API.');
  const params = { method: 'POST' };
  const endpoint = 'mediaItems:search';
  let photosList = [];
  let photos = null;
  let body = { albumId, pageSize: searchPageSize };
  do {
    const result = await fetchJson({ body, endpoint, params, userToken });
    ({ mediaItems: photos } = result || {});
    if (photos) {
      console.log(`Number of photos received: ${photos.length}`);
      photosList = photosList.concat(photos);
    }
    body = { ...body, pageToken: result.nextPageToken };
  } while (body.pageToken);

  console.log('Photos loaded for album');
  return photosList;
}

function getSharedAlbums(userToken) {
  console.log('Loading shared albums from API.');
  return getPaginatedAlbumsList(userToken, 'sharedAlbums');
}

async function updateTaggedUsers(albumId, photoId, taggedUsers) {
  try {
    await db
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .doc(photoId)
      .set(
        {
          taggedUsers,
        },
        { merge: true }
      );
  } catch (err) {
    console.error(err);
    throw new Error('Could not update tagged user.');
  }
}

async function getTaggedUsers(albumId, photoId) {
  try {
    const photo = await db
      .collection('albums')
      .doc(albumId)
      .collection('photos')
      .doc(photoId)
      .get();
    if (!photo.exists) {
      return [];
    }
    return photo.data().taggedUsers || [];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  createAlbum,
  getAlbums,
  getAlbumPhotos,
  getSharedAlbums,
  joinAlbum,
  joinPendingAlbums,
  activateAlbum,
  updateTaggedUsers,
  getTaggedUsers,
};
