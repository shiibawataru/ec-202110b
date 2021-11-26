<template>
  <div class="main">
    <h1>お探しのページが見つかりません。</h1>
    <div>
      <pre>
      URLが間違っているか、ページが削除された可能性があります。
      商品一覧を利用して、引き続きラクラクトイのウェブサイトをお楽しみください。
      </pre>
    </div>
    <div>
      <button type="button" v-on:click="noPage" class="btn">
        トップページ
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class NotFound extends Vue {
  /**
   * トップページへ戻る.
   */
  noPage(): void {
    this["$router"].push("/");
  }
}
</script>

<style scoped>
.main {
  text-align: center;
  background-image: url(/img_toy/peace.JPG); /* 背景画像設定 */
  background-size: cover;
  height: 800px;
  padding: 200px 0 200px 0;
  color: white;
}
</style>
