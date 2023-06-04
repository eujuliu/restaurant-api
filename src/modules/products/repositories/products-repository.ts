import { Product } from '../domain/product';

export interface IProductsRepository {
  save(product: Product): Promise<void>;
  exists(name: string): Promise<boolean>;
  index(
    onlyAvailable: boolean,
    limit?: number,
    offset?: number
  ): Promise<Omit<Product, 'createdBy'>[]>;
}
