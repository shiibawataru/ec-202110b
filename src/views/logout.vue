<template>
  <div>ログアウト中・・・</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Logout extends Vue {
  /**
   * ログアウトする.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しログアウトをするためasync/await axiosを利用しています。これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async created(): Promise<void> {
    // ログインしていなければログイン画面へ遷移
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
      return;
    }
    await axios.post("http://153.127.48.168:8080/ecsite-api/user/logout");
    // ログアウト状態にする(stateのisLoginをfalseにする)
    this.$store.commit("logouted");
    // ログイン画面に遷移する
    this.$router.push("/login");
  }
}
</script>

<style></style>
