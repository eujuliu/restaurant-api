import { app } from 'infra/http/app';
import request from 'supertest';
import { CreateProductBodyProps } from '../create-product/create-product-controller';
import { Product } from 'modules/products/domain/product';

describe('GET /v1/products (controller)', () => {
  let token: string;

  beforeAll(async () => {
    token = (
      await request(app).post('/v1/user').send({
        email: 'janedoe@example.com',
        password: 'Password1!',
      })
    )
      .get('Set-Cookie')[0]
      .split('; ')[0]
      .split('=')[1];

    const products: CreateProductBodyProps[] = [
      {
        name: 'Pizza',
        description: 'Delicious pizza with various toppings',
        price: 9.99,
        discount: 0,
        images: ['pizza1.jpg', 'pizza2.jpg'],
        available: true,
      },
      {
        name: 'Burger',
        description: 'Juicy beef burger with cheese and veggies',
        price: 6.99,
        discount: 0.5,
        images: ['burger1.jpg', 'burger2.jpg'],
        available: true,
      },
      {
        name: 'Salad',
        description: 'Fresh garden salad with mixed greens',
        price: 4.99,
        discount: 0,
        images: ['salad1.jpg', 'salad2.jpg'],
        available: true,
      },
      {
        name: 'Sushi',
        description: 'Assortment of sushi rolls and sashimi',
        price: 12.99,
        discount: 0.2,
        images: ['sushi1.jpg', 'sushi2.jpg'],
        available: true,
      },
    ];

    const requests: request.Test[] = [];

    products.forEach((product) => {
      requests.push(
        request(app)
          .post('/v1/products')
          .send(product)
          .set('Authorization', `Bearer ${token}`)
      );
    });

    await Promise.all(requests);
  });

  it('Should return a list of products', async () => {
    const response = await request(app)
      .get('/v1/products')
      .set('Authorization', `Bearer ${token}`);

    expect(
      (response.body as Product[]).every((item) => item.id && item.price)
    ).toBe(true);
  });
});
