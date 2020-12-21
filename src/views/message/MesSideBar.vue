<template>
  <div id="SideBar">
    <el-row class="tac" style="margin-left: 30px">
      <el-col>
        <h3>消息界面</h3>
        <el-menu :default-active="currentindex" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="itemClick1">
            <span slot="title">系统消息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="itemClick2">
            <span slot="title">已收到的私信</span>
          </el-menu-item>
          <el-menu-item index="3" @click="itemClick3">
            <span slot="title">已发出的私信</span>
          </el-menu-item>
          <el-menu-item index="4" @click="itemClick4" v-show="this.isVisible">
            <span slot="title">学者认证</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      isVisible:false
    };
  },
  props: {
    currentindex: {
      type: String,
      default: '1'
    }
  },
  methods: {
    itemClick1() {
      this.$router.push('sysMessage')
      },
    itemClick2() {
      this.$router.push('recMessage')
    },
    itemClick3() {
      this.$router.push('sendMessage')
    },
    itemClick4() {
      this.$router.push('cerMessage')
    },
  },
  created: function(){
    this.userL = JSON.parse(sessionStorage.getItem("userL"))
    if(this.userL.role==0){
      this.isVisible=true
    }
    console.log(this.userL)
  }
};
</script>
