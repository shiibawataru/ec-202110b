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
                  <img v-bind:src="cartItem.item.imagePath" />
                </div>
                <span>{{ cartItem.item.name }}</span>
              </td>
              <td v-if="cartItem.size === 'M'">
                <span class="price">&nbsp;{{ cartItem.size }}</span
                >&nbsp;&nbsp;{{ cartItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ cartItem.quantity }}個
              </td>
              <td v-if="cartItem.size === 'L'">
                <span class="price">&nbsp;{{ cartItem.size }}</span
                >&nbsp;&nbsp;{{ cartItem.item.priceL.toLocaleString() }}円
                &nbsp;&nbsp;{{ cartItem.quantity }}個
              </td>
              <td>
                <ul
                  v-for="orderTopping of cartItem.orderToppingList"
                  v-bind:key="orderTopping.id"
                >
                  <li v-if="cartItem.size === 'M'">
                    {{ orderTopping.topping.name }}&emsp;{{
                      orderTopping.topping.priceM
                    }}円
                  </li>
                  <li v-if="cartItem.size === 'L'">
                    {{ orderTopping.topping.name }} &emsp;
                    {{ orderTopping.topping.priceL }}円
                  </li>
                </ul>
              </td>

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
        <button class="btn" type="return" v-on:click="onclickReturn">
          商品一覧へ戻る</button
        >&nbsp;&nbsp;
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
import { OrderItem } from "@/types/OrderItem";
import { Component, Vue } from "vue-property-decorator";

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
   */
  created(): void {
    this.cartList = this["$store"].getters.getCartList;
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
   * 税額を計算する.
   * @returns 税額
   */
  get tax(): string {
    let price = 0;
    for (const cartItem of this.cartList) {
      price += cartItem.totalPrice;
    }
    return (price * 0.1).toLocaleString();
  }

  /**
   * 税込額を計算する.
   * @returns 税額
   */
  get taxIncludePrice(): number {
    let price = 0;
    for (const cartItem of this.cartList) {
      price += cartItem.totalPrice;
    }
    return price * 1.1;
  }

  /**
   * 商品一覧へ戻る.
   */
  onclickReturn(): void {
    this["$router"].push("/itemList");
  }

  /**
   *カートから商品を削除すし、カート内が0件だったらメッセージを表示する.
   @param 削除する商品の位置
   */
  deleteItem(index: number): void {
    this["$store"].commit("deleteItem", index);
    this.cartList = this["$store"].getters.getCartList;
    this.getNonItemMsg();
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
