<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">エラーメッセージ</div>
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
                <button
                  class="btn"
                  type="button"
                  onclick="location.href='item_list.html'"
                >
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
  private mailAddress = "";
  private password = "";

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
  }

  //   //async loginAdmin(): Promise<void> {
  //     const responce = await axios.post(
  //       "http://35.86.97.127:8080/ex-emp-api/login",
  //       {
  //         mailAddress: this.mailAddress,
  //         password: this.password,
  //       }
  //     );
  //     if (responce.data.status === "success") {
  //       this["$router"].push("/employeeList");
  //     } else {
  //       this.errorMessage = responce.data.message;
  //     }
  //   }
}
</script>
<style></style>
