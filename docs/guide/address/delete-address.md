# Delete an address

If you want to delete an address, you need to do a `DELETE` request to `https://your-domain/v1/address` and send the ID of the address

```json
{
	"id": "2112de33-7b56-4836-845c-14977c59d5ea"
}
```

and the `Authorization` header, like this

```
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJqb2huQGR1ZS5jb20iLCJpZCI6ImRkYzBiNjAwLWE2YTMtNDAwMS04MzM5LWIwZGUxYmFjYjlhMCIsImlhdCI6MTUxNjIzOTAyMn0.m7gxXwgh_OUE2lzU88Yx2pamGhfHCDjjIJgVIagbq8A
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