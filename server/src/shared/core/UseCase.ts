import { Response, Failed, Succeed } from './Response';

export interface UseCase<Input, Output> {
  execute(input?: Input): Promise<Output> | Output;
}

export class UseCaseResult {
  public static fail = <Err, Success>(error: Err): Response<Err, Success> => {
    return new Failed<Err, Success>(error);
  };

  public static success = <Err, Success>(
    result: Success
  ): Response<Err, Success> => {
    return new Succeed<Err, Success>(result);
  };
}
