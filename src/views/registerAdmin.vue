<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="row register-page">
          <div class="error">エラーメッセージ</div>
          <div class="row">
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                required
                v-model="lastName"
              />
              <label for="last_name">姓</label>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                required
                v-model="firstName"
              />
              <label for="first_name">名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                required
                v-model="mailAddress"
              />
              <label for="email">メールアドレス</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="zipcode" type="text" maxlength="7" v-model="zipCode" />
              <label for="zipcode">郵便番号(ハイフンなし)</label>
              <button class="btn" type="button">
                <span>住所検索</span>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="address" type="text" v-model="address" />
              <label for="address">住所</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="tel" type="tel" v-model="phoneNumber" />
              <label for="tel">電話番号</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                minlength="8"
                required
                v-model="password"
              />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="confirmation_password"
                type="password"
                class="validate"
                minlength="8"
                required
                v-model="checkPassword"
              />
              <label for="confirmation_password">確認用パスワード</label>
            </div>
          </div>
          <div class="row register-admin-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='login.html'"
            >
              <span>登録<i class="material-icons right">done</i></span>
            </button>
            <button type="button" v-on:click="clear">クリア</button>
          </div>
        </div>
      </div>
      <!-- end container-->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RegisterAdmin extends Vue {
  //姓
  private lastName = "";
  //名
  private firstName = "";
  //名前のエラーメッセージ
  private errorOfName = "";
  //メールアドレス
  private mailAddress = "";
  //メールのエラーメッセージ
  private errorOfMailAddress = "";
  //住所
  private address = "";
  //住所のエラーメッセージ
  private errorOfAddress = "";
  //電話番号
  private phoneNumber = "";
  //電話番号のエラーメッセージ
  private errorOfPhone = "";
  //パスワード
  private password = "";
  //パスワードのエラーメッセージ
  private errorOfPassword = "";
  //確認用パスワード
  private checkPassword = "";
  //確認用パスのエラーメッセージ
  private errorOfCheckPassword = "";
  //郵便番号
  private zipCode = "";
  //郵便番号のエラーメッセージ
  private errorOfZipCode = "";
  //エラーチェック
  private hasErrors = false;

  /**
   * 登録したいユーザー情報を外部APIに送る.
   */
  async registerAdmin(): Promise<void> {}

  /**
   * エラーチェック処理.
   *
   * @returns エラーがある:true / エラーがない:false
   */
  // errorCheck():string{
  //   this.errorOfName = "";
  //   this.errorOfMailAddress = "";
  //   this.errorOfPassword = "";

  //   if (this.lastName === "" || this.firstName === "") {
  //     this.errorOfName = "姓または名が入力されていません";
  //     this.hasErrors = true;
  //   }
  //   if (this.mailAddress === "") {
  //     this.errorOfMailAddress = "メールアドレスが入力されていません";
  //     this.hasErrors = true;
  //   }
  //   if (this.password === "") {
  //     this.errorOfPassword = "パスワードが入力されていません";
  //     this.hasErrors = true;
  //   } else if (this.password !== this.checkPassword) {
  //     // パスワード一致チェック
  //     this.errorOfPassword = "パスワードが不一致です";
  //     this.hasErrors = true;
  //   }

  //   return hasError;
  // }
  //}

  /**
   * 入力した情報をリセットする.
   */
  clear(): void {
    this.lastName = "";
    this.firstName = "";
    this.errorOfName = "";
    this.mailAddress = "";
    this.errorOfMailAddress = "";
    this.address = "";
    this.errorOfAddress = "";
    this.phoneNumber = "";
    this.errorOfPhone = "";
    this.password = "";
    this.errorOfPassword = "";
    this.checkPassword = "";
    this.errorOfCheckPassword = "";
    this.zipCode = "";
    this.errorOfZipCode = "";
    console.log("clear実行された");
  }
}
</script>
<style></style>
