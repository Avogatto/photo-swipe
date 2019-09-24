Photos

```json
{
    "id": "unique id of photo from google photos api response; string",
    "usersTagged": "users who are tagged in the photo; array of user emails",
    "usersApproved": "users who have approved the photo; array of user emails",
    "usersRejected": "users who have rejected the photo; array of user emails",
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
  "sharedAlbums": "array of unique album ids from gphotos that the user has been tagged in"
}
```

Albums

```json
{
  "id": "unique id of album from google photso api response; string",
  "active": "if true, the album is being actively shared; boolean"
}
```
