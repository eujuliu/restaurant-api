# Update address

For update an address you need to do a `POST` request to `https://your-domain/v1/address` and pass the following data:

```json
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
```

and you need to pass the `Authorization` header, like this:

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huQGR1ZS5jb20iLCJpZCI6ImRkYzBiNjAwLWE2YTMtNDAwMS04MzM5LWIwZGUxYmFjYjlhMCIsImlhdCI6MTUxNjIzOTAyMn0.m7gxXwgh_OUE2lzU88Yx2pamGhfHCDjjIJgVIagbq8A
```

## Results

### Success

If you send the correctly data, you will receive a `200` status code without response data.

### Errors

#### Wrong ID

If you send the wrong ID, you will receive a `ValidationError` and `400` status code with the following error message.

```json
{
  "name": "ValidationError",
  "message": "A validation error occurred",
  "action": "Change the data and try again",
  "statusCode": 400,
  "errorId": "9c0cebd3-653b-420a-b5be-652cb34c9889"
}
```
