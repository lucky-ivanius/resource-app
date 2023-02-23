import { v4 as uuid } from 'uuid';

export class UniqueID {
  protected readonly _value: string;

  constructor(value?: string) {
    this._value = value ? value : uuid();
  }

  get value(): string {
    return this._value;
  }

  equals(uniqueId: UniqueID): boolean {
    if (uniqueId === null || uniqueId === undefined) return false;

    if (!(uniqueId instanceof this.constructor)) return false;

    return uniqueId.value === this._value;
  }
}
