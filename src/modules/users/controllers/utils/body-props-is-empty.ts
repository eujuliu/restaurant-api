import validator from 'validator';
import { ChangePasswordBodyProps } from '../change-password/change-password-controller';
import { CreateUserBodyProps } from '../create-user/create-user-controller';
import { GetUserBodyProps } from '../get-user/get-user-controller';

export function bodyPropsIsEmpty(
  props: CreateUserBodyProps | GetUserBodyProps | ChangePasswordBodyProps
): boolean {
  for (const value of Object.values(props)) {
    if (validator.isEmpty(value)) {
      return true;
    }
  }

  return false;
}
