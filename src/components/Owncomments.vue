<template>
  <footer style="width: 100%">
    <div class="ownc1">
      <div class="ownc2">
        <div class="ownc3">
          <textarea class="ownc4" placeholder="写下你的评论..." v-model="input"></textarea>
        </div>
        <el-button type="success" size="medium" style="margin-left:10px;" @click="commentssub"> 发布</el-button>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Owncomments",
  data(){
    return{
      input:"",
    }
  },
  methods:{
    commentssub(){
      
    }
  }
};
</script>

<style scoped>
.ownc1 {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(228, 186, 186, 0.05);
  z-index: 100;
}
.ownc2 {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ownc3 {
  display: flex;
  position: relative;
}
.ownc4 {
  display: inline-flex;
  width: 400px;
  height: 36px;
  resize: none;
  margin-left: 550px;
  padding: 8px 18px;
  border-radius: 18px;
  border: none;
  background-color: #f2f2f2;
}
textarea {
  overflow: auto;
  color: rgb(94, 94, 255);
}
</style>