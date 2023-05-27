# Change user password

If you want to change the user password, you need to do a `PUT` request to `https://your-domain/v1/user/security` with the `Authorization` header and the old password and new password in the body like this:

Example Authorization header:

Authorization: Bearer `token` (the token are in the cookies)

Example body:

```json
{
  "oldPassword": "!Test43210",
  "newPassword": "!Test43221",
  "confirmNewPassword": "!Test4321"
}
```

## Results

### Success

If you follow the instructions correctly, you will receive a `200 OK` status code without body message.

### Error

#### Old password is wrong

If the old password is incorrect, you will receive a `ValidationError` error and `400 Bad Request` status code with the following error message:

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

If the new password is weak, you will get a `InsecurePasswordError` error and `400 Bad Request` status code with the following error message:

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

If the new password does not match, you will get a `PasswordsDoesNotMatchError` and `400 Bad Request` status code with the following error message:

```json
{
  "name": "PasswordsDoesNotMatchError",
  "message": "Passwords does not match",
  "action": "Re-write the passwords and try again",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
