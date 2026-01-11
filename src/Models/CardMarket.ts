import { Card } from "./Card";
import { Currency } from "./Currency";

export class CardMarket {
  private _price: number;
  private _card: Card;
  private _currency: Currency;

  constructor(price: number = 0, card: Card = new Card(), currency: Currency = new Currency()) {
    this._price = price;
    this._card = card;
    this._currency = currency;
  }

  // Price
  get price(): number {
    return this._price;
  }
  set price(price: number) {
    this._price = price;
  }

  // Card
  get card(): Card {
    return this._card;
  }
  set card(card: Card) {
    this._card = card;
  }

  // Currency
  get currency(): Currency {
    return this._currency;
  }
  set currency(currency: Currency) {
    this._currency = currency;
  }
}