<template>
    <div>
    <NavBar></NavBar>
  <div class="navtop">
  <el-input :placeholder="fangshi" v-model="input3" class="searchinput input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择学科">
      <el-option :label="xueke"  v-for="item in xuekeliebiao" :key=item.name @click.native="xuanzexueke(item.name)" style="height:40px;overflow:auto">{{item.name}}</el-option>
    </el-select>
    <i slot="suffix" class="el-input__icon el-icon-search search-button" style="cursor: pointer;" @click.capture="searchs"></i>
  </el-input>
  <div class="choose"><span class="lunwen" span @click="tolunwen">论文</span><span class="zhuanjia">专家</span><span style="margin-left:40px;cursor: pointer" class="sousuofangshi" @click="change">{{sousuo}}</span></div>
</div>
<div class="zhushi">在所有学科为您找到 “” 相关的结果 (505)。</div>
<div class=scholarbody>
    <div class="neirong" v-for="item in currentlist" :key="item.id">
<el-row :gutter="20">
  <el-col :span="6">
      <div style="margin-top:0%">
          <img src="../assets/head.png" style="width:150px;height:150px;margin-left:20px;margin-top:0%">
      </div>
      </el-col>
  <el-col :span="16">
      <div>
          <div class="xingming neirong1" >姓名</div>
          <div class="lunwenshu neirong1"><i class="el-icon-document" style="margin-right:5px"></i>论文数：111</div>
          <div class="yinyongshu neirong1"><i class="el-icon-document-copy" style="margin-right:5px"></i>被引用数：222</div>
          <div class="jigou neirong1"><i class="el-icon-school" style="margin-right:5px"></i>机构</div>
          <div class="lingyu neirong1">
            <div v-for="item in lingyulist" :key="item.name" class="lingyunei">{{item.name}}</div>
          </div>
      </div>
      </el-col>
  <el-col :span="2">
      <div class="neirong2">
          <el-button type="info" icon="el-icon-star-off" circle></el-button>
      </div>
      </el-col>
</el-row>
<div style="border-top:solid 1px;height:20px"></div>
    </div>
    <div v-if="show">已经没有内容了</div>
    <el-pagination
     style="margin-top:0px;margin-bottom:20px"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="100">
      </el-pagination>
</div>
</div>
</template>

<script>
import NavBar from "../homepage/NavBar";
    import NavBar2 from "../homepage/NavBar2";
    export default {
        name:'Search',
        components: {NavBar, NavBar2},
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
      dangqianfangshi:1,
      xuekeliebiao:[{name:"全部学科"},{name:'java'},{name:'jaa'},{name:'jva'},{name:'ava'},{name:'java'},{name:'java'},],
      xueke:'',
      lingyulist:[{name:"领域1"},{name:"领域2"},{name:"领域3"},{name:"领域4"},{name:"领域5"},]
    }
  },
  computed:{
          fangshi(){
            if(this.dangqianfangshi==1)
            return '当前为关键字搜索'
            else
            return '当前为模糊搜索'
          },
          sousuo(){
            if(this.dangqianfangshi==1)
            return '转为模糊搜索'
            else
            return '转为关键字搜索'
          }
        },
  methods: {
    change(){
      console.log("dsadsa")
       if(this.dangqianfangshi==1)
      {
        this.dangqianfangshi=0
      }
      else
      this.dangqianfangshi=1
    },
    xuanzexueke(xueke){
      this.xueke=xueke
    },
    tolunwen(){
      this.$router.replace(
            {path:'/search',
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
  //  color: #99a9bf;
  }
  .lunwen{
   // margin-left: 30px;
    color: #99a9bf;
  }
  .lunwen:hover{
    color: white;
    cursor: pointer;
  }
  .zhushi{
    margin-left: 20%;
    height: 30px;
    line-height: 30px;
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
  .scholarbody{
      margin-left: 20%;
      margin-right: 25%;
      margin-top: 30px;
  }
  .neirong{
      height:200px;
    //  background-color:#e5e9f2;
  }
  .neirong1{
      line-height: 30px;
      height: 30px;
  }
  .xingming{
      font-size: 20px;
      font-weight: 510;
  }
  .neirong2{
      float:right;
    margin-top:0%;
  }
  .sousuofangshi:hover{
    color: yellow;
  }
  .lingyunei{
    float:left;
    margin-right: 10px;
   // border: solid 0.5px;
    height:21px;
    line-height: 21px;
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgb(235, 232, 232);
  }
</style>