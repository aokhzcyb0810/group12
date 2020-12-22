<template>
  <div>
    <el-card class="box-card1">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">{{ mesItem.name }}</span>
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
      <div style="margin-bottom: 100px" @click="itemClick">
        <div class="mes-text">
          {{ mesItem.text }}
        </div>
        <div class="mes-time">
          {{ mesItem.time }}
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MesListItem",
  data() {
    return {
      isRead: false,
    };
  },
  inject: ['reload'],
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
    setRead() {
      axios
        .post("/message/read?Mid=" + this.mesItem.Mid)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemClick() {
      // 将是否已读设置为已读
      // this.sendMessage();
      this.setRead();
      this.$alert(this.mesItem.text, "消息内容", {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
      this.reload()
      console.log(this.mesItem)

      if (this.currentIndex == 4) {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [h("span", null, "是否要同意申请?")]),
          showCancelButton: true,
          confirmButtonText: "同意",
          cancelButtonText: "拒绝",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                // 同意申请
                axios
                  .post("/apply/accept?id="+this.mesItem)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
                this.reload();
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                  this.reload();
                }, 300);
              }, 1000);
            } else {
              done();
            }
          },
        })
          .then((action) => {
            this.$message({
              type: "info",
              message: "已同意申请",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已拒绝申请",
            });
          });
      }
    },
    setRead() {
      console.log(this.mesItem);
      axios
        .post("/message/read?Mid=" + this.mesItem.Mid)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
              this.reload();
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
                this.reload();
              }, 300);
            }, 1000);
          } else {
            done();
          }
        },
      })
        .then((action) => {
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
  left: 150px;
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
