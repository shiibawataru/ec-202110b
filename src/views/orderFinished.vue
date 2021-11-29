<template>
  <div>
    <div class="container">
      <h1 class="page-title">注文が完了しました！</h1>
      <div class="order-finished-thanks-message">
        <p>この度はご注文ありがとうございます。</p>
        <p>
          お支払い先は、お送りしたメールに記載してありますのでご確認ください。
        </p>
        <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      </div>
      <div class="row order-finished-btn">
        <button class="btn" type="button" v-on:click="goTopPage()">
          <span>商品一覧に戻る</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
/**
 * 注文完了後画面
 */
export default class OrderFinished extends Vue {
  // 始め

  created(): void {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
  }

  /**
   * 商品一覧に飛ぶ.
   */
  goTopPage(): void {
    this.$router.push("/itemList");
  }
  // 終わり
}
</script>
<style></style>
