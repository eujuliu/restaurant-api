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

  async findProductsById(
    criteria: string[]
  ): Promise<Omit<Product, 'createdBy'>[]> {
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: criteria,
        },
      },
    });

    return products.map((product) => ({
      ...product,
      created_by: undefined,
      created_at: undefined,
      updated_at: undefined,
      createdAt: product.created_at,
      updatedAt: product.updated_at,
    }));
  }

  async index(
    onlyAvailable: boolean,
    limit?: number,
    offset?: number
  ): Promise<Omit<Product, 'createdBy'>[]> {
    const options: Prisma.ProductFindManyArgs = {
      take: Number(limit) || undefined,
      skip: Number(offset) || undefined,
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

  async delete(criteria: string[]): Promise<void> {
    await prisma.product.deleteMany({
      where: {
        id: {
          in: criteria,
        },
      },
    });
  }
}
