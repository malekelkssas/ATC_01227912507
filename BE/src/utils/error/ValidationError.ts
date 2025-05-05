import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  public readonly errors: Record<string, string>;

  constructor(message: string, errors: Record<string, string>) {
    super(message, 400);
    this.errors = errors;
  }
}