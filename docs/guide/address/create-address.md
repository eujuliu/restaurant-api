# Create new address

For add a new address, you need to do a `POST`request to `https://your-domain/v1/addresses` with the `Authorization` header and the data.

Example Authorization header:

Authorization: Bearer `token` (the token are in the cookies)

Example data:

```json
{
  "name": "Home",
  "address": "20, Twentieth Street",
  "address2": null,
  "district": "Twentieth",
  "city": "São Paulo",
  "state": "SP",
  "postalCode": "10000-000"
}
```

## Results

### Success

If the address is valid, you will get a `201 Created` status code with the following response data:

```json
{
  "message": "Address '20, Twentieth Street' was created successfully"
}
```

### Errors

#### Address already registered

If the address is already registered, you will get a `AddressAlreadyRegisteredError` and a `400 Bad Request` status code with the following response error.

```json
{
  "name": "AddressAlreadyRegisteredError",
  "message": "This address is already registered",
  "action": "Try another address",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```

### Postal code is invalid

If the postal code is invalid, you will get a `PostalCodeInvalidError` and a `400 Bad Request` status code with the following response error.

```json
{
  "name": "PostalCodeInvalidError",
  "message": "This postal code is not valid.",
  "action": "Verify the data and try again",
  "statusCode": 400,
  "errorId": "f2ede202-a5b8-40fa-b014-c52c3cbe5b41"
}
```
