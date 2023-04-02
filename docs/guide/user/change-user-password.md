# Change user password

For change some user password, you need to do a `PUT` request and pass two required things.

First, you need to pass the following data:

```json
{
	"oldPassword": "!Test1234",
	"newPassword": "!Test4321",
	"confirmNewPassword": "!Test4321"
}
```

and second, you need to pass a header called `Authorization` with the following format:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huQGR1ZS5jb20iLCJpZCI6ImRkYzBiNjAwLWE2YTMtNDAwMS04MzM5LWIwZGUxYmFjYjlhMCIsImlhdCI6MTUxNjIzOTAyMn0.m7gxXwgh_OUE2lzU88Yx2pamGhfHCDjjIJgVIagbq8A
```

## Results

### Success

If you follow the instructions correctly, you will get a `200` status code without body message.

### Error

#### Old password is wrong

If the old password is incorrect, you will get a `ValidationError` and `400` status code with the following error message:

```json
{
	"name": "ValidationError",
	"message": "A validation error occurred",
	"action": "Change the data and try again",
	"statusCode": 400,
	"errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```

#### New password is weak

If the new password is weak, you will get a `InsecurePasswordError` and `400` status code with the following error message:

```json
{
	"name": "InsecurePasswordError",
	"message": "This password is not secure.",
	"action": "Try another password",
	"statusCode": 400,
	"errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```

#### The new passwords don't match

If the new password does not match, you will get a `PasswordsDoesNotMatchError` and `400` status code with the following error message:

```json
{
	"name": "PasswordsDoesNotMatchError",
	"message": "Passwords does not match",
	"action": "Re-write the passwords and try again",
	"statusCode": 400,
	"errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```