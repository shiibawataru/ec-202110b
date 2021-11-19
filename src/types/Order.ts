import { OrderItem } from "./OrderItem";
import { User } from "./User";

/**
 * 注文を表すクラスです
 *
 */
export class Order {
  constructor(
    // ID
    private _id: number,
    // ユーザーID
    private _userId: number,
    // 状態
    private _status: number,
    // 合計金額
    private _totalPrice: number,
    // 注文日
    private _orderDate: Date,
    // 宛先氏名
    private _distinationName: string,
    // 宛先Eメール
    private _distinationEmail: string,
    // 宛先郵便番号
    private _distinationZipcode: string,
    // 宛先住所
    private _distinationAddress: string,
    // 宛先電話番号
    private _distinationTel: string,
    // 配達日時
    private _deliveryTime: Date,
    // 支払い方法
    private _paymentMethod: number,
    // ユーザー
    private _user: Array<User>,
    // 注文商品リスト
    private _orderItemList: Array<OrderItem>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get userId(): number {
    return this._userId;
  }

  public set userId(userId: number) {
    this._userId = userId;
  }

  public get status(): number {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

  public get orderDate(): Date {
    return this._orderDate;
  }

  public set orderDate(orderDate: Date) {
    this._orderDate = orderDate;
  }

  public get distinationName(): string {
    return this._distinationName;
  }

  public set distinationName(distinationName: string) {
    this._distinationName = distinationName;
  }

  public get distinationEmail(): string {
    return this._distinationEmail;
  }

  public set distinationEmail(distinationEmail: string) {
    this._distinationEmail = distinationEmail;
  }

  public get distinationZipcode(): string {
    return this._distinationZipcode;
  }

  public set distinationZipcode(distinationZipcode: string) {
    this._distinationZipcode = distinationZipcode;
  }

  public get distinationAddress(): string {
    return this._distinationAddress;
  }

  public set distinationAddress(distinationAddress: string) {
    this._distinationAddress = distinationAddress;
  }

  public get distinationTel(): string {
    return this._distinationTel;
  }

  public set distinationTel(distinationTel: string) {
    this._distinationTel = distinationTel;
  }

  public get deliveryTime(): Date {
    return this._deliveryTime;
  }

  public set deliveryTime(deliveryTime: Date) {
    this._deliveryTime = deliveryTime;
  }

  public get paymentMethod(): number {
    return this._paymentMethod;
  }

  public set paymentMethod(paymentMethod: number) {
    this._paymentMethod = paymentMethod;
  }

  public get user(): Array<User> {
    return this._user;
  }

  public set user(user: Array<User>) {
    this._user = user;
  }

  public get orderItemList(): Array<OrderItem> {
    return this._orderItemList;
  }

  public set orderItemList(orderItemList: Array<OrderItem>) {
    this._orderItemList = orderItemList;
  }
}
