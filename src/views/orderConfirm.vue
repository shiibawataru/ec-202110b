<template>
  <div></div>
</template>

<script lang="ts">
import { OrderItem } from "@/types/OrderItem";
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
  private deliveryDay = new Date();
  //配達日エラー
  private errorOfDeliveryDay = "";
  //配達時間
  private delivarytime = new Date();
  //配達時間エラー
  private errorOfDelivarytime = "";
  //支払い方法
  private paymentMethod = "";
  //カートの中身
  private cartList = new Array<OrderItem>();

  /**
   * 注文したい内容(indexのカートの配列)をAPIに送る.
   */
  // async order(): Promice<void> {
  //   const response = await axios.post(
  //     "",
  //     {
  //       id: this.currentEmployee.id,
  //       dependentsCount: this.currentDependentsCount,
  //     }
  //   );
  //   console.dir("response:" + JSON.stringify(response));
  // }

  // 終わり
}
</script>
<style scoped></style>
