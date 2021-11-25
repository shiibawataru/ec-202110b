<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">ショッピングカート</h1>
      <!-- table -->
      <div class="row">
        <div class="error-message">{{ nonItemMsg }}</div>
        <table class="striped" v-if="showCart">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, index) of cartList" v-bind:key="cartItem.id">
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img v-bind:src="`/img/${cartItem.item.id - 100}.jpg`" />
                </div>
                <span>{{ cartItem.item.name }}</span>
              </td>
              <td v-if="cartItem.size === 'M'">
                <span class="price">&nbsp;{{ cartItem.size }}</span
                >&nbsp;&nbsp;{{ cartItem.item.priceM }}円 &nbsp;&nbsp;{{
                  cartItem.quantity
                }}個
              </td>
              <td v-if="cartItem.size === 'L'">
                <span class="price">&nbsp;{{ cartItem.size }}</span
                >&nbsp;&nbsp;{{ cartItem.item.priceL }}円 &nbsp;&nbsp;{{
                  cartItem.quantity
                }}個
              </td>
              <div
                v-for="orderTopping of cartItem.orderToppingList"
                v-bind:key="orderTopping._id"
              >
                <td>
                  <ul>
                    <li v-if="cartItem.size === 'M'">
                      {{ orderTopping._topping.name }}&emsp;{{
                        orderTopping._topping.priceM
                      }}円
                    </li>
                    <li v-if="cartItem.size === 'L'">
                      {{ orderTopping.topping.name }} &emsp;
                      {{ orderTopping.topping.priceL }}円
                    </li>
                  </ul>
                </td>
              </div>
              <td>
                <div class="text-center">
                  {{ cartItem.totalPrice.toLocaleString() }}円
                </div>
              </td>
              <td>
                <button class="btn" type="button" @click="deleteItem(index)">
                  <span>削除</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row cart-total-price">
        <div v-show="showCart">消費税：{{ tax }}円</div>
        <div v-show="showCart">
          ご注文金額合計：{{ taxIncludePrice.toLocaleString() }}円 (税込)
        </div>
      </div>
      <div class="row order-confirm-btn">
        <button
          class="btn"
          type="button"
          @click="goOrderPage"
          v-show="showCart"
        >
          <span>注文に進む</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/types/Item";
import { OrderItem } from "@/types/OrderItem";
import { OrderTopping } from "@/types/OrderTopping";
import { Topping } from "@/types/Topping";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class CartList extends Vue {
  // 注文商品一覧
  private cartList: Array<OrderItem> = [];
  //取得した商品の価格
  private itemPrice = 0;
  //取得した商品のトッピングの価格
  private toppingPrice = 0;
  //取得した商品とそのトッピングの価格
  private subPrice = 0;
  // カート中身が0件の場合のエラーメッセージ
  private nonItemMsg = "";
  // カート中身が0件の場合のエラーメッセージ表示判定
  private showCart = true;

  /**
   * 注文商品一覧を取得する.
   仮でオブジェクト生成してます.
   */
  created(): void {
    this.cartList = this["$store"].getters.getCartList;

    // this.cartList = [
    //   //消すこと！！！
    //   new OrderItem(
    //     1,
    //     101,
    //     1,
    //     1,
    //     "M",
    //     new Item(
    //       101,
    //       "toy",
    //       "ビニールプール",
    //       "商品説明",
    //       1490,
    //       2570,
    //       "/img_toy/1.jpg",
    //       false,
    //       [
    //         new Topping(1, "a", "aa", 100, 200),
    //         new Topping(2, "b", "bb", 100, 200),
    //       ]
    //     ),
    //     [
    //       new OrderTopping(1, 1, 1, new Topping(1, "aa", "aaa", 100, 200)),
    //       new OrderTopping(2, 2, 2, new Topping(2, "bb", "bbb", 100, 200)),
    //     ]
    //   ),
    //   new OrderItem(
    //     2,
    //     101,
    //     1,
    //     1,
    //     "M",
    //     new Item(
    //       101,
    //       "toy",
    //       "ビニールプール",
    //       "商品説明",
    //       1490,
    //       2570,
    //       "/img_toy/1.jpg",
    //       false,
    //       [
    //         new Topping(1, "a", "aa", 100, 200),
    //         new Topping(2, "b", "bb", 100, 200),
    //       ]
    //     ),
    //     [
    //       new OrderTopping(1, 1, 1, new Topping(1, "aa", "aaa", 100, 200)),
    //       new OrderTopping(2, 2, 2, new Topping(2, "bb", "bbb", 100, 200)),
    //     ]
    //   ),
    // ];

    console.dir("カートの中身:" + JSON.stringify(this.cartList));
    this.getNonItemMsg();
  }
  /**
   * カートの中身が0件だった場合、メッセージを表示する.
   */
  getNonItemMsg(): void {
    if (this.cartList.length === 0) {
      this.showCart = false;
      this.nonItemMsg = "カートにアイテムが入っていません";
    }
  }

  /**
   * 税額、税込額を計算する.
   */
  get tax(): string {
    let price = 0;
    for (const cartItem of this.cartList) {
      price += cartItem.totalPrice;
    }
    return (price * 0.1).toLocaleString();
  }
  get taxIncludePrice(): number {
    let price = 0;
    for (const cartItem of this.cartList) {
      price += cartItem.totalPrice;
    }
    return price * 1.1;
  }

  /**
   *カートから商品を削除する.
   */
  deleteItem(index: number): void {
    console.log("渡されたindex:" + index);
    this["$store"].commit("deleteItem", index);
  }

  /**
   * 「注文に進む」ボタンを押すと注文確認画面に遷移する.
   */
  goOrderPage(): void {
    //初期化(goOrderフラグをfalseにする)
    this.$store.commit("noGoOrdered");
    if (this["$store"].getters.getLoginStatus) {
      this["$router"].push("/orderConfirm");
    } else {
      //ログイン時パターン1か判定するフラグをtrueにする
      this.$store.commit("goOrdered");
      this["$router"].push("/login");
    }
  }
}
</script>

<style>
.cart-table-th {
  text-align: center;
}
.cart-item-icon img {
  margin: auto;
  display: block;
  border-radius: 20px;
  width: 100px;
  height: 100px;
  padding: 0 0 15px 0;
}
.cart-item-name {
  text-align: center;
  font-size: 15px;
}

.cart-total-price {
  font-size: 35px;
  text-align: center;
}

.order-confirm-btn {
  text-align: center;
}

.error-message {
  text-align: center;
  color: red;
}
</style>
