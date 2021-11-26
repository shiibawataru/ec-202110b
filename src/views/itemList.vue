<template>
  <div class="top-wrapper">
    <div class="snow">●</div>
    <!-- search form -->
    <div class="xmasCount">
      <h3>クリスマスまであと</h3>
      <flip-countdown deadline="2021-12-25 00:00:00"> </flip-countdown>
    </div>
    <div class="container">
      <div class="xmas">
        <form method="post" class="search-form">
          <span class="errorMessage">{{ errorOfSearch }}</span>
          <input
            type="text"
            name="name"
            class="search-name-input"
            v-model="searchWord"
            list="itemSuggest"
          />

          <datalist id="itemSuggest">
            <div v-for="item of items" v-bind:key="item.id">
              <option v-bind:value="item.name"></option>
            </div>
          </datalist>

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
                <router-link v-bind:to="'/itemDetail/' + item.id">
                  <div class="item-icon">
                    <img v-bind:src="item.imagePath" />
                  </div>
                  <div>
                    {{ item.name }}
                  </div> </router-link
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/types/Item";
import FlipCountdown from "vue2-flip-countdown";
@Component({
  components: {
    FlipCountdown,
  },
})
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
  //サジェスト機能の配列
  private items = [];
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
    //サジェスト機能の配列に商品情報を代入
    this.items = this["$store"].getters.getItemList;
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
.xmasCount {
  text-align: center;
  color: mediumseagreen;
}
h3 {
  font-weight: bolder;
}
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
.top-wrapper {
  background-color: #dc143c;
}
/* .item-wrapper {
  background-color: #dc143c;
} */
.container {
  width: 100%;
}
.xmas {
  background-color: ghostwhite;
  border-radius: 15px 15px 0 0;
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
