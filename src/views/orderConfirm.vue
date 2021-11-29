<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文内容確認</h1>
      <!-- table -->
      <div class="row">
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cartListItem of cartList" :key="cartListItem.id">
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="cartListItem.item.imagePath" />
                </div>
                <span>{{ cartListItem.item.name }}</span>
              </td>
              <td v-if="cartListItem.size === 'M'">
                <span class="price">&nbsp;{{ cartListItem.size }}</span
                >&nbsp;&nbsp;{{ cartListItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ cartListItem.quantity }}個
              </td>
              <td v-if="cartListItem.size === 'L'">
                <span class="price">&nbsp;{{ cartListItem.size }}</span
                >&nbsp;&nbsp;{{ cartListItem.item.priceL.toLocaleString() }}円
                &nbsp;&nbsp;{{ cartListItem.quantity }}個
              </td>
              <td>
                <ul
                  v-for="orderTopping of cartListItem.orderToppingList"
                  :key="orderTopping.id"
                >
                  <li v-if="cartListItem.size === 'M'">
                    {{ orderTopping.topping.name }}&emsp;{{
                      orderTopping.topping.priceM
                    }}円
                  </li>
                  <li v-if="cartListItem.size === 'L'">
                    {{ orderTopping.topping.name }} &emsp;
                    {{ orderTopping.topping.priceL }}円
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  {{ cartListItem.totalPrice.toLocaleString() }}円
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <div>消費税：{{ tax }}円</div>
        <div>
          ご注文金額合計：{{ taxIncludePrice.toLocaleString() }}円 (税込)
        </div>
      </div>

      <h2 class="page-title">お届け先情報</h2>
      <div class="order-confirm-delivery-info">
        <div class="input-button">
          <button class="btn" type="button" @click="inputUserInfo">
            <span>登録情報を自動入力する</span>
          </button>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 名前 -->
            <div class="error">{{ errorOfName }}</div>
            <input id="name" type="text" v-model="name" />
            <label for="name" v-show="!errorFlug">お名前</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- メールアドレス -->
            <div class="error">{{ errorOfMailAddess }}</div>
            <input id="email" type="email" v-model="mailAddress" />
            <label for="email" v-show="!errorFlug">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 郵便番号 -->
            <div class="error">{{ errorOfZipCode }}</div>
            <input id="zipcode" type="text" maxlength="8" v-model="zipCode" />
            <label for="zipcode" v-show="!errorFlug">郵便番号</label>
            <button class="btn" type="button" v-on:click="getAddress">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 住所 -->
            <div class="error">{{ errorOfAddress }}</div>
            <input id="address" type="text" v-model="address" />
            <label
              for="address"
              v-if="errorFlug === false && addressFlug === true"
              >住所</label
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 電話番号 -->
            <div class="error">{{ errorOfTelephone }}</div>
            <input id="tel" type="tel" v-model="telephone" />
            <label for="tel" v-show="!errorFlug">電話番号</label>
          </div>
        </div>
        <div class="row order-confirm-delivery-datetime">
          <div class="input-field">
            <!-- 配達日 -->
            <div class="error">{{ errorOfDeliveryDate }}</div>
            <input id="deliveryDate" type="date" v-model="deliveryDate" />
            <label for="address" v-show="!errorFlug">配達日時</label>
          </div>
          <!-- 配達時間 -->
          <div class="error">{{ errorOfDelivarytime }}</div>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="10"
              checked="checked"
              v-model="delivaryTime"
            />
            <span>10時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="11"
              v-model="delivaryTime"
            />
            <span>11時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="12"
              v-model="delivaryTime"
            />
            <span>12時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="13"
              v-model="delivaryTime"
            />
            <span>13時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="14"
              v-model="delivaryTime"
            />
            <span>14時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="15"
              v-model="delivaryTime"
            />
            <span>15時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="16"
              v-model="delivaryTime"
            />
            <span>16時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="17"
              v-model="delivaryTime"
            />
            <span>17時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="18"
              v-model="delivaryTime"
            />
            <span>18時</span>
          </label>
        </div>
      </div>

      <h2 class="page-title">お支払い方法</h2>
      <div class="row order-confirm-payment-method">
        <span>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="1"
              checked="checked"
              v-model="paymentMethod"
              v-on:change="showCredit"
            />
            <span>代金引換</span>
          </label>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="2"
              v-model="paymentMethod"
              v-on:change="showCredit"
            />
            <span>クレジットカード</span>
          </label>
        </span>
      </div>
      <!-- クレジットで支払う場合表示 -->
      <div class="credit" v-show="creditFlug">
        <div class="error">{{ creditNumberError }}</div>
        <div class="error">{{ creditMonthError }}</div>
        <div class="error">{{ creditYearError }}</div>
        <div class="error">{{ creditNameError }}</div>
        <div class="error">{{ creditsecurityCodeError }}</div>
        <form>
          <table>
            <tr>
              <td><label for="creditNumber">クレジットカード番号：</label></td>
              <td>
                <input
                  type="text"
                  name="creditNumber"
                  id="creditNumber"
                  minlength="14"
                  maxlength="16"
                  v-model="creditNumber"
                />
              </td>
            </tr>
            <tr>
              <td><label for="creditMonth">有効期限：</label></td>
              <td>
                <span class="creditSlect">
                  <label for="creditMonth">月</label>
                  <select
                    name="creditMonth"
                    id="creditMonth"
                    class="browser-default"
                    v-model="month"
                  >
                    <option
                      :value="month"
                      v-for="month of creditMonth"
                      :key="month"
                    >
                      {{ month }}
                    </option>
                  </select>
                  <label for="creditYear">年</label>
                  <select
                    name="creditYear"
                    id="creditYear"
                    class="browser-default"
                    v-model="year"
                  >
                    <option
                      :value="year"
                      v-for="year of creditYear"
                      :key="year"
                    >
                      {{ year }}
                    </option>
                  </select>
                </span>
              </td>
            </tr>
            <tr>
              <td><label for="creditName">カード名義人：</label></td>

              <td>
                <input
                  type="text"
                  name="creditName"
                  id="creditName"
                  v-model="creditName"
                  maxlength="50"
                  pattern="^[A-Z]*$"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label for="creditSecurityCode">セキュリティコード：</label>
              </td>
              <td>
                <input
                  type="text"
                  name="creditSecurityCode"
                  id="creditSecurityCode"
                  v-model="creditSecurityCode"
                  minlength="3"
                  maxlength="4"
                />
              </td>
            </tr>
          </table>
        </form>
      </div>
      <!-- クレジットカードコーナー終わり -->
      <div class="error orderError">{{ this.orderError }}</div>
      <div class="row order-confirm-btn">
        <button class="btn" type="button" v-on:click="order">
          <span>この内容で注文する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";
import { format, addHours, addYears } from "date-fns";
import axios from "axios";
import { User } from "@/types/User";
@Component
/**
 * 注文確認画面.
 */
export default class OrderConfirm extends Vue {
  //注文のエラー
  private orderError = "";
  //名前
  private name = "";
  //名前のエラー
  private errorOfName = "";
  //メールアドレス
  private mailAddress = "";
  //メールアドレスエラー
  private errorOfMailAddess = "";
  //郵便番号
  private zipCode = "";
  //郵便番号エラー
  private errorOfZipCode = "";
  //住所
  private address = "";
  //住所エラー
  private errorOfAddress = "";
  //住所検索したらラベルを消す
  private addressFlug = true;
  //電話番号
  private telephone = "";
  //電話番号エラー
  private errorOfTelephone = "";
  //配達日
  private deliveryDate = "";
  //配達日エラー
  private errorOfDeliveryDate = "";
  //配達時間
  private delivaryTime = "";
  //配達時間エラー
  private errorOfDelivarytime = "";
  //支払い方法
  private paymentMethod = "1";
  //カートの中身
  private cartList = new Array<OrderItem>();
  //エラーの際、ラベルを非表示に
  private errorFlug = false;
  //クレジット払いの際は表示
  private creditFlug = false;
  //クレジットカード有効期限(月の選択肢)
  private creditMonth = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  //クレジットカード番号
  private creditNumber = "";
  //クレジットカード有効期限(月)
  private month = "";
  //クレジットカード有効期限(年)
  private year = "";
  //クレジットカード名義人
  private creditName = "";
  //クレジットカードセキュリティコード
  private creditSecurityCode = "";
  //エラーチェック
  private creditNumberError = "";
  private creditMonthError = "";
  private creditYearError = "";
  private creditNameError = "";
  private creditsecurityCodeError = "";
  // 登録しているユーザー情報
  private userInfo = new User(0, "", "", "", "", "", "");

  /**
   * カートの中身をindexから取得.
   */
  created(): void {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }

    this.cartList = this["$store"].getters.getCartList;

    this.getUserInfo();
  }

  /**
   * 郵便番号から住所を取得.
   */
  async getAddress(): Promise<void> {
    //初期値リセット(住所、住所エラー)
    this.address = "";
    this.errorOfAddress = "";
    this.addressFlug = true;
    //郵便番号から住所を取得APIに郵便番号を送る
    try {
      // const axios = require("axios");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const axiosJsonpAdapter = require("axios-jsonp");

      const response = await axios.get("https://zipcoda.net/api", {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: this.zipCode,
        },
      });
      //成功したら住所に取得したデータを代入
      if (response.data.length === 1) {
        this.addressFlug = false;
        this.address =
          response.data.items[0].state_name + response.data.items[0].address;
        //失敗したらエラーを出す
      } else {
        this.errorOfAddress = "住所が見つかりません";
        this.addressFlug = false;
      }
    } catch (e) {
      this.errorOfAddress = "住所が見つかりません";
      this.addressFlug = false;
    }
  }

  /**
   * 注文したい内容(indexのカートの配列)をAPIに送る.
   */
  async order(): Promise<void> {
    this.errorFlug = false;
    //エラーコーナー
    this.errorOfName = "";
    this.errorOfMailAddess = "";
    this.errorOfZipCode = "";
    this.errorOfAddress = "";
    this.errorOfTelephone = "";
    this.errorOfDeliveryDate = "";
    this.errorOfDelivarytime = "";

    if (this.name === "") {
      this.errorOfName = "名前を入力して下さい";
    }
    if (this.mailAddress === "") {
      this.errorOfMailAddess = "メールアドレスを入力して下さい";
    }
    if (!this.mailAddress.includes("@")) {
      this.errorOfMailAddess = "メールアドレスの形式が不正です";
    }
    if (this.zipCode === "") {
      this.errorOfZipCode = "郵便番号を入力して下さい";
    }
    if (!this.zipCode.includes("-")) {
      this.errorOfZipCode = "郵便番号はXXX-XXXXの形式で入力してください";
    }
    if (this.address === "") {
      this.errorOfAddress = "住所を入力して下さい";
    }
    if (this.telephone === "") {
      this.errorOfTelephone = "電話番号を入力して下さい";
    }
    if (!this.telephone.includes("-")) {
      this.errorOfTelephone =
        "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
    }
    if (this.deliveryDate === "") {
      this.errorOfDeliveryDate = "配達日を入力して下さい";
    }

    const now = new Date();
    const nowAdd3Hours = addHours(now, 3);

    //配達日時をnewDateの形にする
    const MOON_ADJUSTMENT = 1;
    const year = Number(this.deliveryDate.substr(0, 4));
    const month = Number(this.deliveryDate.substr(5, 2));
    const day = Number(this.deliveryDate.substr(8, 2));
    const ymdh = new Date(
      year,
      month - MOON_ADJUSTMENT,
      day,
      Number(this.delivaryTime)
    );
    const delivery = format(
      new Date(year, month - MOON_ADJUSTMENT, day, Number(this.delivaryTime)),
      "yyyy/MM/dd HH:mm:ss"
    );

    if (ymdh <= nowAdd3Hours) {
      this.errorOfDelivarytime = "今から3時間後の日時をご入力ください";
    }
    if (this.delivaryTime === "") {
      this.errorOfDelivarytime = "配達時間を入力して下さい";
    }

    //エラーチェック
    this.creditNumberError = "";
    this.creditMonthError = "";
    this.creditYearError = "";
    this.creditNameError = "";
    this.creditsecurityCodeError = "";

    if (this.creditFlug) {
      //名義エラー
      if (this.creditName.match(/[^A-Z]+/)) {
        this.creditNameError = "半角英字(大文字)で入力して下さい";
      }

      //クレジット番号エラー
      if (
        (this.creditNumber.length != 14 && this.creditNumber.length != 16) ||
        this.creditNumber.match(/[^0-9]+/)
      ) {
        this.creditNumberError =
          "クレジットカード番号は14桁か16桁の数字で入力して下さい";
      }

      //セキュリティコードエラー
      if (
        (this.creditSecurityCode.length != 3 &&
          this.creditSecurityCode.length != 4) ||
        this.creditSecurityCode.match(/[^0-9]+/)
      ) {
        this.creditsecurityCodeError =
          "セキュリティコードは3桁か4桁の数字で入力して下さい";
      }

      //有効期限エラー
      const nowMonth = now.getMonth();
      const nowYear = now.getFullYear();

      if (Number(nowYear) >= Number(this.year)) {
        if (Number(nowMonth + MOON_ADJUSTMENT) > Number(this.month)) {
          this.creditYearError = "有効期限が切れています";
        }
      }

      //空白エラー
      if (this.creditNumber === "") {
        this.creditNumberError = "クレジットカード番号を入力して下さい";
      }
      if (this.month === "") {
        this.creditMonthError = "有効期限月を入力して下さい";
      }
      if (this.year === "") {
        this.creditYearError = "有効期限年を入力して下さい";
      }
      if (this.creditName === "") {
        this.creditNameError = "名前を入力して下さい";
      }
      if (this.creditSecurityCode === "") {
        this.creditsecurityCodeError = "セキュリティコードを入力して下さい";
      }
    }

    if (
      this.errorOfName != "" ||
      this.errorOfMailAddess != "" ||
      this.errorOfZipCode != "" ||
      this.errorOfAddress != "" ||
      this.errorOfTelephone != "" ||
      this.errorOfDeliveryDate != "" ||
      this.errorOfDelivarytime != "" ||
      this.creditNumberError != "" ||
      this.creditMonthError != "" ||
      this.creditYearError != "" ||
      this.creditNameError != "" ||
      this.creditsecurityCodeError != ""
    ) {
      this.errorFlug = true;
      return;
    }

    //注文商品情報の配列を作成
    const orderItems = [];
    const toppings = [];
    for (const cartListItem of this.cartList) {
      for (const topping of cartListItem.orderToppingList) {
        toppings.push({ toppingId: String(topping.toppingId) });
      }
      orderItems.push({
        itemId: cartListItem.itemId,
        quantity: cartListItem.quantity,
        size: cartListItem.size,
        orderToppingFormList: toppings,
      });
    }

    //APIにクレジットカード情報を送る
    if (this.creditFlug) {
      const response = await axios.post(
        "http://153.127.48.168:8080/sample-credit-card-web-api/credit-card/payment ",
        {
          user_id: this["$store"].getters.getUserId,
          order_number: 12345678901234, //注文番号
          amount: Number(this.taxIncludePrice), //決済金額
          card_number: Number(this.creditNumber), //クレジットカード番号
          card_exp_year: Number(this.year), //有効期限年
          card_exp_month: Number(this.month), //有効期限月
          card_name: this.creditName, //名義
          card_cvv: Number(this.creditSecurityCode), //数字3桁or4桁のセキュリティコード
        }
      );
      if (response.data.status === "error") {
        this.creditsecurityCodeError =
          "セキュリティコードエラーが発生しました。";
      }
    }
    if (this.creditsecurityCodeError != "") {
      return;
    }

    //APIに配達情報を送る
    try {
      await axios.post("http://153.127.48.168:8080/ecsite-api/order", {
        userId: String(this["$store"].getters.getUserId),
        status: String(this.paymentMethod),
        totalPrice: String(Math.floor(this.taxIncludePrice)),
        destinationName: this.name,
        destinationEmail: this.mailAddress,
        destinationZipcode: this.zipCode,
        destinationAddress: this.address,
        destinationTel: this.telephone,
        deliveryTime: delivery,
        paymentMethod: String(this.paymentMethod),
        orderItemFormList: orderItems,
      });
    } catch (e) {
      this.orderError = "エラーが発生しました";
    }
    //成功したら注文完了ページに飛ぶ
    if (this.orderError === "") {
      this["$store"].commit("deleteCartList");
      this.$router.push("/orderFinished");
    }
  }

  /**
   * クレジットカード払いを選択→クレジットコーナーを表示.
   */
  showCredit(): void {
    if (this.paymentMethod === "2") {
      this.creditFlug = true;
    } else {
      this.creditFlug = false;
    }
  }

  /**
   * 合計金額の税を返す.
   * @return 税金
   */
  get tax(): string {
    let price = 0;
    for (const cartListItem of this.cartList) {
      price += cartListItem.totalPrice;
    }
    return (price * 0.1).toLocaleString();
  }

  /**
   * 税込み金額を返す.
   * @return 税込み金額
   */
  get taxIncludePrice(): number {
    let price = 0;
    for (const cartListItem of this.cartList) {
      price += cartListItem.totalPrice;
    }
    return price * 1.1;
  }

  /**
   * クレジットカード有効期限の年選択肢配列を返す.
   * @return クレジットカード有効期限年の選択肢配列
   */
  get creditYear(): Array<string> {
    const array = new Array<string>();
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowAdd16Years = addYears(now, 17).getFullYear();

    for (let i = Number(nowYear); i <= Number(nowAdd16Years); i++) {
      let stringNum = String(i);
      array.push(stringNum);
    }
    return array;
  }
  /**
   * ユーザー情報を取得する.
   */
  getUserInfo(): void {
    this.userInfo = this["$store"].getters.getUserInfo;
  }
  /**
   * ボタンが押されたらユーザー情報を自動入力する.
   */
  inputUserInfo(): void {
    this.name = this.userInfo.name;
    (this.mailAddress = this.userInfo.email),
      (this.zipCode = this.userInfo.zipcode),
      (this.address = this.userInfo.address),
      (this.telephone = this.userInfo.telephone);
    this.errorFlug = true;
  }
  // 終わり
}
</script>
<style scoped>
.error {
  color: red;
  text-align: left;
}
.orderError {
  text-align: center;
  font-size: 20px;
}
.creditSlect {
  display: flex;
}

.credit {
  width: 1000px;
  padding: 30px;
}
</style>
