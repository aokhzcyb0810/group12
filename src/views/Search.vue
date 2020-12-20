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
  <div class="choose"><span>论文</span><span class="zhuanjia" @click="tozhuanjia" >专家</span><span style="margin-left:40px;cursor: pointer" class="sousuofangshi" @click="change">{{sousuo}}</span></div>
</div>
<div class="zhushi">在所有学科为您找到 “” 相关的结果 (505)。</div>
<div class="searchbody"><el-row :gutter="20">
  <el-col :span="4">
  <div class="shijian">
  <el-collapse accordion style="border-top:solid blue 2px;border-bottom:solid blue 1px">
  <el-collapse-item>
    <template slot="title">
    <i class="el-icon-date"></i>选择日期
    </template>
    <el-dropdown trigger="click">
      <div class=" shijianxuanze">
        {{startdate}}<i class="el-icon-arrow-down el-icon--right" style="float:right;margin-top:0%"></i>
      </div>
      <el-dropdown-menu slot="dropdown" size="mini" style="height:300px;overflow:auto">
        <el-dropdown-item  @click.native="choose_startdate(item.date)" v-for="item in date" :key=item.date>{{item.date}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>—</span>
    <el-dropdown trigger="click">
      <div class=" shijianxuanze">
        {{enddate}}<i class="el-icon-arrow-down el-icon--right" style="float:right;margin-top:0%"></i>
      </div>
      <el-dropdown-menu slot="dropdown" size="mini" style="height:300px;overflow:auto">
        <el-dropdown-item @click.native="choose_enddate(item.date)" v-for="item in date" :key=item.date>{{item.date}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i style="float:right;margin-top:7px;cursor: pointer"  class="el-icon-search"></i>
    <div style="clear:both;margin-top:5px">
    <div class="kuaijieshijian" @click="jinshinian">近十年</div>
    <div class="kuaijieshijian" @click="jinwunian">近五年</div>
    <div class="kuaijieshijian" @click="jinsannian">近三年</div>
    </div>
  </el-collapse-item>
  </el-collapse>
  </div>
    </el-col>
  <el-col :span="18"><div class="jieguo">
  <el-tabs v-model="activeName">
    <el-tab-pane label="按时间" name="first"></el-tab-pane>
    <el-tab-pane label="按引用" name="second"></el-tab-pane>
    <el-tab-pane label="综合" name="third"></el-tab-pane>
  </el-tabs>
  <div class="neirong" style="margin-bottom:35px;margin-top:0px" v-for="item in currentlist" :key="item.id">
    <div class="neirong1">
      <div class="neirong11">
        <div class="biaoti neirong111"><span @click="topage" class="biaotilianjie">Data mining: practical machine learning tools and techniques with Java implementations</span></div>
        <div class="zuozhe neirong111" style="line-height:30px;margin-top:5px">{{item.id}}</div>
        <div class="jianjie neirong111" style="margin-top:5px"><span>From the Publisher:Written by the inventors of the technology, The Java(tm) Language Specification, Second Edition is the definitive technical reference for the Java(tm) programming language. If you want to know the precise meaning of the language's constructs, this is the source...</span></div>
      </div>
      <div class="neirong12">
        <el-button  icon="el-icon-star-off" circle></el-button>
      </div>
    </div>
    <div class="neirong2">
      <div class="xuanze"><span style="margin-right:20px">被引用：2222</span></div>
      <div class="xuanze"><span style="margin-right:20px">引用</span></div>
      <div class="xuanze"><span style="margin-right:20px">发表时间：2020</span></div>
      <div class="xuanze"><span style="margin-right:20px">关键字：java</span></div>
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
  <el-col :span="2"></el-col>
</el-row></div>
</div>
</template>

<script>
import NavBar from "../homepage/NavBar";
    import NavBar2 from "../homepage/NavBar2";
    export default {
        name:'Search',
        components: {NavBar, NavBar2},
        mounted(){
       //   this.searchs(),
          this.createdate()
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
    data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      activeNames: ['1'],
      currentPage: 1,
      pagelist:[{id:'asdas'},{id:'asdas'},{id:'asdas'},{id:'asdas'},{id:5},{id:6},{id:7},{id:8},{id:9}],
      currentlist:[{id:'asdas,sdaasd'},{id:'asdas'},{id:'asdas'},{id:'asdas'},{id:'asdas'}],
      xuekeliebiao:[{name:"全部学科"},{name:'java'},{name:'jaa'},{name:'jva'},{name:'ava'},{name:'java'},{name:'java'},],
      xueke:'',
      date:[{date:222}],
      show:false,
      isActive:true,
      startdate:'',
      enddate:'',
      dangqianfangshi:1,
    }
  },
  methods:{
    topage(){
      console.log("还没写")
    },
    jinshinian(){
      this.startdate=2010
      this.enddate=2020
    },
    jinwunian(){
      this.startdate=2015
      this.enddate=2020
    },
    jinsannian(){
      this.startdate=2017
      this.enddate=2020
    },
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
    createdate(){
        var i=2020
      var j=0;
      var list=[]
      for(;i>1950;i--){
        list.push({date:i})
      }
      this.date=list
    },
    choose_startdate(date){
      this.startdate=date
    },
    choose_enddate(date){
      this.enddate=date
    },
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
    margin-left: 327px;
    height: 30px;
    line-height: 30px;
  }
  .searchbody{
    margin-left: 8%;
    margin-right: 12%;
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
  .biaoti{
    font-size: 24px;
    font-weight: 520;
    height:55px;
    word-wrap:break-word;
  }
  .zuozhe{
    font-size: 15px;
    color:#207e04
  }
  .jianjie{
    font-size: 15px;
    word-break:break-all;
    height:65px;
    color:rgb(102, 89, 84)
  }
  .neirong12{
    float:right;
    margin-top:0%;
  }
  .neirong11{
    float:left;
    width:95%;
  }
  .neirong2{
    clear:both;
    border-top:dotted 1px;
    border-bottom: solid 1px;
    height:30px;
  //  margin-top:20px;
  }
  .xuanze{
    text-align: center;
    line-height: 12px;
    margin-right: 20px;
    border-right: solid 1px;
    float:left;
    height:12px;
    margin-top: 9px;
    font-size: 9px;
    font-weight: 600;
    border-color: #06e690;
    color: rgb(21, 135, 228);
  }
  .neirong1{
    height:118px;
  }
  .sousuofangshi:hover{
    color: yellow;
  }
  .kuaijieshijian{
    margin-bottom: 0%;
  //  background-color:gainsboro;
   // border-radius: 5px;
    border: solid 1px;
    float:left;
    margin-left: 5px;
    width:48px;
    text-align: center;
    font-size: 10px;
    height:15px;
    line-height: 15px;
    cursor: pointer;
  //  color: #fff;
  }
  .biaotilianjie{
    cursor: pointer;
  }
  .biaotilianjie:hover{
    color: rgb(70, 70, 202);
    text-decoration: underline;
  }
</style>