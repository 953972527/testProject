<template>
  <div class="control">
    <controlItem
      v-for="(item, index) in list"
      :key="item"
      :index="index"
      @click.native="click(index)"
      :class="{ isRed: curreentIndex == index }"
    >
      {{ item }}
    </controlItem>
  </div>
</template>

<script>
import controlItem from "./controlItem.vue";
export default {
  components: {
    controlItem,
  },
  data() {
    return {
      list: ["流行", "新款", "精选"],
      curreentIndex: 0,
    };
  },
  methods: {
    click(index) {
      this.curreentIndex = index;
      console.log(111);

      this.$emit("changeType", index);
    },
  },
};
</script>

<style scoped>
.control {
  display: flex;
  width: 100%;
  background-color: rgb(223, 223, 223);
  height: 40px;
  line-height: 40px;
}
.isRed {
  color: red;
}
</style>