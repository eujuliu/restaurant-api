export class UnexpectedError extends Error {
  constructor(err: any) {
    super(`An unexpected error occurred.`);
    this.name = 'UnexpectedError';
    this.message = err.message;
    console.error(err);
  }
}
