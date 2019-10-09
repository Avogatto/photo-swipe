Photos

```json
{
  "id": "unique id of photo from google photos api response; string",
  "taggedUsers": "users who are tagged in the photo; array of user emails",
  "decisions": "a map of userIds to decisions, value for decision could be 'Approved' or 'Rejected'",
  "albumId": "unique id of album from google photos api response; string"
}
```

Users

```json
{
  "id": "email address of the user",
  "admin": "if true, the user has admin-level access; boolean",
  "authorized": "if true, the user is authorized to access the app; boolean",
  "fullName": "full name of user given as input; string",
  "taggedAlbums": "array of unique album ids from gphotos that the user has been tagged in",
  "shareTokens": "array of tokens from gphotos that are used to authorize the user to that shared album"
}
```

Albums

```json
{
  "id": "unique id of album from google photso api response; string",
  "active": "if true, the album is being actively shared; boolean",
  "photos": "subcollection of photo objects"
}
```
