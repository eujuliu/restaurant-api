import { DomainError } from 'core/domain/errors/domain-error';

export class EmailInvalidError extends Error implements DomainError {
  constructor(email: string) {
    super(`The email "${email}" is invalid`);
    this.name = 'EmailInvalidError';
  }
}

export class InsecurePasswordError extends Error implements DomainError {
  constructor() {
    super(`This password is not secure.`);
    this.name = 'InsecurePasswordError';
  }
}

export class AccountAlreadyExists extends Error implements DomainError {
  constructor(email: string) {
    super(`Already exists a user registered with email: "${email}"`);
    this.name = 'AccountAlreadyExists';
  }
}
