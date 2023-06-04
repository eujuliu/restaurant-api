import { Product } from 'modules/products/domain/product';
import { IProductsRepository } from '../products-repository';
import { prisma } from 'infra/prisma/client';
import { Prisma } from '@prisma/client';

export class PrismaProductsRepository implements IProductsRepository {
  async save({
    id,
    name,
    description,
    price,
    discount,
    images,
    createdAt,
    updatedAt,
    available,
    createdBy,
  }: Product): Promise<void> {
    await prisma.product.create({
      data: {
        id,
        name,
        description,
        price,
        discount,
        images,
        created_at: createdAt,
        updated_at: updatedAt,
        available,
        created_by: createdBy,
      },
    });
  }

  async exists(name: string): Promise<boolean> {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    return !!product;
  }

  async index(
    onlyAvailable: boolean,
    limit?: number,
    offset?: number
  ): Promise<Omit<Product, 'createdBy'>[]> {
    const options: Prisma.ProductFindManyArgs = {
      take: limit,
      skip: offset,
    };

    const optionsWithWhere: Prisma.ProductFindManyArgs = {
      ...options,
      where: {
        available: onlyAvailable,
      },
    };

    const products = await prisma.product.findMany(
      onlyAvailable ? optionsWithWhere : options
    );

    return products.map((product) => ({
      ...product,
      created_at: undefined,
      updated_at: undefined,
      created_by: undefined,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }));
  }
}
