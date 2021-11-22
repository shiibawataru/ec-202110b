<template>
  <!-- item list -->
  <div class="item-wrapper">
    <div class="container">
      <div class="items">
        <div class="item">
          <div class="item-icon">
            <img src="/img/1.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/2.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/3.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/4.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/5.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/6.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/7.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/8.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/9.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/10.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/11.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/12.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/13.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>

        <div class="item">
          <div class="item-icon">
            <img src="img/14.jpg" />
          </div>
          <a href="item_detail.html">ハワイアンパラダイス</a><br />
          <span class="price">Ｍ</span>1,380円(税抜)<br />
          <span class="price">Ｌ</span>2,380円(税抜)<br />
        </div>
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

  async created(): Promise<void> {
    await this["$store"].dispatch("getItemList");
    this.itemList = this["$store"].getters.getItemList;
  }
}
</script>
<style></style>
