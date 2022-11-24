import validator from 'validator';

export function bodyPropsIsEmpty<T>(props: T): boolean {
  for (const value of Object.values(props as object)) {
    if (validator.isEmpty(value)) {
      return true;
    }
  }

  return false;
}
