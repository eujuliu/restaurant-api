import { app } from 'infra/http/app';
import { Product } from 'modules/products/domain/product';
import request from 'supertest';

describe('DELETE /v1/product (controller)', () => {
  it('Should be able to delete a product', async () => {
    const token = (
      await request(app).post('/v1/user').send({
        email: 'janedoe@example.com',
        password: 'Password1!',
      })
    )
      .get('Set-Cookie')[0]
      .split('; ')[0]
      .split('=')[1];

    await request(app)
      .post('/v1/products')
      .send({
        name: 'Margherita',
        description:
          'A classic Italian pizza with fresh tomato sauce, mozzarella cheese, and basil leaves on a thin-crust base.',
        price: 10.99,
        discount: 0,
        images: ['https://example.com/margherita.jpg'],
        available: false,
      })
      .set('Authorization', `Bearer ${token}`);

    const getResponse = await request(app)
      .get('/v1/products')
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .delete('/v1/product')
      .send({
        criteria: (getResponse.body as Product[]).map((product) => product.id),
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
  });
});
