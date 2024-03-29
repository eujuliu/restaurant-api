import { prisma } from 'infra/prisma/client';
import { PersistenceUser } from 'modules/users/mappers/user-map';
import { IUsersRepository } from '../users-repository';

export class PrismaUsersRepository implements IUsersRepository {
  async save({
    id,
    firstName,
    lastName,
    email,
    password,
    emailIsVerified,
    phone,
    permissions,
    created_at,
    updated_at,
  }: PersistenceUser): Promise<void> {
    await prisma.user.create({
      data: {
        id,
        firstName,
        lastName,
        email,
        password,
        emailIsVerified,
        phone,
        permissions,
        created_at,
        updated_at,
      },
    });
  }

  async exists(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  }

  async findUserByEmail(email: string): Promise<PersistenceUser | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async count(): Promise<number> {
    const count = await prisma.user.count();

    return count;
  }

  async permissions(id: string): Promise<string[]> {
    const permissions = await prisma.user
      .findUnique({
        where: {
          id,
        },
        select: {
          permissions: true,
        },
      })
      .then((user) => {
        return user?.permissions as string[];
      });

    return permissions;
  }
}
