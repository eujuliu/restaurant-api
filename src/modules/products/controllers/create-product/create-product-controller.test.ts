import { app } from 'infra/http/app';
import request from 'supertest';

describe('POST /v1/products (controller)', () => {
  it('should create a new product', async () => {
    const token = (
      await request(app).post('/v1/user').send({
        email: 'janedoe@example.com',
        password: 'Password1!',
      })
    )
      .get('Set-Cookie')[0]
      .split('; ')[0]
      .split('=')[1];

    const response = await request(app)
      .post('/v1/products')
      .send({
        name: 'Pepperoni',
        description:
          'A popular pizza topped with tomato sauce, mozzarella cheese, and spicy pepperoni slices.',
        price: 11.99,
        discount: 10,
        images: ['https://example.com/pepperoni.jpg'],
        available: true,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
  });
});
