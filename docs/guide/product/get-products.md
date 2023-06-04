# Get product list

If you want to get a list of products, first you need to be logged into your account (you need to pass the Authorization Header). Then, you need to make a `GET` request to `https://your-domain/v1/products`. Additionally, you need to have one of the following permissions:

1.  `product:list::all`: You have permission to list all products.
2.  `product:list::available`: You have permission to list only available products that have the `available: true` in product.

## Results

### Success

If all the requirements above are met, then you will be able to receive a `200` status code and the list of products, the list will have items like this:

```json
[
  {
    "id": "995bf096-c636-4296-81ce-015f10a771b7",
    "name": "Pepperoni",
    "price": 11.99,
    "discount": 10,
    "description": "A popular pizza topped with tomato sauce, mozzarella cheese, and spicy pepperoni slices.",
    "created_at": "2023-05-07T00:16:30.011Z",
    "updated_at": "2023-05-07T00:16:30.011Z",
    "images": ["https://example.com/pepperoni.jpg"],
    "available": true
  }
]
```

### Errors

If you don't have one of the permissions listed above, you will receive a `UnauthorizedError` and `401` status code with this message:

```json
{
  "message": "Access denied. You are not authorized to perform this action.",
  "action": "View confidential data",
  "errorId": "621d8c6b-3e1a-473c-9f81-7bf16a5e154a",
  "statusCode": 401
}
```
