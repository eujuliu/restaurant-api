import { Either, left, right } from 'core/logic/either';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { InsecurePasswordError } from './errors';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password {
  constructor(private readonly props: PasswordProps) {
    this.props = props;
  }

  get value(): string {
    return this.props.value;
  }

  static create(props: PasswordProps): Either<InsecurePasswordError, Password> {
    if (props.hashed) {
      return right(new Password({ value: props.value, hashed: props.hashed }));
    }

    if (
      !validator.isStrongPassword(props.value, {
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return left(new InsecurePasswordError({}));
    }

    return right(new Password({ value: props.value, hashed: false }));
  }

  async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      });
    });
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

  isAlreadyHashed(): boolean {
    return this.props.hashed as boolean;
  }

  getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }
}
