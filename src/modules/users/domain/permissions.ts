import { Either, left, right } from 'core/logic/either';
import { InvalidPermissionsError } from './errors';

export const availablePermissions = Object.freeze([
  'product:list::all',
  'product:list::available',
  'product:delete',
  'product:update',
  'product:add',

  'payment:list::all',
  'payment:list::available',
  'payment:refund',

  'order:list::all',
  'order:list::available',
  'order:update',

  'user:set',
]);

export class Permissions {
  private readonly permissions: string[];

  constructor(permissions: string[]) {
    this.permissions = permissions;
  }

  get value(): string[] {
    return this.permissions;
  }

  static create(
    permissions: string[]
  ): Either<InvalidPermissionsError, Permissions> {
    const invalidPermission = permissions.every((permission) =>
      availablePermissions.includes(permission)
    );

    if (!invalidPermission) {
      return left(new InvalidPermissionsError({}));
    }

    return right(new Permissions(permissions));
  }
}
