export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  emailIsVerified: boolean;
}

export interface IUsersRepository {
  save(user: UserProps): Promise<void>;
  exists(email: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<UserProps | null>;
  updatePassword(email: string, newPassword: string): Promise<void>;
}
