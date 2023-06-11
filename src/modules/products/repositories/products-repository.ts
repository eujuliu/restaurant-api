import { Product } from '../domain/product';

export interface IProductsRepository {
  save(product: Product): Promise<void>;
  exists(name: string): Promise<boolean>;
  findProductsById(criteria: string[]): Promise<Omit<Product, 'createdBy'>[]>;
  index(
    onlyAvailable: boolean,
    limit?: number,
    offset?: number
  ): Promise<Omit<Product, 'createdBy'>[]>;
  delete(criteria: string[]): Promise<void>;
}
