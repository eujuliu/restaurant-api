# Get user addresses

If you want to get all user addresses you need to do a `GET` request to `https://your-domain/v1/address` and you only need to send the `Authorization` header, example:

Authorization: Bearer `token` (the token are in the cookies)

## Results

### Success

If you pass the instructions correctly, the result will be the `200` status code and the following response data:

```json
[
  {
    "id": "2112de33-7b56-4836-845c-14977c59d5ea",
    "name": "Home",
    "address": "20, Twentieth Street",
    "address2": null,
    "district": "Twentieth",
    "city": "São Paulo",
    "state": "SP",
    "postalCode": "10000-000"
  }
]
```

### Errors

#### Invalid token

If the token is invalid, you will receive the following message error:

```json
{
  "name": "TokenError",
  "message": "Invalid token",
  "action": "If you are not authenticated, please authenticate",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
