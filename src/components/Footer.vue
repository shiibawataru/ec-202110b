<template>
  <footer>
    <div class="container">
      <img src="/img_toy/header_logo.png" />
      <p>話題のおもちゃが続々登場！</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Footer extends Vue {}
</script>

<style scoped>
footer img {
  width: 125px;
}

footer p {
  color: #b3aeb5;
  font-size: 12px;
}

footer {
  padding-top: 30px;
  padding-bottom: 20px;
}
</style>
