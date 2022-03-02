<template>
  <div id="goods">
    <goodsItem v-for="(item, index) in listdata" :key="index">
      <img :src="item.image" alt="" @load="imgHaveLoad" />
      <div class="describe">{{ item.id }}</div>
    </goodsItem>
  </div>
</template>

<script>
import goodsItem from "./goodsItem.vue";
export default {
  components: {
    goodsItem,
  },
  props: {
    listdata: {
      type: Array,
    },
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    imgHaveLoad() {
      if (this.timer != null) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.$bus.$emit("imgHaveLoad");
      }, 200);
    },
  },
};
</script>

<style  scoped>
#goods {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.describe {
  text-align: center;
}
</style>