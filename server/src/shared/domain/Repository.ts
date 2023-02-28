export abstract class Repository<T> {
  protected readonly _model: T;

  constructor(model: T) {
    this._model = model;
  }
}
