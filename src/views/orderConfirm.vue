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
        <div class="row">
          <div class="input-field">
            <!-- 名前 -->
            <div class="error">{{ errorOfName }}</div>
            <input id="name" type="text" v-model="name" />
            <label for="name">お名前</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- メールアドレス -->
            <div class="error">{{ errorOfMailAddess }}</div>
            <input id="email" type="email" v-model="mailAddress" />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 郵便番号 -->
            <div class="error">{{ errorOfZipCode }}</div>
            <input id="zipcode" type="text" maxlength="8" v-model="zipCode" />
            <label for="zipcode">郵便番号</label>
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
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 電話番号 -->
            <div class="error">{{ errorOfTelephone }}</div>
            <input id="tel" type="tel" v-model="telephone" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row order-confirm-delivery-datetime">
          <div class="input-field">
            <!-- 配達日 -->
            <div class="error">{{ errorOfDeliveryDate }}</div>
            <input id="deliveryDate" type="date" v-model="deliveryDate" />
            <label for="address">配達日時</label>
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
            />
            <span>代金引換</span>
          </label>
          <label class="order-confirm-payment-method-radio">
            <input
              name="paymentMethod"
              type="radio"
              value="2"
              v-model="paymentMethod"
            />
            <span>クレジットカード</span>
          </label>
        </span>
      </div>
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
import { OrderTopping } from "@/types/OrderTopping";
import { Topping } from "@/types/Topping";
import { Item } from "@/types/Item";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { format, addHours } from "date-fns";

@Component
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
  private paymentMethod = "";
  //カートの中身
  private cartList = new Array<OrderItem>();
  // private cartList = new Array<OrderItem>(
  //   new OrderItem(
  //     1,
  //     101,
  //     3,
  //     2,
  //     "L",
  //     new Item(
  //       101,
  //       "toy",
  //       "ビニールプール",
  //       "説明",
  //       1490,
  //       2570,
  //       "/img_toy/1.jpg",
  //       true,
  //       [
  //         new Topping(106, "toy", "単二電池４本", 200, 300),
  //         new Topping(105, "toy", "単一電池４本", 200, 300),
  //         new Topping(104, "toy", "片付け用きんちゃく袋", 200, 300),
  //       ]
  //     ),
  //     [
  //       new OrderTopping(
  //         10,
  //         106,
  //         101,
  //         new Topping(106, "toy", "単二電池４本", 200, 300)
  //       ),
  //       new OrderTopping(
  //         20,
  //         105,
  //         101,
  //         new Topping(105, "toy", "単一電池４本", 200, 300)
  //       ),
  //       new OrderTopping(
  //         30,
  //         104,
  //         101,
  //         new Topping(104, "toy", "片付け用きんちゃく袋", 200, 300)
  //       ),
  //     ]
  //   ),
  //   new OrderItem(
  //     2,
  //     101,
  //     3,
  //     4,
  //     "M",
  //     new Item(
  //       101,
  //       "toy",
  //       "ビニールプール",
  //       "説明",
  //       1490,
  //       2570,
  //       "/img_toy/1.jpg",
  //       true,
  //       [
  //         new Topping(102, "toy", "女の子用シール", 200, 300),
  //         new Topping(101, "toy", "男の子用シール", 200, 300),
  //       ]
  //     ),
  //     [
  //       new OrderTopping(
  //         10,
  //         102,
  //         101,
  //         new Topping(102, "toy", "女の子用シール", 200, 300)
  //       ),
  //       new OrderTopping(
  //         20,
  //         101,
  //         101,
  //         new Topping(101, "toy", "男の子用シール", 200, 300)
  //       ),
  //     ]
  //   )
  // );

  /**
   * カートの中身をindexから取得.
   */
  created(): void {
    this.cartList = this["$store"].getters.getCartList;
    console.dir("カートの中身:" + JSON.stringify(this.cartList));
  }

  /**
   * 郵便番号から住所を取得.
   */
  async getAddress(): Promise<void> {
    //初期値リセット(住所、住所エラー)
    this.address = "";
    this.errorOfAddress = "";
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
        this.address =
          response.data.items[0].state_name + response.data.items[0].address;
        //失敗したらエラーを出す
      } else {
        this.errorOfAddress = "住所が見つかりません";
      }
    } catch (e) {
      this.errorOfAddress = "住所が見つかりません";
    }
  }

  /**
   * 注文したい内容(indexのカートの配列)をAPIに送る.
   */
  async order(): Promise<void> {
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

    if (
      this.errorOfName != "" ||
      this.errorOfMailAddess != "" ||
      this.errorOfZipCode != "" ||
      this.errorOfAddress != "" ||
      this.errorOfTelephone != "" ||
      this.errorOfDeliveryDate != "" ||
      this.errorOfDelivarytime != ""
    ) {
      return;
    }

    //注文商品情報の配列を作成
    const orderItems = [];
    const toppings = [];
    for (const cartListItem of this.cartList) {
      orderItems.push({
        itemId: cartListItem.itemId,
        quantity: cartListItem.quantity,
        size: cartListItem.size,
      });
      for (const topping of cartListItem.orderToppingList) {
        toppings.push(topping.toppingId);
      }
    }

    //APIに配達情報を送る
    try {
      await axios.post("http://153.127.48.168:8080/ecsite-api/order", {
        //★ユーザIDを持ってくる
        userId: "1111",
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
        orderToppingFormList: toppings,
      });
    } catch (e) {
      this.orderError = "エラーが発生しました";
    }
    //成功したら注文完了ページに飛ぶ
    if (this.orderError === "") {
      this.$router.push("/orderFinished");
    }
  }

  get tax(): string {
    let price = 0;
    for (const cartListItem of this.cartList) {
      price += cartListItem.totalPrice;
    }
    return (price * 0.1).toLocaleString();
  }

  get taxIncludePrice(): number {
    let price = 0;
    for (const cartListItem of this.cartList) {
      price += cartListItem.totalPrice;
    }
    return price * 1.1;
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
</style>
