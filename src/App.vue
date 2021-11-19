<template>
  <div id="app">
    <Header />
    <div class="top-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>
<style scoped></style>
