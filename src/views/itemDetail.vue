<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">Hawaiianパラダイス</h1>
        <div class="row">
          <div class="row item-detail">
            <div class="item-icon">
              <img src="img/1.jpg" />
            </div>
            <div class="item-intro">
              ハワイで取れる名産物でかつオーガニックな食料がふんだんに使われたローカルフーズです。健康志向の方に大人気の商品です。
            </div>
          </div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input id="size-m" name="size" type="radio" checked="checked" />
                <span>
                  &nbsp;<span class="price">Ｍ</span
                  >&nbsp;&nbsp;1,380円(税抜)</span
                >
              </label>
              <label>
                <input id="size-l" name="size" type="radio" />
                <span>
                  &nbsp;<span class="price">Ｌ</span
                  >&nbsp;&nbsp;2,380円(税抜)</span
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
            <div>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンソルト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンマヨネーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアントマト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ブルーチーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンチョコレート</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>アンチョビ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>エビ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ガーリックスライス</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>トロピカルフルーツ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ココナッツ</span>
              </label>
            </div>
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select>
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
            <span>この商品金額：38,000 円(税抜)</span>
          </div>
          <div class="row item-cart-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='cart_list.html'"
            >
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

@Component
export default class ItemDetail extends Vue {}
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
