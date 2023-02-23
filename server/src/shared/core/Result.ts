export class Result<T> {
  public isSuccess: boolean;
  public isFailed: boolean;

  private _value: T;
  private _error: unknown;

  public constructor(success: boolean, error?: unknown, value?: T) {
    this.isSuccess = success;
    this.isFailed = !success;
    this._error = error as unknown;
    this._value = value as T;

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isFailed)
      throw new Error(
        "Can't get the value of an error result. use `getError` instead."
      );
    return this._value;
  }

  public getError(): unknown {
    return this._error;
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: unknown): Result<U> {
    return new Result<U>(false, error as unknown);
  }
}
