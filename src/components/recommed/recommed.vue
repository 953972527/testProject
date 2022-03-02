<template>
  <div class="recommed">
    <div v-for="(item, index) in recommed" :key="index" class="recommedItem">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommed: {
      type: Array,
    },
  },
};
</script>

<style  scoped>
.recommed {
  display: flex;
  margin-top: 10px;
  padding-bottom: 20px;
  border-bottom: 10px solid rgb(202, 202, 202);
}
.recommedItem {
  flex: 1;
  text-align: center;
}
.recommedItem img {
  width: 60px;
}
</style>