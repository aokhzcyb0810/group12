<template>
  <footer style="width: 100%">
    <div class="ownc1">
      <div class="ownc2">
        <div class="ownc3">
          <textarea class="ownc4" placeholder="写下你的评论..."></textarea>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Owncomments",
};
</script>

<style scoped>
.ownc1 {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
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
  margin-right: 16px;
  padding: 8px 18px;
  border-radius: 18px;
  border: none;
  background-color: #f2f2f2;
}
textarea {
  overflow: auto;
}
</style>