<template>
  <div class="all">
    <div class="container">
      <div class="message">
        <!-- アニメーション -->
        <div class="box"><img src="/img_toy/santa.png" class="santa" /></div>
        <p>
          <a class="link" target="_blank" rel="noopener"></a>
        </p>
        <!-- アニメーション -->
        <div class="color">
          <h1 class="page-title">注文が完了しました！</h1>
          <div class="order-finished-thanks-message">
            <p>この度はご注文ありがとうございます。</p>
            <p>
              お支払い先は、お送りしたメールに記載してありますのでご確認ください。
            </p>
            <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
          </div>
        </div>
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
<style scoped>
.box {
  width: 100px;
  height: 100px;
  animation: anim 3s forwards;
}

.color {
  background-color: rgba(255, 255, 255, 0.445);
  padding: 30px;
  border-radius: 30px;
}

.santa {
  width: 200px;
}

.home {
  margin-left: 1000px;
  font-size: 100px;
  color: rgb(255, 108, 108);
}

.all {
  width: 100%;
  height: 800px;
  background: black url("/img_toy/snow.jpg") center top/cover no-repeat;
  margin-top: -200px;
}

.message {
  padding-top: 200px;
}

.btn {
  margin-top: 20px;
}

@keyframes anim {
  0% {
    transform: translateX(0px);
  }

  80% {
    transform: translateX(2000px);
  }

  100% {
    transform: translateX(800px);
  }
}
</style>
