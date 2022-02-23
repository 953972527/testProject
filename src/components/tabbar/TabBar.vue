<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#tab-bar {
  width: 100%;
  height: 49px;
  background-color: gray;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>