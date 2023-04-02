# Login

If you create a new user now you can login in this user and get your token for authentication, for do this you need to do a `POST` request to `https://your-domain/v1/user`

```json
{
  "email": "john@due.com",
  "password": "!Test1234"
}
```

## Results

### Success

if all data is correctly, you can see in the Cookies an item called `token` with a jwt, is like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huQGR1ZS5jb20iLCJpZCI6ImRkYzBiNjAwLWE2YTMtNDAwMS04MzM5LWIwZGUxYmFjYjlhMCIsImlhdCI6MTUxNjIzOTAyMn0.m7gxXwgh_OUE2lzU88Yx2pamGhfHCDjjIJgVIagbq8A
```

in this token, you have the userId and the user email.

### Error

If the data is invalid, you will get an error.

#### Some data is wrong

If one of the data or all data is wrong, you will get the following error with a `400` status code.

```json
{
  "name": "ValidationError",
  "message": "A validation error occurred",
  "action": "Change the data and try again",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
