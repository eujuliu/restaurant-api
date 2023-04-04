# Create new user

For create a new user, you need to do a `POST` request to `https://your-domain/v1/users` and pass the following data in the body:

```json
{
  "firstName": "John",
  "lastName": "Due",
  "email": "john@due.com",
  "password": "!Test1234",
  "phone": "00000000000"
}
```

is obviously that you need to pass your data, not the data in the example.

When you do the request, you can have a good result or an error message.

## Results

### Success

If your data is correct, you should be able to create the new user and you get a `201` status code, don't have a body message.

### Errors

Below you can see the default errors messages

#### Weak password

If you pass a weak password, you will get a `InsecurePasswordError`, you need to pass a password that follow the following pattern:

- minimum 1 uppercase
- minimum 1 lowercase
- minimum length is 8
- minimum 1 number
- minimum 1 symbol

Below is the `InsecurePasswordError` result, with `400` status code:

```json
{
  "name": "InsecurePasswordError",
  "message": "This password is not secure.",
  "action": "Try another password",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```

#### Email already registered

If you pass an email address that is already registered, you will get the `AccountAlreadyExistsError` with the following message and status code `400`:

```json
{
  "name": "AccountAlreadyExistsError",
  "message": "Already exists a user registered with this email address",
  "action": "If is you, try logging",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
