<template>
  <div>
    <div class="top-wrapper">
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
                      >管理者登録はこちら</router-link
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
    //this["$store"].commit("loginUserId", response.data.user.id);
    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      //stateのisLoginをtrueにし、ログイン状態に変更
      this["$store"].state.isLogin = true;
      //パターン1,2どちらかを判定する為、stateのgoOrderを条件分岐させる
      if (this["$store"].state.goOrder === true) {
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
<style></style>
