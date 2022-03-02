<template>
  <div class="wrapper" ref="scrolls">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import betterScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.scroll = new betterScroll(this.$refs.scrolls, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (res) => {
      this.$emit("pullUp", res);
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullUpLoad");
    });
  },
  methods: {
    goto(x, y) {
      this.scroll.scrollTo(x, y, 200);
    },
    refresh() {
      this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.content {
  padding-bottom: 10px;
}
</style>