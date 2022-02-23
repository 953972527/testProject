<template>
  <div>
    <router-view></router-view>
    <tab-bar>
      <tab-bar-item
        v-for="(item, index) in tabBarData"
        :key="index"
        :curIndex="index"
        :path="item.path"
      >
        <template v-slot:slot-image-active>
          <img :src="item.pictureActive" alt="" />
        </template>
        <template v-slot:slot-image-unactive>
          <img :src="item.pictureUnActive" alt="" />
        </template>
        <template v-slot:slot-name>
          {{ item.name }}
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>




<script>
import TabBar from "./components/tabbar/TabBar.vue";
import TabBarItem from "./components/tabbar/TabBarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {
      tabBarData: [
        {
          name: "首页",
          pictureUnActive: require("./images/tabbar/首页.png"),
          pictureActive: require("./images/tabbar/首页a.png"),
          path: "/home",
        },
        {
          name: "分类",
          pictureUnActive: require("./images/tabbar/分类.png"),
          pictureActive: require("./images/tabbar/分类a.png"),
          path: "/category",
        },
        {
          name: "购物车",
          pictureUnActive: require("./images/tabbar/购物车空.png"),
          pictureActive: require("./images/tabbar/购物车空a.png"),
          path: "/car",
        },
        {
          name: "我的",
          pictureUnActive: require("./images/tabbar/我的.png"),
          pictureActive: require("./images/tabbar/我的a.png"),
          path: "/profile",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>