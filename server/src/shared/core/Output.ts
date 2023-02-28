export type Output<Err, OK> = Failed<Err, OK> | Succeed<Err, OK>;

export class Failed<Err, OK> {
  readonly result: Err;

  constructor(result: Err) {
    this.result = result;
  }

  isFailed(): this is Failed<Err, OK> {
    return true;
  }

  isSuccess(): this is Succeed<Err, OK> {
    return false;
  }
}

export class Succeed<Err, OK> {
  readonly result: OK;

  constructor(result: OK) {
    this.result = result;
  }

  isFailed(): this is Failed<Err, OK> {
    return false;
  }

  isSuccess(): this is Succeed<Err, OK> {
    return true;
  }
}
