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
        <div>
          <select
            name="sort"
            v-model="sort"
            class="browser-default"
            v-on:change="sortChange"
          >
            <option value="安い" selected>価格順(安い順)</option>
            <option value="高い">価格順(高い順)</option>
            <option value="名前">名前順</option>
          </select>
        </div>
      </form>
    </div>
    <!-- item list -->

    <div class="item-wrapper">
      <div class="container">
        <div class="items">
          <ul v-for="item of displayList" v-bind:key="item.id">
            <div class="item">
              <div class="item-icon">
                <img v-bind:src="item.imagePath" />
              </div>
              <router-link v-bind:to="'/itemDetail/' + item.id">
                {{ item.name }}</router-link
              ><br />
              <span class="price">Ｍ</span
              >{{ item.priceM.toLocaleString() }}円<br />
              <span class="price">Ｌ</span
              >{{ item.priceL.toLocaleString() }}円<br />
            </div>
          </ul>
        </div>
        <span
          v-for="num of pageNumber"
          :key="num"
          class="row order-confirm-btn pageBtn"
        >
          <button class="btn" type="button" v-on:click="display(num)">
            {{ num }}
          </button></span
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
  private itemList = new Array<Item>();
  //表示する商品一覧
  private displayList = new Array<Item>();
  // 曖昧検索ワード
  private searchWord = "";
  // 検索エラーメッセージ
  private errorOfSearch = "";
  //何順か
  private sort = "安い";

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから商品一覧を取得する.
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
    this.startDisplay();
  }

  // 曖昧検索
  onclicksearch(): void {
    //初期値リセット
    this.errorOfSearch = "";
    this.displayList.splice(0, this.displayList.length);
    //検索する
    this.displayList = this.itemList.filter((item) =>
      item.name.includes(this.searchWord)
    );
    // 該当商品がない場合はエラーメーセージの表示と全件表示
    if (this.displayList.length === 0 || this.searchWord === "") {
      this.errorOfSearch = "該当する商品がありません";
      this.startDisplay();
    }
  }

  /**
   * ページボタン用配列作成.
   */
  get pageNumber(): Array<number> {
    let btn = 0;
    if (this.itemList.length % 6 === 0) {
      btn = this.itemList.length / 6;
    } else {
      btn = Math.floor(this.itemList.length / 6) + 1;
    }
    const array = [];
    for (let i = 1; i <= btn; i++) {
      array.push(i);
    }
    return array;
  }

  /**
   * 初期表示用.
   */
  startDisplay(): void {
    this.displayList.splice(0, this.displayList.length);
    for (let i = 0; i <= 5; i++) {
      this.displayList.push(this.itemList[i]);
    }
  }

  /**
   * 表示数変更.
   */
  display(num: string): void {
    const pageNum = Number(num);
    //初期値リセット
    this.displayList.splice(0, this.displayList.length);
    //表示する情報の始めと終わりを決める
    const start = 6 * (pageNum - 1);
    let end = 6 * pageNum - 1;
    if (end > this.itemList.length) {
      end = this.itemList.length;
    }
    //表示用配列にpush
    for (let i = start; i <= end; i++) {
      this.displayList.push(this.itemList[i]);
    }
  }

  /**
   * 並び替え.
   */
  sortChange(): void {
    console.log(this.sort);
    //安い順
    if (this.sort === "安い") {
      this.itemList.sort(function (boforeItems, afterItems) {
        if (afterItems.priceM > boforeItems.priceM) {
          return -1;
        } else {
          return 1;
        }
      });
    }
    //高い順
    if (this.sort === "高い") {
      this.itemList.sort(function (boforeItems, afterItems) {
        if (afterItems.priceM > boforeItems.priceM) {
          return 1;
        } else {
          return -1;
        }
      });
    }
    //名前順
    if (this.sort === "名前") {
      this.itemList.sort((boforeItems, afterItems) =>
        boforeItems.name.localeCompare(afterItems.name, "ja")
      );
    }
    this.startDisplay();
  }

  // 終わり
}
</script>
<style scoped>
.errorMessage {
  color: red;
}

.item {
  padding: 20px;
  width: 320px;
}

.item-wrapper {
  padding-top: 0;
  margin-top: 0;
}

.container {
  padding: 30px;
}

.pageBtn {
  display: inline-flex;
}

.btn {
  margin-right: 30px;
}
</style>
