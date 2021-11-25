import { Item } from "./Item";
import { OrderTopping } from "./OrderTopping";

/**
 * 注文商品を表す部品用クラス.
 */
export class OrderItem {
  constructor(
    // ID
    public _id: number,
    // 商品ID
    public _itemId: number,
    // 注文ID
    public _orderId: number,
    // 数量
    public _quantity: number,
    // サイズ
    public _size: string,
    // 商品
    public _item: Item,
    // 注文トッピングリスト
    public _orderToppingList: Array<OrderTopping>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get itemId(): number {
    return this._itemId;
  }

  public set itemId(itemId: number) {
    this._itemId = itemId;
  }

  public get orderId(): number {
    return this._orderId;
  }

  public set orderId(orderId: number) {
    this._orderId = orderId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  public get size(): string {
    return this._size;
  }

  public set size(size: string) {
    this._size = size;
  }

  public get item(): Item {
    return this._item;
  }

  public set item(item: Item) {
    this._item = item;
  }

  public get orderToppingList(): Array<OrderTopping> {
    return this._orderToppingList;
  }

  public set orderToppingList(orderToppingList: Array<OrderTopping>) {
    this._orderToppingList = orderToppingList;
  }

  public get totalPrice(): number {
    console.log("呼ばれた！！！");

    let price = 0;
    const toppingPriceM = Number(this.orderToppingList[0].topping.priceM);
    const toppingPriceL = Number(this.orderToppingList[0].topping.priceL);
    if (this.size === "M") {
      price = Number(
        this.item.priceM * this.quantity +
          toppingPriceM * this.orderToppingList.length
      );
    } else if (this.size === "L") {
      price = Number(
        this.item.priceL * this.quantity +
          toppingPriceL * this.orderToppingList.length
      );
    }
    console.log("toppingPriceM" + toppingPriceM);
    console.log("length" + this.orderToppingList.length);

    return price;
  }
}
