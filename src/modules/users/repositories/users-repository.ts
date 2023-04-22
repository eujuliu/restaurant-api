import { PersistenceUser } from '../mappers/user-map';
export interface IUsersRepository {
  save(user: PersistenceUser): Promise<void>;
  exists(email: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<PersistenceUser | null>;
  updatePassword(email: string, newPassword: string): Promise<void>;
  count(): Promise<number>;
}
