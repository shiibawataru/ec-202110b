<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left">
          <a href="top.html">
            <img class="logo" src="img/header_logo.png" />
          </a>
        </div>

        <div class="header-right">
          <a href="item_list.html">商品一覧</a>
          <a href="register_admin.html">会員登録</a>
          <a href="#"><i class="fas fa-shopping-cart"></i>カート</a>
          <a href="login.html" class="login">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </a>

          <a href="order_history.html">注文履歴</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {}
</script>

<style></style>
