# Create a new product

If you want to create a new product your user need to have the `product:add` permission (the first user created have all permissions), with the permission now, you will need to do a `POST` request to `https://your-domain/v1/products` and pass the `Authorization` header and the data:

Example Authorization header:

Authorization: Bearer `token` (the token are in the cookies)

Example data:

```json
{
  "name": "Margherita",
  "description": "A classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil leaves.",
  "price": 9.99,
  "discount": 0,
  "images": ["https://example.com/margherita.jpg"],
  "available": true
}
```

## Results

### Success

If you have successfully in create a new product, you will receive a `201 Created` status code and the following payload:

```json
{
  "message": "Product Margherita was created successfully"
}
```

### Errors

If you have some problem with product creation you will receive an error:

#### Permission error

If the logged user does not have permission to create a new product, you will receive a `PermissionsError` and a `401 Unauthorized` status code with the following payload:

```json
{
  "name": "PermissionsError",
  "message": "This user has no permissions to do this action",
  "action": "Try with another user",
  "statusCode": 401,
  "errorId": "621d8c6b-3e1a-473c-9f81-7bf16a5e154a"
}
```

#### Product already exists

If already exists a product with the name specified, you will receive a `ProductAlreadyExistsError` and a `400 Bad Request` status code with the following payload:

```json
{
  "name": "ProductAlreadyExistsError",
  "message": "This product already exists.",
  "action": "If is an another product try change the name.",
  "statusCode": 400,
  "errorId": "4a6ac359-105d-4e6f-8f2a-575725a5547b"
}
```
