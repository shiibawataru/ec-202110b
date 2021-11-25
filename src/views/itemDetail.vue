<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">{{ currentItem.name }}</h1>
        <div class="row">
          <div class="row item-detail">
            <div class="item-icon">
              <img v-bind:src="currentItem.imagePath" />
            </div>
            <div class="item-intro">
              <pre>{{ currentItem.description }}</pre>
            </div>
          </div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input
                  id="size-m"
                  name="size"
                  type="radio"
                  value="M"
                  v-model="selectedSize"
                />
                <span>
                  &nbsp;<span class="price">Ｍ</span>&nbsp;&nbsp;{{
                    formatPriceM
                  }}円(税抜)</span
                >
              </label>
              <label>
                <input
                  id="size-l"
                  name="size"
                  type="radio"
                  value="L"
                  v-model="selectedSize"
                />
                <span>
                  &nbsp;<span class="price">Ｌ</span>&nbsp;&nbsp;{{
                    formatPriceL
                  }}円(税抜)</span
                >
              </label>
            </div>
          </div>
          <div class="row item-toppings">
            <div class="item-hedding">
              トッピング：&nbsp;1つにつき
              <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
              <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
            </div>
            <span
              v-for="topping of currentItem.toppingList"
              v-bind:key="topping.name"
            >
              <label class="item-topping">
                <input
                  type="checkbox"
                  :value="topping"
                  v-model="checked"
                  name="topping"
                />
                <span>{{ topping.name }}</span>
              </label>
            </span>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select class="browser-default" v-model="quantity">
                  <option value="" disabled selected>選択して下さい</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row item-total-price">
            <span>この商品金額：{{ subTotalPrice }}円(税抜)</span>
          </div>
          <div class="row item-cart-btn">
            <button class="btn" type="button" v-on:click="onclickAddItemToCart">
              <span>カートに入れる</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/types/Item";
import { Topping } from "@/types/Topping";
import { OrderItem } from "@/types/OrderItem";
import axios from "axios";
import { OrderTopping } from "@/types/OrderTopping";

@Component
export default class ItemDetail extends Vue {
  // チェックされたものを配列に入れる
  private checked: Array<Topping> = [];
  // private currentToppingList: Array<Topping> = this.checked;
  private currentOrderToppingList: Array<OrderTopping> = [];

  // 表示されている商品のトッピングリスト
  // private currentToppingList = new Topping(0, "AA", "AA", 0, 0);
  // 送るトッッピングを入れるリスト
  // private currentOrderToppingList = new OrderTopping(
  //   0,
  //   0,
  //   0,
  //   this.currentToppingList
  // );
  // 表示されている商品の詳細
  private currentItem = new Item(
    0,
    "BB",
    "BB",
    "BB",
    0,
    0,
    "/img/noImage.png",
    true,
    Array<Topping>()
  );
  // カートに入れられた
  private currentOrderItem = new OrderItem(
    0,
    0,
    0,
    0,
    "CC",
    this.currentItem,
    Array<OrderTopping>()
  );
  // 選択されたサイズ
  private selectedSize = "M";

  // 選択された数量
  private quantity = 1;

  /**
   * VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の従業員情報を取得する.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のGetterを呼ぶ。
   * ライフサイクルフックのcreatedイベント利用
   */
  async created(): Promise<void> {
    // 送られてきたリクエストパラメータのidをnumberに変換して取得する
    const itemId = parseInt(this.$route.params.id);
    //
    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
    );
    // 取得したJSONデータをコンソールに出力して確認
    console.dir("response:" + JSON.stringify(response));
    // Itemオブジェクト型として代入
    this.currentItem = new Item(
      response.data.item.id,
      response.data.item.type,
      response.data.item.name,
      response.data.item.description,
      response.data.item.priceM,
      response.data.item.priceL,
      response.data.item.imagePath,
      response.data.item.deleted,
      response.data.item.toppingList
    );
  }
  // 3桁カンマ区切りに変更
  get formatPriceM(): string {
    return this.currentItem.priceM.toLocaleString();
  }
  // 3桁カンマ区切りに変更
  get formatPriceL(): string {
    return this.currentItem.priceL.toLocaleString();
  }

  // チェックされたトッピングの数
  get checkedCount(): number {
    return this.checked.length;
  }

  // 選択されたものから小計を計算する
  get subTotalPrice(): string {
    let subTotalPrice = 0;
    if (this.selectedSize === "M") {
      subTotalPrice =
        (this.currentItem.priceM + this.checkedCount * 200) *
        Number(this.quantity);
    } else if (this.selectedSize === "L") {
      subTotalPrice =
        (this.currentItem.priceL + this.checkedCount * 300) *
        Number(this.quantity);
    }
    return subTotalPrice.toLocaleString();
  }

  // カートに商品を追加
  onclickAddItemToCart(): void {
    this.orderCart();
    const namingId = this["$store"].getters.getCartList.length + 1;
    this["$store"].commit("addItemToCart", {
      OrderItem: new OrderItem(
        (this.currentOrderItem.id = namingId),
        (this.currentOrderItem.itemId = this.currentItem.id),
        (this.currentOrderItem.orderId = namingId),
        (this.currentOrderItem.quantity = Number(this.quantity)),
        (this.currentOrderItem.size = this.selectedSize),
        (this.currentOrderItem.item = this.currentItem),
        this.currentOrderToppingList
      ),
    });
    this["$router"].push("/cartList");
  }

  //
  orderCart(): void {
    for (const check of this.checked) {
      this.currentOrderToppingList.push(
        new OrderTopping(1, check.id, this.currentItem.id, check)
      );
    }
  }
}
</script>
<style scoped>
/* ========================================
    商品詳細ページのスタイル
   ======================================== */

.item-detail {
  display: flex;
  /* 中央揃え */
  justify-content: center;
}
.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 250px;
  height: 250px;
  padding: 0 0 15px 0;
}

.item-intro {
  width: 400px;
  padding-top: 50px;
  padding-left: 50px;
  font-size: 20px;
}

.item-hedding {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.item-size {
  /* text-align: center; */
  font-size: 15px;
  margin-bottom: 20px;
  padding: 0 200px 0 200px;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
  color: black;
}

.item-toppings {
  font-size: 15px;
  padding: 0 200px 0 200px;
}

.item-topping {
  margin-right: 10px;
}

.item-hedding-quantity {
  margin-left: 200px;
}

.item-quantity {
  text-align: center;
  font-size: 15px;
}

.item-quantity-selectbox {
  padding: 0 300px 0 300px;
}

.item-total-price {
  font-size: 35px;
  text-align: center;
}

.item-cart-btn {
  text-align: center;
}
</style>
