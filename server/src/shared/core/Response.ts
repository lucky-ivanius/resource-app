export type Response<Err, Success> =
  | Failed<Err, Success>
  | Succeed<Err, Success>;

export class Failed<Err, Success> {
  readonly result: Err;

  constructor(result: Err) {
    this.result = result;
  }

  isError(): this is Failed<Err, Success> {
    return true;
  }

  isSuccess(): this is Succeed<Err, Success> {
    return false;
  }
}

export class Succeed<Err, Success> {
  readonly result: Success;

  constructor(result: Success) {
    this.result = result;
  }

  isError(): this is Failed<Err, Success> {
    return false;
  }

  isSuccess(): this is Succeed<Err, Success> {
    return true;
  }
}
