<template>
  <div>
    <!-- search form -->
    <div class="container">
      <form method="post" class="search-form">
        <span class="errorMessage">{{ errorOfSearch }}</span>
        <input
          type="text"
          name="name"
          class="search-name-input"
          v-model="searchWord"
        />
        <span class="row order-confirm-btn">
          <button
            class="btn search-btn"
            type="button"
            v-on:click="onclicksearch"
          >
            検索
          </button>
        </span>
      </form>
    </div>
    <!-- item list -->
    <div class="item-wrapper">
      <div class="container">
        <div class="items">
          <ul v-for="item of itemList" v-bind:key="item.id">
            <div class="item">
              <div class="item-icon">
                <img v-bind:src="item.imagePath" />
              </div>
              <a href="item_detail.html"> {{ item.name }}</a
              ><br />
              <span class="price">Ｍ</span>{{ item.priceM }}<br />
              <span class="price">Ｌ</span>{{ item.priceL }}<br />
            </div>
          </ul>
        </div>
        <span v-for="num of pageNumber" :key="num"
          ><span class="row order-confirm-btn"
            ><button class="btn" type="button">{{ num }}</button></span
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/types/Item";

@Component
export default class ItemList extends Vue {
  // 商品一覧
  private itemList: Array<Item> = [];
  // 曖昧検索ワード
  private searchWord = "";
  // 検索エラーメッセージ
  private errorOfSearch = "";

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから従業員一覧を取得する.
   *
   * @remarks
   * Vueインスタンスが生成されたタイミングで
   * Vuexストア内のアクションを呼ぶ(ディスパッチする)。
   * ライフサイクルフックのcreatedイベント利用。
   *
   * 取得してからゲットするため、async awaitを利用している。
   */
  async created(): Promise<void> {
    await this["$store"].dispatch("getItemList");
    this.itemList = this["$store"].getters.getItemList;
  }

  // 曖昧検索
  onclicksearch(): void {
    this.itemList = this.itemList.filter((item) =>
      item.name.includes(this.searchWord)
    );
    // 該当商品がない場合はエラーメーセージの表示と全件表示
    if (this.itemList.length === 0) {
      this.errorOfSearch = "該当する商品がありません";
      this.itemList = this["$store"].getters.getItemList;
    }
  }

  /**
   * ページ用配列作成
   */
  get pageNumber(): Array<number> {
    this.itemList.length;
    const array = [1, 2, 3];
    return array;
  }
}
</script>
<style scoped>
/* ========================================
    商品一覧ページのスタイル
   ======================================== */

/* ========================================
    search-wrapperの設定
   ======================================== */

.search-wrapper {
  padding: 80px 0 50px 0; /* 上はヘッダが来るのでその分180px分空ける */
  /* text-align: center; */
  position: fixed; /* スクロールしても表示されるように位置を固定 */
  height: 180px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1; /* 上に表示されるようにする(数が多いほど上に来る。例えば-1にすると裏側に行き見えなくなります) */
  padding-top: 0;
  margin-top: 0;
}

.search-form {
  margin: auto; /*検索窓を中央に配置*/
  width: 40%;
  text-align: center;
}

.search-name-input {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  /* display: block; */
  width: 30%;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: inherit;
  margin: 0;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
}

.search-btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.errorMessage {
  color: red;
}

/* ========================================
    item-wrapperの設定
   ======================================== */

.item-wrapper {
  padding-top: 200px; /* 上はヘッダや検索フォームが来るのでその分空ける */
  padding-bottom: 80px;
  padding-left: 15%;
  padding-right: 5%;
  background-color: #f7f7f7;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap; /*表示内容が多かった時に自動的に複数行に分割される */
}

.item {
  padding: 20px;
  width: 320px;
}

.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 200px;
  height: 200px;
  padding: 0 0 15px 0;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
}
</style>
