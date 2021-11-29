<template>
  <div class="main">
    <div class="top-wrapper">
      <div class="container">
        <div class="xmasCount">
          <h3>クリスマスまであと</h3>
          <flip-countdown deadline="2021-12-25 00:00:00"> </flip-countdown>
        </div>
        <h1>You’ve got a friend in me.</h1>
        <p>おうちにいながら話題のおもちゃをあなたにお届け！</p>
        <p>ラクラクトイは、自宅から新着商品が簡単に手に入るECサイトです。</p>
        <div class="btn-wrapper">
          <router-link to="/registerAdmin" class="btn signup"
            >会員登録</router-link
          >
        </div>
      </div>
    </div>

    <div class="top-item-wrapper">
      <div class="container">
        <div class="heading">
          <h2>ラクラクトイ、３つの特徴！</h2>
        </div>
        <div class="top-items">
          <div class="top-item">
            <div class="top-item-icon">
              <img src="/img_toy/delivery.jpg" />
            </div>
            <p class="text-contents">
              ラクラクトイはお客様の自宅まで責任を持ってお届けします。12時までに注文していただくと追加料金なしで翌日にお届け！お得な配達サービスぜひご利用ください。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="/img_toy/present.jpeg" />
            </div>
            <p class="text-contents">
              クリスマスや誕生日にぴったりなラッピングもラクラクトイにお任せください！シックなものからゴージャスなものまで、お好きなものをお選びいただけます。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="/img_toy/toy.jpeg" />
            </div>
            <p class="text-contents">
              品揃えには自信があります！話題の新作ゲームから、小さなお子様も楽しめるおもちゃまで、種類が豊富にございます。
              お子様へのプレゼントや自分へのご褒美にぜひお買い求めください。
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="message-wrapper">
      <div class="container">
        <div class="heading">
          <h2>遊びの楽しさを学ぼう！</h2>
        </div>
      </div>
      <div class="loop_wrap">
        <img src="img_toy/slideimg.jpg" /><img src="img_toy/slideimg.jpg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FlipCountdown from "vue2-flip-countdown";

@Component({
  components: {
    FlipCountdown,
  },
})
export default class Top extends Vue {}
</script>

<style scoped>
.xmasCount {
  text-align: center;
  color: white;
}
h3 {
  font-weight: bolder;
}

/* ========================================
    top-wrapperの設定
   ======================================== */
.top-wrapper {
  padding: 150px 0 200px 0; /* 上はヘッダが来るのでその分180px分空ける */
  background-image: url(/img_toy/toy_xmas.jpg); /* 背景画像設定 */
  background-size: cover; /*画像の縦横比を崩すことなく、画像ができるだけ大きくなるよう拡大縮小*/
  color: white;
  text-align: center;
  height: 800px;
}

.top-wrapper h1 {
  opacity: 0.9; /* 文字の透明度を指定 */
  font-size: 60px;
  letter-spacing: 5px; /* 文字の間隔を設定 */
}

.top-wrapper p {
  opacity: 0.7; /* 文字の透明度を指定 */
  font-size: 20px;
}

.btn-wrapper {
  text-align: center; /* ボタン群の配置を真ん中揃えにする */
  margin: 20px 0;
}

.btn-wrapper p {
  margin: 10px 0;
}

.signup {
  background-color: #239b76;
}

.facebook {
  background-color: #3b5998;
  margin-right: 10px;
}

.twitter {
  background-color: #55acee;
}

.btn {
  display: inline-block; /*ボタンはa要素(インライン要素)のため widhやheightは指定できない。またmarginやpaddingは横のみしか指定できない。今回padding指定したいためにインラインブロック要素に変更する */
  /* padding: 8px 24px; 上記でインラインブロック要素に下ので上下のpaddingが設定できる */
  color: white;
  opacity: 0.8; /* 透明度の設定 */
  border-radius: 4px; /* ボタンの角を丸くする */
  text-align: center; /* ボタン名を中央揃えに */
}

.btn:hover {
  opacity: 1; /* マウスを乗せた時は透明度をなくす 1:不透明 */
}

/* fontawesome(facebook＆twitterアイコンの設定) */
.fab {
  margin-right: 10px;
}

/* ========================================
    top-item-wrapperの設定
   ======================================== */

.top-item-wrapper {
  padding-bottom: 80px;
  padding-left: 5%;
  padding-right: 5%;
  background-color: #f7f7f7;
  text-align: center;
  /* width: 600px; */
}

.top-items {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
/* .item {
  float: left;
  width: 25%;
}

.clear {
  clear: left;
} */

.top-item {
  margin: 30px;
  width: 25%;
}
.top-item-icon {
  position: relative; /* p要素を重ねるための指定(absoluteと組み合わせて使う) */
}

.top-item-icon p {
  position: absolute; /* item-iconからpを位置指定するための指定 */
  top: 35%;
  width: 100%;
  color: red;
}

.top-item-icon img {
  border-radius: 30px; /* 画像を角丸にする */
  width: 200px;
  height: 200px;
}

/* ========================================
    message-wrapperの設定
   ======================================== */
.message-wrapper {
  border-bottom: 1px solid #eee;
  padding-bottom: 80px;
  text-align: center;
}

.message {
  padding: 15px 40px;
  background-color: #5dca88;
  cursor: pointer; /* a要素のようにマウスの乗せるとa要素のようにポインタが変わる */
  box-shadow: 1px 5px #1a7940; /* ボタンに影をつける 右1px 下5px */
}

/* メッセージクリック時の挙動の設定 */
.message:active {
  position: relative; /* messageクラスから位置を指定したいため(これがないとページの左上からの位置指定になりうまくボタンが動かない) */
  top: 5px; /* ボタンを本来の位置よりも5px分下にずらす(上を5px空ける) */
  left: 1px; /* ボタンを本来の位置よりも1px分右にずらす(左を1px空ける) */
  box-shadow: none; /* 影をなくす(これがないと影ごと右下に動く) */
}

/* ========================================
    無限スライドショーの設定
   ======================================== */

.loop_wrap {
  display: flex;
  width: 100vw;
  height: 300px;
  overflow: hidden;
}

.loop_wrap img {
  width: auto;
  height: 100%;
}

@keyframes loop {
  0% {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes loop2 {
  0% {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200%);
  }
}
.loop_wrap img:first-child {
  animation: loop 80s -40s linear infinite;
}

.loop_wrap img:last-child {
  animation: loop2 80s linear infinite;
}
</style>
