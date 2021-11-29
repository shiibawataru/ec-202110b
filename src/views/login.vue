<template>
  <div>
    <div class="bg_pattern Boxes"></div>
    <div class="top-wrapper">
      <div class="signIn">Sign in</div>
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">{{ errorMsg }}</div>
            <form class="login-form" action="employeeList.html">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input
                    class="validate"
                    id="mailAddress"
                    type="email"
                    v-model="mailAddress"
                  />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" v-model="password" />
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row login-btn">
                <button class="btn" type="button" v-on:click="login">
                  <span>ログイン</span>
                </button>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <router-link to="/registerAdmin"
                      >会員登録はこちら</router-link
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Login extends Vue {
  //メールアドレス
  private mailAddress = "";
  //パスワード
  private password = "";
  //エラーメッセージ
  private errorMsg = "";

  /**
   * ログイン情報を外部APIに送る.
   */
  async login(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: this.mailAddress,
        password: this.password,
      }
    );
    //入力値エラーチェックし、エラーがあればメッセージを表示させreturn
    if (this.mailAddress === "" || this.password === "") {
      this.errorMsg = "メールまたはパスワードが入力されていません";
      return;
    }
    if (response.data.status === "error") {
      this.errorMsg = "メールまたはパスワードが間違っています";
      return;
    }

    this["$store"].commit("loginUserId", response.data.responseMap.user.id);
    this["$store"].commit("loginUserInfo", response.data.responseMap.user);

    if (response.data.status === "success") {
      //stateのisLoginをtrueにし、ログイン状態に変更
      this.$store.commit("logined");
      //パターン1,2どちらかを判定する為、stateのgoOrderを条件分岐させる
      if (this["$store"].getters.getGoOrderStatus === true) {
        //goOrderがtrue(パターン1)なので注文確認画面に遷移
        this["$router"].push("/orderConfirm");
      } else {
        //goOrderがfalse(パターン2)なので商品一覧に遷移
        this["$router"].push("/itemList");
      }
    } else {
      //ログインに失敗した場合、エラーメッセージを表示
      this.errorMsg = response.data.message;
    }
  }
}
</script>
<style scoped>
.signIn {
  text-align: center;
  padding-bottom: 10px;
  color: navy;
  font-weight: bolder;
  font-size: 45px;
}
.top-wrapper {
  padding-top: 10px;
}

.bg_pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #ffe9a7;
  opacity: 0.4;
  z-index: -1;
}
.Boxes {
  background-image: linear-gradient(#ffc107 2px, transparent 2px),
    linear-gradient(to right, #ffc107 2px, #ffe9a7 2px);
  background-size: 40px 40px;
}
</style>
