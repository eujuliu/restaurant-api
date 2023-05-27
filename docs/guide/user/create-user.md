# Create new user

If you want to create a new user, you need to do a `POST` request to `https://your-domain/v1/users` and pass the following data in the body.However, you need to follow some requirements for creating a new user.

Requirements for the password:

- Minimum 1 uppercase
- Minimum 1 lowercase
- Minimum length is 8
- Minimum 1 number
- Minimum 1 symbol

Example request body:

```json
{
  "firstName": "John",
  "lastName": "Due",
  "email": "john@due.com",
  "password": "!Test1234",
  "phone": "00000000000"
}
```

INFO: The first user that you have created have all the permissions:

- product:list::all - See all products
- product:list::available - See available products
- product:delete - Delete a product
- product:update - Update a product
- product:add - Add a product
- payment:list::all - See all payments
- payment:list::available - See available payments (your own payments)
- payment:refund - Refund a payment
- order:list::all - See all orders
- order:list::available - See available orders (your own orders)
- order:update - Update an order
- user:set - Set the user permissions in another user

All users created after, only have `product:list::available`, `payment:list::available`, `order:list::available` permissions, you need to another permission you need to set with the first user.

## Results

### Success

If your data is correct, you should be able to create the new user and you get a `201 Created` status code and the response:

```json
{
  "message": "Welcome John Due, please login to access your account"
}
```

### Errors

#### Weak password

If you pass a weak password that don't follow the requirement, you will get a `InsecurePasswordError` and `400 Bad Request` status code:

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

If you pass an email address that is already registered, you will get the `AccountAlreadyExistsError` with the following message and status code `400 Bad Request`:

Example response:

```json
{
  "name": "AccountAlreadyExistsError",
  "message": "Already exists a user registered with this email address",
  "action": "If is you, try logging",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
