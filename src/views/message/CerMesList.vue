<template>
  <div class="docs">
    <cer-mes-list-item v-for="item in mess" :mes-item="item" :key="item.Mid" :userID="userID" :currentIndex="currentIndex"></cer-mes-list-item>
  </div>
</template>

<script>
import CerMesListItem from "./CerMesListItem";

export default {
  name: "CerMesList",
  components: {
    CerMesListItem,
  },
  props: {
    currentIndex:{
      type: Number,
      default: 1,
    },
    //消息数组
    mess: {
      type: Array,
      default() {
        return [];
      },
    },
    //当前用户id
    userID: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.docs {
  padding: 5px;
}
</style>
