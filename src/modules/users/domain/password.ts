import { Either, left, right } from 'core/logic/either';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { InsecurePasswordError } from './errors';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password {
  private props: PasswordProps;
  constructor(props: PasswordProps) {
    this.props = props;
  }

  get value(): string {
    return this.props.value;
  }

  static create(props: PasswordProps): Either<InsecurePasswordError, Password> {
    if (
      !validator.isStrongPassword(props.value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
      })
    ) {
      return left(new InsecurePasswordError());
    }
    return right(
      new Password({ value: props.value, hashed: !!props.hashed === true })
    );
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed || false;
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }
}
