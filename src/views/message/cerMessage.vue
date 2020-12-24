<template>
  <div>
    <NavBar></NavBar>
    <el-container>
      <el-container>
        <send-button></send-button>
        <el-aside width="15%">
          <!-- <mes-side-bar @unReadMes="handleUnReadMes" @allMes="handleAllMes"></mes-side-bar> -->
          <mes-side-bar currentindex="4"></mes-side-bar>
        </el-aside>
        <el-main style="width: 80%">
          <h2 class="h2color">学者认证</h2>
          <!-- 获取的消息列表 -->
          <cer-mes-list :mess="NowMess" :userID="userID" :currentIndex="4"></cer-mes-list>
          <div style="margin-left: 41%; margin-top: 8%" v-show="this.isNULL">
            <div><img src="../../assets/空.png" style=" width: 110px"></div>

          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import NavBar from "@/homepage/NavBar";
import MesSideBar from "./MesSideBar";
import CerMesList from "./CerMesList";
import axios from 'axios';
import SendButton from './SendButton';

export default {
  name: "Message",
  components: { NavBar, MesSideBar, CerMesList,SendButton },
  data() {
    return {
      headUrl: require("@/assets/head.jpg"),
      // 全部消息
      // AllMess: [],
      NowMess: [],
      // UnReadMess: [],
      userID: 1,
      isNULL: true,
    };
  },
  methods: {
    // checkRead(mes) {
    //   return mes.isRead == 0;
    // },
    fetchList() {
      this.userL = JSON.parse(sessionStorage.getItem("userL"));
      this.userID = this.userL.id;
      axios
        //  获取消息
        .post("/apply/show")
        .then((res) => {
          this.NowMess = res.data.data;
          console.log(this.NowMess)
          if (this.NowMess == "") {
            this.isNULL = true;
          } else {
            this.isNULL = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created: function () {
    this.fetchList();
  },
};
</script>

<style>
.h2color {
  color: #3369e7;
}
.wu {
  position: absolute;
  left: 250px;
  height: 250px;
}
</style>
