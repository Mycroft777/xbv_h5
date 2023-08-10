<template>
  <div id="app">
    <div class="head">仙桃数据谷</div>
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
.head {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  background-color: #f0f0f0;
  margin-bottom: 10px;
}
</style>
