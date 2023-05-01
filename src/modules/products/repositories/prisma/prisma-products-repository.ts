import { Product } from 'modules/products/domain/product';
import { IProductsRepository } from '../products-repository';
import { prisma } from 'infra/prisma/client';

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
}
