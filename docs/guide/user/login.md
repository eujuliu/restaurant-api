# Login

After create your user, now you can login and get your authentication token, for do this you need to do a `POST` request to `https://your-domain/v1/user` with your registered email and password.

Example:

```json
{
  "email": "john@due.com",
  "password": "!Test1234"
}
```

## Results

### Success

If you pass the correct email and password, you will receive a `200 OK` status code and a `Set-Cookie` header with a JWT. You can see in cookies an item called `token` with the following data:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huQGR1ZS5jb20iLCJpZCI6ImRkYzBiNjAwLWE2YTMtNDAwMS04MzM5LWIwZGUxYmFjYjlhMCIsImlhdCI6MTUxNjIzOTAyMn0.m7gxXwgh_OUE2lzU88Yx2pamGhfHCDjjIJgVIagbq8A
```

in this token, you have the userId and the user email.

### Errors

If the data is invalid, you will get an error.

#### Some data is wrong

If one of the data or all data is wrong, you will receive `ValidationError` and a `400 Bad Request` status code.

Example response:

```json
{
  "name": "ValidationError",
  "message": "A validation error occurred",
  "action": "Change the data and try again",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
