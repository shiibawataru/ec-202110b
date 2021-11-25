<template>
  <div>
    <div class="snow">●</div>
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
          <form class="form">
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
                      this.currentItem.priceM.toLocaleString()
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
                      this.currentItem.priceL.toLocaleString()
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
          </form>
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
            <button class="btn" type="return" v-on:click="onclickReturn">
              商品一覧へ戻る
            </button>
            &nbsp;&nbsp;
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
  // チェックされたトッピングを配列に入れる
  private checked: Array<Topping> = [];
  // 注文するトッピングリスト
  private currentOrderToppingList: Array<OrderTopping> = [];
  //商品情報
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
  // カートに入れられた商品情報
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
   * VuexストアのGetter経由で受け取ったリクエストパラメータのIDから１件の商品情報を取得する.
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

  /**
   * チェックされたトッピングの数
   */
  get checkedCount(): number {
    return this.checked.length;
  }
  /**
   * 小計を計算する
   */
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
  /**
   * 商品一覧へ戻る
   */
  onclickReturn(): void {
    this["$router"].push("/itemList");
  }

  /*
   * カートに追加する
   */
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

  /**
   * 選択されたトッピングを配列に入れる
   */
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
.top-wrapper {
  background-color: #dc143c;
}
.container {
  background-color: lightgray;
  border-radius: 15px;
  width: 70%;
  padding-top: 1px;
  margin-top: -50px;
}
.snow {
  color: snow; /*雪の色*/
  font-size: 25px; /*雪の大きさ*/
  position: fixed;
  top: -5%; /*初期位置*/
  text-shadow: 5vw -100px 2px, 10vw -400px 3px, 20vw -500px 4px, 30vw -580px 1px,
    39vw -250px 2px, 42vw -340px 5px, 56vw -150px 2px, 63vw -180px 0,
    78vw -220px 4px, 86vw -320px 9px, 94vw -170px 7px;
  animation: anim 5s linear infinite;
}

@keyframes anim {
  100% {
    color: transparent;
    top: 150%;
  }
}
</style>
