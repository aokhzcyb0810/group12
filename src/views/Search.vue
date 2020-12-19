<template>
    <div>
    <NavBar></NavBar>
  <div class="navtop">
  <el-input placeholder="请输入内容" v-model="input3" class="searchinput input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="餐厅名" value="1"></el-option>
    </el-select>
    <i slot="suffix" class="el-input__icon el-icon-search search-button" style="cursor: pointer;"></i>
  </el-input>
  <div class="choose"><span>论文</span><span class="zhuanjia" @click="tozhuanjia" >专家</span></div>
</div>
<div class="zhushi">在所有学科为您找到 “” 相关的结果 (505)。</div>
<div class="searchbody"><el-row :gutter="20">
  <el-col :span="4">
  <div class="shijian">
  <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
    <i class="el-icon-date"></i>选择日期
    </template>
    <el-dropdown trigger="click">
      <div class=" shijianxuanze">
        2019<i class="el-icon-arrow-down el-icon--right" style="float:right;margin-top:0%"></i>
      </div>
      <el-dropdown-menu slot="dropdown" size="mini">
        <el-dropdown-item >黄金糕</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>—</span>
    <el-dropdown trigger="click">
      <div class=" shijianxuanze">
        2019<i class="el-icon-arrow-down el-icon--right" style="float:right;margin-top:0%"></i>
      </div>
      <el-dropdown-menu slot="dropdown" size="mini">
        <el-dropdown-item >黄金糕</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i style="float:right;margin-top:7px;cursor: pointer" class="el-icon-search"></i>
  </el-collapse-item>
  </el-collapse>
  </div>
    </el-col>
  <el-col :span="16"><div class="jieguo">
  <el-tabs v-model="activeName">
    <el-tab-pane label="按时间" name="first"></el-tab-pane>
    <el-tab-pane label="按引用" name="second"></el-tab-pane>
    <el-tab-pane label="综合" name="third"></el-tab-pane>
  </el-tabs>
  <div class="neirong" style="margin-top:20px" v-for="item in currentlist" :key="item.id">
    <div class="neirong1">
      <div class="neirong11">
        <div class="biaoti neirong111">我是标题</div>
        <div class="zuozhe neirong111" style="line-height:30px;">{{item.id}}</div>
        <div class="jianjie neirong111">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
      <div class="neirong12">
        <el-button icon="el-icon-star-off" circle></el-button>
      </div>
    </div>
    <div class="neirong2">
      <div class="xuanze"><span style="margin-right:10px">被引用：2222</span></div>
      <div class="xuanze"><span style="margin-right:10px">引用</span></div>
      <div class="xuanze"><span style="margin-right:10px">发表时间：2020</span></div>
      <div class="xuanze"><span style="margin-right:10px">关键字：java</span></div>
    </div>
  </div>
  <div v-if="show">已经没有内容了</div>
    </div>
     <el-pagination
     style="margin-top:30px;margin-bottom:20px"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="100">
    </el-pagination>
    </el-col>
  <el-col :span="4"></el-col>
</el-row></div>
</div>
</template>

<script>
import NavBar from "../homepage/NavBar";
    import NavBar2 from "../homepage/NavBar2";
    export default {
        name:'Search',
        components: {NavBar, NavBar2},
        created:{
          
        },
        data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      activeNames: ['1'],
      currentPage: 1,
      pagelist:[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}],
      currentlist:[{id:1},{id:2},{id:3},{id:4},{id:5}],
      show:false,
      isActive:true,
    }
  },
  methods: {
    tozhuanjia(){
      this.$router.replace(
            {path:'/scholar',
              query:{
         //     id:this.$route.query.id
              }
            })
    },
    searchs(){
      console.log("sss")
    },
    handleCurrentChange(newpage){
    //  int i;
    var list=[];
    var flag=1;
      for(var i=0;i<5;i++){
        if(this.pagelist.length>i+5*(newpage-1))
        list[i]=this.pagelist[i+5*(newpage-1)]
        else{
          break;
        }
      }
      this.currentlist=list;
      if(this.pagelist.length<=5*(newpage-1))
      this.show=true
      else
      {
        this.show=false;
      }
    }
  },
    }
</script>

<style lang="less"  scoped>
 .el-select {
     width: 150px;
     border:0px none;
 //    margin-top: 50px;
 }.el-input {
    width: 800px;
    // height: 46px;
    border-style: none;
    border:none;
    margin-top: 50px;
  }
 /deep/ .el-input-group__prepend{
    height: 46px;
    border:none;
    border-style: none;
 //   margin-top: 50px;
  }
/deep/ .el-input__inner{
    height: 46px;
  //  margin-top: 50px;
  }
  .input-with-select {
      background-color: #fff;
      border:none;
    //  margin-top: 50px;
  }
  .el-input-group__prepend {
    background-color: #fff;
    border:none;
  //  margin-top: 50px;
  }
  .navtop{
        background: url("../assets/background.jpg");
        background-size: 100%;
        height: 130px;
       // background-color: aqua;
    }
  .pointer{
    cursor: pointer;
  }
  .searchinput{
  //  margin-top: 50px;
    margin-left: 350px;
    border-radius: 5px
  }
  html,body{
    width: 100%;
            height: 100%;
            margin: 0; 
            padding: 0;
  }
  .choose{
    margin-left: 370px;
    line-height:20px;
    margin-top: 5px;
    color: white;
  }
  .zhuanjia{
    margin-left: 30px;
    color: #99a9bf;
  }
  .zhuanjia:hover{
    color: white;
    cursor: pointer;
  }
  .zhushi{
    margin-left: 10%;
    height: 30px;
    line-height: 30px;
  }
  .searchbody{
    margin-left: 10%;
    margin-right: 15%;
  //  background-color: aquamarine;
    height: 100%;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .shijian{
    height:100px;
   // background-color:#99a9bf;
  }
  .shijianxuanze{
    width: 60px;
    height:15px;
    line-height: 15px;
    border-bottom: solid 1px;
    text-align: center;
  }
  .neirong111{
    height:36px;
  //  line-height: 36px;
  }
  .biaoti{
    font-size: 20px;
    font-weight: 520;
    word-wrap:break-word;
  }
  .zuozhe{
    font-size: 13px;
  }
  .jianjie{
    font-size: 13px;
    word-break:break-all;
  }
  .neirong12{
    float:right;
    margin-top:0%;
  }
  .neirong11{
    float:left;
    width:90%;
  }
  .neirong2{
    clear:both;
    border-top:dotted 1px;
    border-bottom: solid 1px;
    height:30px;
  }
  .xuanze{
    text-align: center;
    line-height: 12px;
    margin-right: 10px;
    border-right: solid 1px;
    float:left;
    height:12px;
    margin-top: 9px;
    font-size: 9px;
    font-weight: 600;
    border-color: #99a9bf;
  }
  .active{
    color: black;
  }
</style>