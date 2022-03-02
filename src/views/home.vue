<template>
  <div>
    <navigator bgcolor="pink">
      <template v-slot:center> 购物车 </template>
    </navigator>
    <scroll
      class="scroll"
      ref="scroll"
      :probeType="3"
      @pullUp="pullUp"
      @pullUpLoad="pullUpLoad"
    >
      <swiper :swiperData="this.banner" @swiperload="swiperload"></swiper>
      <recommed :recommed="recommed"></recommed>
      <div style="width: 100%">
        <img src="../images/swiper/1.jpg" alt="" style="width: 100%" />
      </div>
      <tabbarControl
        @changeType="changeType"
        class="normal"
        :style="fixed"
        ref="tabbarcontrol"
      ></tabbarControl>
      <goods :listdata="homeData[currentIndex].data"></goods>
    </scroll>
    <backTop @click.native="backTop" v-show="isShow"></backTop>
  </div>
</template>

<script>
import swiper from "../components/swiper/swiper.vue";
import navigator from "../components/navigator/navigator.vue";
import { ajaxRequest } from "../network/request.js";
import recommed from "../components/recommed/recommed.vue";
import tabbarControl from "../components/tabberControl/control.vue";
import goods from "../components/goods/goods.vue";
import scroll from "../components/scroll/scroll.vue";
import backTop from "../components/backTop/backTop.vue";

import Mock from "mockjs";

export default {
  components: {
    swiper,
    navigator,
    recommed,
    tabbarControl,
    goods,
    scroll,
    backTop,
  },
  data() {
    return {
      banner: [],
      recommed: [],
      homeData: {
        pop: {
          page: 0,
          data: [],
        },
        new: {
          page: 0,
          data: [],
        },
        fresh: {
          page: 0,
          data: [],
        },
      },
      currentIndex: "pop",
      isShow: false,
      isFixed: false,
      scrollHeight: 0,
      tabcontrolTop: 0,
    };
  },
  created() {
    ajaxRequest({
      url: "/home/multidata",
    }).then((res) => {
      for (var item of res.data.data.banner.list) {
        this.banner.push(item);
      }
      for (var item of res.data.data.recommend.list) {
        this.recommed.push(item);
      }
    });

    this.updateData();
  },
  methods: {
    changeType(e) {
      var index = e;

      if (index == 0) {
        this.currentIndex = "pop";
      } else if (index == 1) {
        this.currentIndex = "new";
      } else if (index == 2) {
        this.currentIndex = "fresh";
      }
      this.updateData();
    },
    backTop() {
      this.$refs.scroll.goto(0, 0);
    },
    pullUp(e) {
      this.scrollHeight = Math.abs(e.y);
      if (Math.abs(e.y) > this.tabcontrolTop) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
      if (Math.abs(e.y) > 1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    pullUpLoad() {
      this.homeData[this.currentIndex].page++;
      this.updateData();
      this.$refs.scroll.scroll.finishPullUp();
    },
    updateData() {
      var url = "http://123.207.32.32:8000/home/" + this.currentIndex;
      var page = (this.homeData[this.currentIndex].page + 1) * 30;
      var text = "pop";
      var color = "green";
      if (this.currentIndex == "new") {
        text = "new";
        color = "blue";
      } else if (this.currentIndex == "fresh") {
        text = "fresh";
        color = "red";
      }
      const option = {};
      option["list|" + page] = [
        {
          "id|+1": 1,
          image: Mock.Random.image("180x200", color, "#FFF", text),
        },
      ];
      Mock.mock(url, option);

      var requestUrl = "/home/" + this.currentIndex;
      ajaxRequest({
        url: requestUrl,
      }).then((res) => {
        this.homeData[this.currentIndex].data = res.data.list;
      });
    },
    swiperload() {
      this.tabcontrolTop = this.$refs.tabbarcontrol.$el.offsetTop - 44;
      console.log(this.tabcontrolTop);
    },
  },
  watch: {
    "$store.state.isFinishLoadImg"(n) {
      if (n == true) {
        this.$refs.scroll.refresh();
        this.$store.commit("changeState", false);
      }
    },
  },
  mounted() {
    this.$bus.$on("imgHaveLoad", () => {
      console.log(1);
      this.$refs.scroll.refresh();
    });
  },
  computed: {
    fixed() {
      if (this.isFixed) {
        return {
          position: "relative",
          top: this.scrollHeight - this.tabcontrolTop + "px",
          left: "0px",
        };
      }
    },
  },
};
</script>

<style scoped>
.scroll {
  height: 758px;
  overflow: hidden;
}
.normal {
  position: relative;
  top: 0;
  left: 0;
}
</style>