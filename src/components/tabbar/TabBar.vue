<template>
  <div id="tab-bar">
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
  </div>
</template>

<script>
import TabBarItem from "./TabBarItem.vue";

export default {
  components: {
    TabBarItem,
  },
  data() {
    return {
      tabBarData: [
        {
          name: "首页",
          pictureUnActive: require("../../images/tabbar/首页.png"),
          pictureActive: require("../../images/tabbar/首页a.png"),
          path: "/home",
        },
        {
          name: "分类",
          pictureUnActive: require("../../images/tabbar/分类.png"),
          pictureActive: require("../../images/tabbar/分类a.png"),
          path: "/category",
        },
        {
          name: "购物车",
          pictureUnActive: require("../../images/tabbar/购物车空.png"),
          pictureActive: require("../../images/tabbar/购物车空a.png"),
          path: "/car",
        },
        {
          name: "我的",
          pictureUnActive: require("../../images/tabbar/我的.png"),
          pictureActive: require("../../images/tabbar/我的a.png"),
          path: "/profile",
        },
      ],
    };
  },
};
</script>

<style scoped>
#tab-bar {
  width: 390px;
  height: 49px;
  background-color: gray;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>