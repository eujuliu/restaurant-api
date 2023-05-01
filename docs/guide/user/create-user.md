# Create new user

If you want to create a new user, you need to do a `POST` request to `https://your-domain/v1/users` and pass the following data in the body However, you need to follow some requirements for creating a new user.

Requirements for the password:

- Minimum 1 uppercase
- Minimum 1 lowercase
- Minimum length is 8
- Minimum 1 number
- Minimum 1 symbol

Example:

```json
{
  "firstName": "John",
  "lastName": "Due",
  "email": "john@due.com",
  "password": "!Test1234",
  "phone": "00000000000"
}
```

When you do the request, you can receive a good response or an error message.

## Results

### Success

If your data is correct, you should be able to create the new user and you get a `201` status code and the response:

```json
"message": "Welcome John Due, please login to access your account"
```

### Errors

Below you can see the default errors messages

#### Weak password

If you pass a weak password that don't follow the requirement, you will get a `InsecurePasswordError` and `400` status code:

Example response:

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
