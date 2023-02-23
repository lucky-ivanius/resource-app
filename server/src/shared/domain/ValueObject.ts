import { shallowEqual } from 'shallow-equal-object';

interface ValueObjectProps {
  [index: string]: unknown;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  protected readonly _props: T;

  constructor(props: T) {
    this._props = Object.freeze(props);
  }

  get props(): T {
    return this._props;
  }

  public equals(valueObject: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) return false;

    if (valueObject.props === undefined) return false;

    return shallowEqual(this.props, valueObject.props);
  }
}
