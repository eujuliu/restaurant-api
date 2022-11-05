import { prisma } from 'infra/prisma/client';
import { IUsersRepository, UserProps } from '../users-repository';

export class PrismaUsersRepository implements IUsersRepository {
  async save({
    id,
    firstName,
    lastName,
    email,
    password,
    emailIsVerified,
    phone,
  }: UserProps): Promise<void> {
    await prisma.user.create({
      data: {
        id,
        firstName,
        lastName,
        email,
        password,
        emailIsVerified,
        phone,
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

  async findUserByEmail(email: string): Promise<UserProps | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
