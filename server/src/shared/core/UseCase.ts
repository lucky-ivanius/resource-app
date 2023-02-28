import { Output, Failed, Succeed } from './Output';

export interface UseCase<In, Out> {
  execute(input?: In): Promise<Out> | Out;
}

export class UseCaseResult {
  public static fail = <Err, Success>(error: Err): Output<Err, Success> => {
    return new Failed<Err, Success>(error);
  };

  public static success = <Err, Success>(
    result: Success
  ): Output<Err, Success> => {
    return new Succeed<Err, Success>(result);
  };
}
