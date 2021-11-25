<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文履歴</h1>
      <form>
        <div>
          <select name="filter" v-model="filterYear" class="browser-default">
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
          <button class="btn" type="button" @click="dateFilter">
            絞り込み
          </button>
        </div>
      </form>
      <!-- table -->
      <div class="row">
        <div class="error-message">{{ nonOrderMsg }}</div>
        <table class="striped" v-if="showOrderHistory">
          <thead>
            <tr>
              <th>注文日</th>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody v-for="order of orderList" :key="order.id">
            <tr v-for="orderItem of order.orderItemList" :key="orderItem.id">
              <td>{{ order.orderDate }}</td>
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="orderItem.item.imagePath" />
                </div>
                <span>{{ orderItem.item.name }}</span>
              </td>
              <td v-if="orderItem.size === 'M'">
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM }}円 &nbsp;&nbsp;{{
                  orderItem.quantity
                }}個
              </td>
              <td v-if="orderItem.size === 'L'">
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM }}円 &nbsp;&nbsp;{{
                  orderItem.quantity
                }}個
              </td>
              <td>
                <ul
                  v-for="orderTopping of orderItem.orderToppingList"
                  :key="orderTopping.id"
                >
                  <li v-if="orderItem.size === 'M'">
                    <span
                      >{{ orderTopping.topping.name }}&emsp;{{
                        orderTopping.topping.priceM
                      }}円</span
                    >
                  </li>
                  <li v-if="orderItem.size === 'L'">
                    <span>
                      {{ orderTopping.topping.name }} &emsp;
                      {{ orderTopping.topping.priceL }}円</span
                    >
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">{{ orderItem.subTotal }}円</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/types/User";
import { Item } from "@/types/Item";
import { Order } from "@/types/Order";
import { OrderItem } from "@/types/OrderItem";
import { OrderTopping } from "@/types/OrderTopping";
import { Topping } from "@/types/Topping";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class OrderHistory extends Vue {
  // 注文履歴が0件の場合のエラーメッセージ
  private nonOrderMsg = "";
  // 注文履歴が0件の場合のエラーメッセージ表示判定
  private showOrderHistory = true;

  private filterYear = 2021;
  // 注文商品を入れる配列
  private orderList: Array<Order> = [];

  async created(): Promise<void> {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
    const userId: number = this["$store"].getters.getUserId;
    console.log("userId: " + userId);

    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/order/orders/toy/1111`
    );

    console.dir("注文商品一覧:" + JSON.stringify(this.orderList));
    for (let order of response.data.orders) {
      new Order(
        order.id,
        order.userId,
        order.status,
        order.totalPrice,
        new Date(order.orderDate),
        order.distinationName,
        order.distinationEmail,
        order.distinationZipcode,
        order.distinationAddress,
        order.distinationTel,
        new Date(order.deliveryTime),
        order.paymentMethod,
        order.user,
        order.orderItemList
      );
      this.orderList.push(order);
    }
    this.getNonOrderMsg();
  }

  /**
   * 注文履歴が0件だった場合、メッセージを表示する.
   */
  getNonOrderMsg(): void {
    if (this.orderList.length === 0) {
      this.showOrderHistory = false;
      this.nonOrderMsg = "注文履歴がありません";
      return;
    }
  }
  /**
   * 購入年で絞り込み検索
   */
  dateFilter() {
    this.nonOrderMsg = "";
    this.orderList.splice(0, this.orderList.length);
    // 確認用
    console.log(this.filterYear);
    for (let order of this.orderList) {
      console.dir(
        "order.orderDate.getFullYear:" +
          JSON.stringify(new Date(order.orderDate).getFullYear())
      );
    }
    let filterOrderList = this.orderList.filter(
      (orderItem) =>
        Number(new Date(orderItem.orderDate).getFullYear()) === this.filterYear
    );
    console.log("絞り込みした" + JSON.stringify(filterOrderList));
    this.orderList = filterOrderList;
  }
}
</script>
<style>
.error-message {
  text-align: center;
  color: red;
}
</style>
