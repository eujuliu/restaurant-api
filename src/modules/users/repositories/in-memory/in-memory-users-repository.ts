import { PersistenceUser } from 'modules/users/mappers/user-map';
import { IUsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: PersistenceUser[] = [];
  async save(user: PersistenceUser): Promise<void> {
    this.users.push(user);
  }

  async exists(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);

    return !!user;
  }

  async findUserByEmail(email: string): Promise<PersistenceUser | null> {
    const user = this.users.filter((user) => user.email === email)[0];

    return user || null;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    this.users.map((user) => {
      if (user.email === email) {
        return (user.password = newPassword);
      }
    });
  }
}
