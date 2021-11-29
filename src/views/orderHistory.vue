<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文履歴</h1>
      <form class="form">
        <select name="filter" v-model="filterYear" class="browser-default">
          <option value="指定なし">指定なし</option>
          <option value="2021">2021年</option>
          <option value="2020">2020年</option>
          <option value="2019">2019年</option>
          <option value="2018">2018年</option>
          <option value="2017">2017年</option>
          <option value="2016">2016年</option>
          <option value="2015">2015年</option>
          <option value="2014">2014年</option>
          <option value="2013">2013年</option>
          <option value="2012">2012年</option>
          <option value="2011">2011年</option>
        </select>
        <button class="btn" type="button" @click="dateFilter">絞り込み</button>
      </form>
      <!-- table -->
      <div class="row">
        <div class="error-message">{{ nonOrderMsg }}</div>
        <table class="striped" v-if="showOrderHistory">
          <thead>
            <tr>
              <th class="order-history-table-th">注文日</th>
              <th class="order-history-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody v-for="order of showOrderList" :key="order.id">
            <tr v-for="orderItem of order.orderItemList" :key="orderItem.id">
              <td class="order-history-item-name">{{ order.formatDate }}</td>
              <td class="order-history-item-name">
                <router-link v-bind:to="'/itemDetail/' + orderItem.item.id">
                  <div class="order-history-item-icon img">
                    <img :src="orderItem.item.imagePath" />
                  </div>
                  <span>{{ orderItem.item.name }}</span>
                </router-link>
              </td>
              <td v-if="orderItem.size === 'M'">
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ orderItem.quantity }}個
              </td>
              <td v-if="orderItem.size === 'L'">
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ orderItem.quantity }}個
              </td>
              <div>
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
              </div>
              <td>
                <div class="text-center">
                  {{ orderItem.subTotal.toLocaleString() }}円
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Order } from "@/types/Order";
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class OrderHistory extends Vue {
  // 注文履歴が0件の場合のエラーメッセージ
  private nonOrderMsg = "";
  // 注文履歴が0件の場合のエラーメッセージ表示判定
  private showOrderHistory = true;
  // 購入年
  private filterYear = "";
  // 表示する注文商品を入れる配列
  private showOrderList: Array<Order> = [];
  // 注文商品を入れる配列
  private orderList: Array<Order> = [];
  /**
   * ユーザーIDから注文履歴を取得する.
   */
  async created(): Promise<void> {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
    const userId: number = this["$store"].getters.getUserId;
    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/order/orders/toy/${userId}`
    );

    console.dir("response:" + JSON.stringify(response.data.orders));

    for (let order of response.data.orders) {
      let newOrder = new Order(
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
      this.orderList.push(newOrder);
      // 購入日が近い順に並び替え
      this.orderList.sort(function (beforeOrder, afterOrder) {
        if (afterOrder.orderDate > beforeOrder.orderDate) {
          return 1;
        } else {
          return -1;
        }
      });

      console.dir("入れた配列" + JSON.stringify(newOrder));
    }
    this.getNonOrderMsg();
    this.startDisplay();
  }
  /**
   * 注文履歴を全件表示する.
   */
  startDisplay(): void {
    for (let i = 0; i < this.orderList.length; i++) {
      this.showOrderList.push(this.orderList[i]);
    }
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
   * 購入年で絞り込み検索.
   */
  dateFilter(): void {
    // 初期化
    this.nonOrderMsg = "";
    this.showOrderList.splice(0, this.showOrderList.length);
    this.showOrderList = this.orderList.filter(
      (order) =>
        Number(order.orderDate.getFullYear()) === Number(this.filterYear)
    );
    this.showOrderHistory = true;
    // 指定なしの場合は全件表示
    if (this.filterYear === "指定なし") {
      this.startDisplay();
      // 該当の注文履歴がない場合はエラーメーセージを表示
    } else if (this.showOrderList.length === 0) {
      this.nonOrderMsg = "該当する注文履歴がありません";
      this.showOrderHistory = false;
    }
  }
}
</script>
<style scoped>
.error-message {
  text-align: center;
  color: red;
}
.form {
  width: 30%;
  text-align: center;
  display: flex;
}
select {
  width: 200px;
  margin-right: 10px;
  text-align: center;
}
</style>
