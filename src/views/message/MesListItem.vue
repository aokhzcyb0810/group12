<template>
  <div>
    <el-card class="box-card1">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">from:  {{ mesItem.name }}</span>
        <img
          class="messreadimg"
          src="@/assets/消息已读.svg"
          v-show="this.isRead"
        />
        <img
          class="messreadimg"
          src="@/assets/消息未读.svg"
          v-show="!this.isRead"
        />
        <img class="messmallimg" src="@/assets/删除.svg" @click="deleteMes" />
      </div>
      <div style="margin-bottom: 100px" @click="itemClick" display="false">
        <div class="mes-text">
          {{ mesItem.text }}
        </div>
        <div class="mes-time">
          {{ mesItem.time }}
        </div>
      </div>
    </el-card>
    <el-dialog title="回复私信" :visible.sync="dialogFormVisible2">
      <el-form :model="send_message">
        <el-form-item label="收件人">
          <p style="font-size:20px position:abosolute left:10px">
            {{ mesItem.name }}
          </p>
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
import axios from "axios";

export default {
  name: "MesListItem",
  data() {
    return {
      isRead: false,
      dialogFormVisible2: false,
      send_message: {
        to: "",
        text: "",
      },
    };
  },
  inject: ["reload"],
  props: {
    currentIndex: {
      type: Number,
      default: 1,
    },
    mesItem: {
      type: Object,
      default() {
        return {};
      },
    },
    //当前用户id
    userID: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    submitSend() {
      console.log(this.send_message);
      let data = {
        user: this.userID,
        from: this.mesItem.Uid,
        text: this.send_message.text,
      };
      console.log(data);
      axios
        .post("/message/response", data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisible2 = false;
    },
    setRead() {
      axios
        .post("/message/read?Mid=" + this.mesItem.Mid)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      if (this.mesItem.read == 0) this.isRead = false;
      else this.isRead = true;
    },
    itemClick() {
      // 将是否已读设置为已读
      // this.sendMessage();
      this.setRead();
      this.isRead = true;
      console.log(this.mesItem);
      if (this.currentIndex == 1 || this.currentIndex == 3) {
        this.$alert(this.mesItem.text, "消息内容", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `action: ${action}`,
            });
          },
        });
      }
      if (this.currentIndex == 2) {
        // 回复私信
        this.dialogFormVisible2 = true;
      }
      setTimeout(() => {
        this.reload();
      }, 300);
    },

    deleteMes() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", null, "此操作将删除该消息, 是否继续?"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              console.log(this.mesItem);
              console.log(this.currentIndex);
              if (this.currentIndex == 2 || this.currentIndex == 1) {
                axios
                  // "/message/read?Mid=" + this.mesItem.Mid
                  .post("/message/delete1?Mid=" + this.mesItem.Mid)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              if (this.currentIndex == 3) {
                axios
                  .post("/message/delete2?Mid=" + this.mesItem.Mid)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
                history.go(0)
              }, 300);
            }, 1000);
          } else {
            done();
          }
        },
      })
        .then((action) => {
          this.reload();
          this.$message({
            type: "info",
            message: "已成功删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created: function () {
    if (this.mesItem.read == 0) this.isRead = false;
    else this.isRead = true;
  },
};
</script>

<style scoped>
.box-card1 {
  width: 95%;
  /* margin-left: 5%; */
  margin-top: 5px;
}

.mesimg {
  width: 50px;
  padding: 10px;
}
.messreadimg {
  position: absolute;
  right: 150px;
  width: 35px;
  padding-top: 0px;
  padding-right: 0px;
}

.messmallimg {
  position: absolute;
  right: 100px;
  width: 35px;
  padding-top: 0px;
  padding-right: 0px;
}

.mes-text {
  font-size: 16px;
  position: absolute;
  left: 12%;
  padding-left: 100px;
  padding-top: 10px;
  padding-top: 10px;
  padding-right: 20px;
  text-align: left;
}

.mes-time {
  font-size: 16px;
  position: absolute;
  right: 100px;
  padding-left: 0;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-right: 20px;
  overflow: hidden;
  text-align: left;
}
</style>
