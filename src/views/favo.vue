<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">お気に入りリスト</h1>
      <div class="row">
        <table class="striped">
          <tbody>
            <tr v-for="(favoItem, i) of favoList" :key="favoItem.id">
              <td>
                <div class="item-icon">
                  <img v-bind:src="favoItem.imagePath" />
                </div>
              </td>
              <td class="itemName">{{ favoItem.name }}</td>
              <td>
                <button
                  type="button"
                  class="btn"
                  v-on:click="goitemDetail(favoItem.id)"
                >
                  商品ページへ
                </button>
                <button
                  type="button"
                  class="btn"
                  v-on:click="deleteFavoItem(i)"
                >
                  削除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/types/Item";
@Component
export default class Favo extends Vue {
  /**
   * indexのお気に入りリストを取得する.
   * @returns お気に入りリスト
   */
  get favoList(): Array<Item> {
    const array = this["$store"].getters.getFavoList;
    const favoList = new Array<Item>();
    for (const favoItem of array) {
      favoList.push(
        new Item(
          favoItem.id,
          favoItem.type,
          favoItem.name,
          favoItem.description,
          favoItem.pliceM,
          favoItem.priceL,
          favoItem.imagePath,
          favoItem.deleted,
          []
        )
      );
    }
    return favoList;
  }

  /**
   * お気に入りリストから対象の商品を削除する.
   * @param indexNumber - 対象商品のインデックス番号
   */
  deleteFavoItem(indexNumber: number): void {
    this["$store"].commit("deleteFavoItem", indexNumber);
  }

  /**
   * お気に入りリストから商品詳細に飛ぶ.
   * @param id - 対象商品id
   */
  goitemDetail(id: number): void {
    this.$router.push(`/itemDetail/${id}`);
  }

  //終わり
}
</script>

<style scoped>
.btn {
  margin: 3px;
}

.itemName {
  text-align: center;
}

table {
  width: 100%;
}
</style>
