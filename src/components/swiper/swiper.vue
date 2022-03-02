<template>
  <div>
    <div id="swiperContent">
      <ul :style="moveForword">
        <li
          v-for="(item, index) in imageUrl"
          :key="index"
          @touchstart="stopMove"
          @touchmove="touchmove"
          @touchend="touchend"
        >
          <swiperItem class="swiper_images">
            <template v-slot:images>
              <a :href="imageLink[index]">
                <img
                  :src="imageUrl[index]"
                  alt=""
                  class="swiper_images"
                  @load="swiperload"
                />
              </a>
            </template>
          </swiperItem>
        </li>
      </ul>
      <ul id="swiperchoose" :style="pointLeft">
        <li
          v-for="(item, index) in getImagedata"
          :key="index"
          class="choose"
          :style="isRed(index)"
          @click="click(index)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<script>
import swiperItem from "./swiperItem.vue";
export default {
  components: {
    swiperItem,
  },
  props: {
    swiperData: {
      type: Array,
    },
  },
  data() {
    return {
      imageUrl: [],
      getImagedata: [],
      imageLink: [],
      speed: 30,
      startPostion: -390,
      moveTimer: null,
      loop: true,
      waitTimer: null,
      startX: 0,
      startXwithPosition: 0,
      moveX: 0,
      waitTime: 2000,
      currentIndex: 0,
    };
  },
  computed: {
    moveForword() {
      if (
        Math.abs(this.startPostion) % 390 == 0 &&
        this.startPostion != -390 &&
        this.loop
      ) {
        if (Math.abs(this.startPostion) / 390 == this.imageUrl.length - 1) {
          this.startPostion = -390;
        }
        this.currentIndex = Math.abs(this.startPostion) / 390 - 1;
        clearInterval(this.moveTimer);
        this.moveTimer = null;
        this.loop = false;
        this.waitTimer = setTimeout(() => {
          this.moveTimer = setInterval(() => {
            this.loop = true;
            this.startPostion = this.startPostion - this.speed;
          }, 20);
        }, this.waitTime);
      }
      return {
        width: this.imageUrl.length * 390 + "px",
        left: this.startPostion + "px",
      };
    },
    isRed() {
      return function (index) {
        if (this.currentIndex == index) {
          return {
            backgroundColor: "red",
          };
        }
      };
    },
    pointLeft() {
      return {
        left: (390 - this.getImagedata.length * 20) / 2 + "px",
      };
    },
  },
  watch: {
    swiperData() {
      for (var item of this.swiperData) {
        this.getImagedata.push(item.image);
        this.imageLink.push(item.link);
      }
      var arry = [];
      for (var i = 0; i < this.getImagedata.length; i++) {
        arry.push(this.getImagedata[i]);
      }
      arry.push(this.getImagedata[0]);
      arry.unshift(this.getImagedata[this.getImagedata.length - 1]);
      this.imageUrl = arry;
      this.waitTimer = setTimeout(() => {
        this.moveTimer = setInterval(() => {
          this.startPostion = this.startPostion - this.speed;
        }, 20);
      }, this.waitTime);
    },
  },
  mounted() {},
  methods: {
    stopMove(e) {
      clearInterval(this.moveTimer);
      this.moveTimer = null;
      clearTimeout(this.waitTimer);
      this.waitTimer = null;
      this.startXwithPosition = -this.startPostion + e.changedTouches[0].pageX;
      this.startX = e.changedTouches[0].pageX;
    },
    touchmove(e) {
      this.endX = e.changedTouches[0].pageX;
      this.startPostion = this.endX - this.startXwithPosition;
      this.moveX = this.endX - this.startX;
    },
    touchend() {
      if (this.moveX > 130) {
        this.startPostion = Math.ceil(this.startPostion / 390) * 390;
      } else if (this.moveX > 0 && this.moveX < 130) {
        this.startPostion = Math.floor(this.startPostion / 390) * 390;
      } else if (this.moveX > -130 && this.moveX < 0) {
        this.startPostion = Math.ceil(this.startPostion / 390) * 390;
      } else {
        this.startPostion = Math.floor(this.startPostion / 390) * 390;
      }
      if (this.startPostion == 0) {
        this.startPostion = -(this.imageUrl.length - 2) * 390;
      }
      if (this.startPostion == -390) {
        this.currentIndex = Math.abs(this.startPostion) / 390 - 1;
        this.waitTimer = setTimeout(() => {
          this.moveTimer = setInterval(() => {
            this.startPostion = this.startPostion - this.speed;
          }, 20);
        }, this.waitTime);
      }
      this.loop = true;
    },
    click(index) {
      clearInterval(this.moveTimer);
      this.moveTimer = null;
      clearTimeout(this.waitTimer);
      this.waitTimer = null;
      this.currentIndex = index;
      this.startPostion = (this.currentIndex + 1) * -390;
      if (this.startPostion == -390) {
        this.currentIndex = Math.abs(this.startPostion) / 390 - 1;
        this.waitTimer = setTimeout(() => {
          this.moveTimer = setInterval(() => {
            this.startPostion = this.startPostion - this.speed;
          }, 20);
        }, this.waitTime);
      }
      this.loop = true;
    },
    swiperload() {
      this.$emit("swiperload");
    },
  },
};
</script>

<style scoped>
#swiperContent {
  width: 390px;
  height: 210px;
  overflow: hidden;
  position: relative;
}
ul {
  height: 210px;
  position: absolute;
}
ul li {
  height: 210px;
  float: left;
}
.swiper_images {
  width: 390px;
}
.choose {
  background-color: white;
  height: 10px;
  width: 10px;
  border-radius: 5px;
  margin-left: 10px;
}
#swiperchoose {
  position: absolute;
  bottom: 0px;
  height: 20px;
}
</style>