export class Currency {
  private _id: number;
  private _name: string;
  private _ratio: number;

  constructor(id: number = 0, name: string = "", ratio: number = 0) {
    this._id = id;
    this._name = name || '';
    this._ratio = ratio || 1;
  }

  // Id
  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  // Name
  public get name(): string {
    return this._name;
  }
  public set name(name: string) {
    this._name = name;
  }

  // Ratio
  public get ratio(): number {
    return this._ratio;
  }
  public set ratio(ratio: number) {
    this._ratio = ratio;
  }
}