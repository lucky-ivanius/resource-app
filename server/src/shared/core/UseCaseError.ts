import { Result } from './Result';

interface UseCaseErrorProps {
  [key: string]: unknown;
}

export class NotFound extends Result<UseCaseErrorProps> {
  constructor(id: string, arg: string) {
    super(false, {
      message: `${arg} with id ${id} was not found`
    });
  }
}

export class BadRequest extends Result<UseCaseErrorProps> {
  constructor(messages: unknown) {
    super(false, {
      messages
    });
  }
}
