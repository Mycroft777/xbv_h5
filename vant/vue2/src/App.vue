<template>
  <div id="app">
    <Loading v-show="LOADING"></Loading>
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "@/view/components/loading.vue";
export default {
  computed: {
    ...mapState(["LOADING"]),
  },
  name: "App",
  components: { Loading },
};
</script>
<style>
body {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}
</style>
