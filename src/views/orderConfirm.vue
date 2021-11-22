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
              <td>
                <span class="price">&nbsp;{{ cartListItem.size }}</span
                >&nbsp;&nbsp;{{ cartListItem.totalPrice }}円 &nbsp;&nbsp;{{
                  cartListItem.quantity
                }}個
              </td>
              <td
                v-for="topping of cartListItem.item.toppingList"
                :key="topping.id"
              >
                <ul>
                  <li v-if="cartListItem.size === 'M'">
                    {{ topping.name }}{{ topping.priceM }}円
                  </li>
                  <li v-if="cartListItem.size === 'L'">
                    {{ topping.name }}{{ topping.priceL }}円
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">{{ cartListItem.totalPrice }}円</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row cart-total-price">
        <div>消費税：{{ tax }}円</div>
        <div>ご注文金額合計：{{ taxIncludePrice }}円 (税込)</div>
      </div>

      <h2 class="page-title">お届け先情報</h2>
      <div class="order-confirm-delivery-info">
        <div class="row">
          <div class="input-field">
            <!-- 名前 -->
            <input id="name" type="text" v-model="name" />
            <label for="name">お名前</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- メールアドレス -->
            <input id="email" type="email" v-model="mailAddress" />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 郵便番号 -->
            <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 住所 -->
            <input id="address" type="text" v-model="address" />
            <label for="address">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <!-- 電話番号 -->
            <input id="tel" type="tel" v-model="telephone" />
            <label for="tel">電話番号</label>
          </div>
        </div>
        <div class="row order-confirm-delivery-datetime">
          <div class="input-field">
            <!-- 配達日 -->
            <input id="deliveryDate" type="date" v-model="deliveryDate" />
            <label for="address">配達日時</label>
          </div>
          <!-- 配達時間 -->
          <label class="order-confirm-delivery-time">
            <input
              name="deliveryTime"
              type="radio"
              value="10時"
              checked="checked"
              v-model="deliveryTime"
            />
            <span>10時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="11" />
            <span>11時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="12" />
            <span>12時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="13" />
            <span>13時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="14" />
            <span>14時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="15" />
            <span>15時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="16" />
            <span>16時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="17" />
            <span>17時</span>
          </label>
          <label class="order-confirm-delivery-time">
            <input name="deliveryTime" type="radio" value="18" />
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
            <input name="paymentMethod" type="radio" value="2" />
            <span>クレジットカード</span>
          </label>
        </span>
      </div>
      <div class="row order-confirm-btn">
        <button
          class="btn"
          type="button"
          onclick="location.href='order_finished.html'"
          v-on:click="order"
        >
          <span>この内容で注文する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
import { Item } from "@/types/Item";
import { Topping } from "@/types/Topping";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class OrderConfirm extends Vue {
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
  private deliveryDay = "";
  //配達日エラー
  private errorOfDeliveryDay = "";
  //配達時間
  private delivaryTime = "";
  //配達時間エラー
  private errorOfDelivarytime = "";
  //支払い方法
  private paymentMethod = "";
  //カートの中身
  private cartList = new Array<OrderItem>(
    new OrderItem(
      1,
      2,
      3,
      4,
      "L",
      new Item(
        100,
        "タイプ",
        "名前",
        "説明",
        2000,
        3000,
        "/img_toy/4.jpg",
        true,
        []
      ),
      []
    )
  );

  /**
   * 注文したい内容(indexのカートの配列)をAPIに送る.
   */
  async order(): Promise<void> {
    const year = Number(this.deliveryDay.substr(0, 4));
    const month = Number(this.deliveryDay.substr(4, 2));
    const day = Number(this.deliveryDay.substr(6, 2));
    const delivery = new Date(year, month, day, Number(this.delivaryTime));
    for (const cartItem of this.cartList) {
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/order",
        {
          userId: cartItem.id,
          status: this.paymentMethod,
          totalPrice: this.taxIncludePrice,
          destinationName: this.name,
          destinationEmail: this.mailAddress,
          destinationZipcode: this.zipCode,
          destinationAddress: this.address,
          destinationTel: this.telephone,
          deliveryTime: delivery,
          paymentMethod: this.paymentMethod,
          orderItemFormList: {
            itemId: cartItem.item.id,
            quantity: cartItem.quantity,
            size: cartItem.size,
          },
        }
      );
      console.dir("response:" + JSON.stringify(response));
    }
  }

  get tax(): string {
    let tax = "";
    for (const cartListItem of this.cartList) {
      if (cartListItem.size === "M") {
        tax = (
          cartListItem.item.priceM *
          cartListItem.quantity *
          0.1
        ).toLocaleString();
      } else if (cartListItem.size === "L") {
        tax = (
          cartListItem.item.priceL *
          cartListItem.quantity *
          0.1
        ).toLocaleString();
      }
    }
    return tax;
  }

  get taxIncludePrice(): string {
    let price = "";
    for (const cartListItem of this.cartList) {
      if (cartListItem.size === "M") {
        price = (
          cartListItem.item.priceM * cartListItem.quantity +
          this.tax
        ).toLocaleString();
      } else if (cartListItem.size === "L") {
        price = (
          cartListItem.item.priceL * cartListItem.quantity +
          this.tax
        ).toLocaleString();
      }
    }
    return price;
  }

  // 終わり
}
</script>
<style scoped>
.order-confirm-delivery-info {
  margin: 0 200px 0 200px;
}

.order-confirm-delivery-datetime {
  text-align: center;
}

.order-confirm-delivery-time {
  margin-right: 10px;
}

.order-confirm-payment-method {
  text-align: center;
}

.order-confirm-payment-method-radio {
  margin-right: 10px;
}
</style>
