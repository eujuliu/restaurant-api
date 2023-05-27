# Delete an address

If you want to delete an address, you need to do a `DELETE` request to `https://your-domain/v1/address` with the `Authorization` header and the address ID.

Example Authorization header:

Authorization: Bearer `token` (the token are in the cookies)

Example data:

```json
{
  "id": "2112de33-7b56-4836-845c-14977c59d5ea"
}
```

## Results

### Success

If you pass the correctly data, you will receive a `202` status code without response data

### Errors

#### Address not found

If you pass an ID from an address that does not exist, you will receive the `400` status code with the following message error:

```json
{
  "name": "ValidationError",
  "message": "Not found any address with this id",
  "action": "Change the data and try again",
  "statusCode": 400,
  "errorId": "ddc0b600-a6a3-4001-8339-b0de1bacb9a0"
}
```
