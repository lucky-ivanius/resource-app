import { UniqueID } from './UniqueID';

export abstract class Entity<T> {
  protected readonly _id: UniqueID;
  protected readonly _props: T;

  get props(): T {
    return this._props;
  }

  constructor(props: T, id?: UniqueID) {
    this._id = id ? id : new UniqueID();
    this._props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) return false;

    if (this === object) return true;

    if (!(object instanceof Entity)) return false;

    return this._id.equals(object._id);
  }
}
