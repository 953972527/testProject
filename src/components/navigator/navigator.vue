<template>
  <div id="navigator" :style="color">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgcolor: String,
  },
  computed: {
    color() {
      return {
        backgroundColor: this.bgcolor,
      };
    },
  },
};
</script>

<style  scoped>
#navigator {
  height: 44px;
  width: 100%;
  display: flex;
}
.left {
  width: 60px;
}
.right {
  width: 60px;
}
.center {
  flex: 1;
  text-align: center;
  line-height: 44px;
}
</style>