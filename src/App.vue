<template>
  <div>
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>




<script>
import TabBar from "./components/tabbar/TabBar.vue";

import { ajaxRequest } from "./network/request.js";

export default {
  components: {
    TabBar,
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style  scoped>
body {
  width: 100%;
  overflow: hidden;
}
@import url("./assets/css/base.css");
</style>