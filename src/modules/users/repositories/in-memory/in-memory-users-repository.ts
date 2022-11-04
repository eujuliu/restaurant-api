import { IUsersRepository, UserProps } from '../users-repository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: UserProps[] = [];
  async save(user: UserProps): Promise<void> {
    this.users.push(user);
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);

    return !!user;
  }

  async findUserByEmail(email: string): Promise<UserProps | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }
}
