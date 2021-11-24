<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">注文履歴</h1>
      <!-- table -->
      <div class="row">
        <div class="error-message">{{ nonOrderMsg }}</div>
        <table class="striped">
          <thead>
            <tr>
              <th class="cart-table-th">商品名</th>
              <th>サイズ、価格(税抜)、数量</th>
              <th>トッピング、価格(税抜)</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody v-for="order of orderList" :key="order.id">
            <tr v-for="orderItem of order.orderItemList" :key="orderItem.id">
              <td class="cart-item-name">
                <div class="cart-item-icon">
                  <img :src="orderItem.item.imagePath" />
                </div>
                <span>{{ orderItem.item.name }}</span>
              </td>
              <td v-if="orderItem.size === 'M'">
                <span class="price">&nbsp;{{ orderItem.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ orderItem.quantity }}個
              </td>
              <td v-if="orderItem.item.size === 'L'">
                <span class="price">&nbsp;{{ orderItem.item.size }}</span
                >&nbsp;&nbsp;{{ orderItem.item.priceM.toLocaleString() }}円
                &nbsp;&nbsp;{{ orderItem.quantity }}個
              </td>
              <td
                v-for="orderTopping of orderItem.orderToppingList"
                :key="orderTopping.id"
              >
                <ul>
                  <li v-if="orderItem.size === 'M'">
                    {{ orderTopping.topping.name }}&emsp;{{
                      orderTopping.topping.priceM
                    }}円
                  </li>
                  <li v-if="orderItem.size === 'L'">
                    {{ orderTopping.topping.name }} &emsp;
                    {{ orderTopping.topping.priceL }}円
                  </li>
                </ul>
              </td>
              <td>
                <div class="text-center">
                  <!-- {{ orderItem.totalPrice.toLocaleString() }}円 -->
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
  private nonOrderMsg = "";
  // 注文商品を仮で生成
  private orderList: Array<Order> = [
    // new Order(
    //   13,
    //   1111,
    //   0,
    //   10000,
    //   new Date(2021 - 10 - 22),
    //   "名前",
    //   "aaa@aaa",
    //   "2340052",
    //   "住所",
    //   "12345678",
    //   new Date(2021 - 10 - 28),
    //   1,
    //   [new User(1, "名前", "aaa@aaa", "aaa", "2340052", "住所", "12345678")],
    //   [
    //     new OrderItem(
    //       8,
    //       1,
    //       13,
    //       2,
    //       "M",
    //       new Item(
    //         1,
    //         "aloha",
    //         "Hawaiian パラダイス",
    //         "商品名",
    //         2160,
    //         3380,
    //         "/img_aloha/1.jpg",
    //         false,
    //         [new Topping(1, "aloha", "ハワイアンソルト", 200, 300)]
    //       ),
    //       [
    //         new OrderTopping(
    //           1,
    //           1,
    //           8,
    //           new Topping(1, "aloha", "ハワイアンソルト", 200, 300)
    //         ),
    //       ]
    //     ),
    //   ]
    // ),
  ];

  async created(): Promise<void> {
    const response = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/order/orders/toy"
    );
    this.orderList = response.data.orders;
    console.dir("注文商品一覧:" + JSON.stringify(response.data.orders));

    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
  }
}
</script>
<style></style>
