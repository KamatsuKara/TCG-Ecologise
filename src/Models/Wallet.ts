import { User } from "./User";
import { Currency } from "./Currency";

export class Wallet {
  private _amount: number;
  private _user: User;
  private _currency: Currency;

  constructor(amount: number = 0, user: User = new User(), currency: Currency = new Currency()) {
    this._amount = amount;
    this._user = user;
    this._currency = currency;
  }

  // Amount
  get amount(): number {
    return this._amount;
  }
  set amount(amount: number) {
    this._amount = amount;
  }

  // User
  get user(): User {
    return this._user;
  }
  set user(user: User) {
    this._user = user;
  }

  // Currency
  get currency(): Currency {
    return this._currency;
  }
  set currency(currency: Currency) {
    this._currency = currency;
  }
}