import { IProductsRepository } from '../products-repository';
import { Product } from 'modules/products/domain/product';

export class InMemoryProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async exists(name: string): Promise<boolean> {
    const product = this.products.find((product) => product.name === name);

    return !!product;
  }

  async index(
    onlyAvailable: boolean,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<Product[]> {
    const products = this.products.filter((product) =>
      onlyAvailable ? product.available : product
    );

    return products;
  }
}
