<template>
  <div class="tabbaritem" @click="isClick">
    <div v-if="isAcitve">
      <slot name="slot-image-active"></slot>
    </div>
    <div v-else>
      <slot name="slot-image-unactive"></slot>
    </div>
    <div :class="{ isRed: isAcitve }">
      <slot name="slot-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    curIndex: {},
    path: {},
  },
  methods: {
    isClick() {
      this.$router.push(this.path);
    },
  },
  computed: {
    isAcitve() {
      return this.path == this.$route.path;
    },
  },
};
</script>

<style scoped>
.isRed {
  color: red;
}
.tabbaritem {
  flex: 1;
  text-align: center;
}
.tabbaritem img {
  width: 26px;
}
</style>