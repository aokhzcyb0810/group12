<template>
  <div>
    <el-button type="primary" class="buttonC" size="big" @click="clickButton"
      >发送私信</el-button
    >

    <el-dialog title="发送私信" :visible.sync="dialogFormVisible2">
      <el-form :model="send_message">
        <el-form-item label="收件人">
          <el-input
            style="width: 45%; margin-left: 2%"
            v-model="send_message.to"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="私信内容">
          <el-input
            type="textarea"
            style="width: 85%"
            v-model="send_message.text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submitSend">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "SendButton",
  data() {
    return {
      dialogFormVisible2: false,
      send_message: {
        to: "",
        text: "",
      }
    };
  },
  methods: {
    clickButton() {
      this.dialogFormVisible2 = true;
    },
    submitSend() {
      // this.$axios({
      //   //将发送内容返回
      //   method: "post",
      //   url: "/message/send",
      //   data: {
      //     to: this.send_message.to,
      //     text: this.send_message.text,
      //   },
      // }).catch((err) => {
      //   console.log(err);
      // });
      this.userL = JSON.parse(sessionStorage.getItem("userL"));
      console.log(this.userL)
      this.userID = this.userL.id;
      console.log(this.send_message)
      axios
        .post("/message/send?To="+encodeURI(encodeURI(this.send_message.to))+"&text="+encodeURI(encodeURI(this.send_message.text))+"&Uid="+encodeURI(encodeURI(this.userID)))
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible2 = false;
    },
  },
};
</script>

<style scoped>
.buttonC {
  position: absolute;
  right: 100px;
  top: 100px;
}
</style>