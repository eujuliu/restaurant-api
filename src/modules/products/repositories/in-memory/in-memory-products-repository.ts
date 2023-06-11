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

  async findProductsById(
    criteria: string[]
  ): Promise<Omit<Product, 'createdBy'>[]> {
    const products = this.products
      .filter((product) => criteria.includes(product.id))
      .map((product) => ({ ...product, createdBy: undefined }));

    return products;
  }

  async index(
    onlyAvailable: boolean,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<Omit<Product, 'createdBy'>[]> {
    const products = this.products
      .filter((product) => (onlyAvailable ? product.available : product))
      .map((product) => ({
        ...product,
        createdBy: undefined,
      }));

    return products;
  }

  async delete(criteria: string[]): Promise<void> {
    this.products = this.products.filter(({ id }) => !criteria.includes(id));
  }
}
