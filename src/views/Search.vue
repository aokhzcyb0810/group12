<template>
    <div>
    <NavBar></NavBar>
  <div class="navtop">
  <el-input placeholder="请输入内容" v-model="input3" class="searchinput input-with-select">
    <el-select v-model="select" slot="prepend" filterable placeholder="请选择学科">
      <el-option :label="item" :value="item"  v-for="item in xuekeliebiao" :key="item" @click.native="xuanzexueke(item)" style="height:40px;overflow:auto">{{item}}</el-option>
    </el-select>
    <i slot="suffix" class="el-input__icon el-icon-search search-button" style="cursor: pointer;" @click.capture="tosearch"></i>
  </el-input>
  <div class="choose"><span>论文</span><span class="zhuanjia" @click="tozhuanjia" >学者</span></div>
</div>
<div class="zhushi" v-show="isshowhead"><span v-show="ishowselect">在{{select}}中</span>为您找到 “{{sousuoneirong}}” 相关的结果 ({{tiaoshu}})。</div>
<div class="searchbody"><el-row :gutter="20">
  <el-col :span="4">
  <div class="shijian" v-show="isshowhead">
  <el-collapse accordion style="border-top:solid blue 2px;border-bottom:solid blue 1px;margin-top:10px">
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
    <i style="float:right;margin-top:7px;cursor: pointer"  class="el-icon-search" @click.capture="searchtime"></i>
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
  <!-- <el-tabs v-model="activeName" v-show="isshowhead">
    <el-tab-pane label="按时间" name="first" @click.capture="shijianpaixu"></el-tab-pane>
    <el-tab-pane label="按引用" name="second"></el-tab-pane>
  </el-tabs> -->
  <div class="neirong" style="margin-bottom:35px;margin-top:0px" v-for="item in currentlist" :key="item.id">
    <div class="neirong1">
      <div class="neirong11">
        <div class="biaoti neirong111"><span @click="topage(item.id)" class="biaotilianjie">{{item.title}}</span></div>
        <div class="zuozhe neirong111" style="line-height:30px;margin-top:5px"><span v-for="(it,index) in item.author" :key="index" >{{it}}</span></div>
        <div class="jianjie neirong111" style="margin-top:5px"><span>{{item.abstract}}</span></div>
      </div>
      <div class="neirong12">
        <!-- <el-button  icon="el-icon-star-off" circle></el-button> -->
      </div>
    </div>
    <div class="neirong2">
      <div class="xuanze"><span style="margin-right:20px">被引用：{{item.citation}}</span></div>
      <!-- <div class="xuanze" ><span style="margin-right:20px">引用</span></div> -->
      <div class="xuanze"><span style="margin-right:20px">发表时间：{{item.year}}</span></div>
      <div class="xuanze"><span style="margin-right:20px">关键字：{{item.keywords[0]}}</span></div>
    </div>
  </div>
  <div v-if="show&&isshowhead">已经没有内容了</div>
    </div>
     <el-pagination
     v-show="isshowhead"
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
          this.createsearch(),
          this.createdate(),
          this.ifshowhead(),
          this.getfield()
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
          },
        },
    data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      select: '',
      activeNames: ['1'],
      currentPage: 1,
      pagelist:[],
      currentlist:[],
      xuekeliebiao:[],
      xueke:'',
      date:[{date:222}],
      show:false,
      isActive:true,
      startdate:'',
      enddate:'',
      dangqianfangshi:1,
      sousuoneirong:'',
      tiaoshu:'',
      isshowhead:false,
      isshowselect:false,
      timelist:[],
      shijianpaixu:[],
      nowlist:[],
      oldlist:[],
    }
  },
  methods:{
    // shijianpaixu(){
    //   var temp
    //   console.log("sdas")
    //   for (var i=0; i<this.nowlist.length-1; i++)
    //     for (var j=0; j<this.nowlist.length-1-i; j++) {
    //         if (this.nowlist[j].year > this.nowlist[j+1].year) {
    //             temp = this.nowlist[j];
    //             this.nowlist[j] = this.nowlist[j+1];
    //             this.nowlist[j+1] = temp;
    //         }
    //     }
    // },
    searchtime(){
      var list=[]
      var j=0
      for(var i=0;i<this.pagelist.length;i++){
        if(this.pagelist[i].year>=this.startdate && this.pagelist[i].year<=this.enddate){
          list[j++]=this.pagelist[i]
        }
      }
      this.timelist=list
      this.nowlist=this.timelist
      this.oldlist=this.nowlist
      this.handleCurrentChange(1)
      console.log(list)
      this.tiaoshu=this.nowlist.length
    //  console.log(this.enddate)
    },
    ifshowselect(){
      if(this.select!='')
      this.ishowselect=true
      else
      this.ishowselect=false
    },
    async getfield(){
       const res=await this.$axios({
             //  type:'params',
               method:'get',
               url:'/field',
            }).catch(err=>{console.log(err)})
            var list=[]
            list[0]='全部学科'
            for(var i=0;i<res.data.data.length;i++){
            list[i+1]=res.data.data[i]
            }
            this.xuekeliebiao=list
            console.log(this.xuekeliebiao)
    },
    ifshowhead(){
            if(this.$route.query.content.length==0  && (this.$route.query.select.length==0 || this.$route.query.select=='全部学科'))
            this.isshowhead=false
            else
            this.isshowhead=true
          },
     tosearch(){
      this.$router.replace(
            {path:'/search',
              query:{
              content:this.input3,
              select:this.select
              }
            })
      this.searchs()
    },
    createsearch(){
      console.log(this.$route.query.content)
      this.input3=this.$route.query.content
      this.select=this.$route.query.select
     if(this.input3!='' && this.input3!=null || (this.select!='' && this.select!=null && this.select!='全部学科'))
      this.searchs()
    },
    topage(paperid){
      this.$router.push({
        path:'/paper/'+paperid,
      })
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
              content:this.input3,
              select:this.select
              }
            })
    },
    async searchs(){
      var self=this
      if(this.select==''|| this.select=='全部学科'){
      const res=await this.$axios({
             //  type:'params',
               method:'get',
               url:'/fuzzysearch?key='+self.input3,
               data:{
                 keyword:self.input3
                 }
            }).catch(err=>{console.log(err)})
            this.pagelist=res.data.data
            for(var i=0;i<this.pagelist.length;i++){
              this.pagelist[i].abstract=this.pagelist[i].abstract.substring(0,300)+'......'
              if(this.pagelist[i].keywords[0].length>50){
                this.pagelist[i].keywords[0]=this.pagelist[i].keywords[0].substring(0,73)+'...'
              }
              for(var j=0;j<this.pagelist[i].author.length-1;j++){
                this.pagelist[i].author[j]=this.pagelist[i].author[j]+'，'
              }
            }
            this.nowlist=this.pagelist
            this.oldlist=this.nowlist
            this.sousuoneirong=this.input3
            this.tiaoshu=this.nowlist.length
            this.handleCurrentChange(1)
            console.log(this.pagelist[0])
            this.ifshowhead()
            this.ifshowselect()
      }
      else{
        const res=await this.$axios({
             //  type:'params',
               method:'get',
               url:'/search/keyword?field='+self.select+'&key='+self.input3,
               data:{
                 filed:self.select,
                 keyword:self.input3
                 }
            }).catch(err=>{console.log(err)})
            this.pagelist=res.data.data
            for(var i=0;i<this.pagelist.length;i++){
              this.pagelist[i].abstract=this.pagelist[i].abstract.substring(0,300)+'......'
              if(this.pagelist[i].keywords[0].length>50){
                this.pagelist[i].keywords[0]=this.pagelist[i].keywords[0].substring(0,73)+'...'
              }
              for(var j=0;j<this.pagelist[i].author.length-1;j++){
                this.pagelist[i].author[j]=this.pagelist[i].author[j]+'，'
              }
            }
            this.nowlist=this.pagelist
            this.oldlist=this.nowlist
            this.sousuoneirong=this.input3
            this.tiaoshu=this.nowlist.length
            this.handleCurrentChange(1)
            console.log(this.pagelist[0])
            this.ifshowhead()
            this.ifshowselect()
      }
    },
    handleCurrentChange(newpage){
    //  int i;
    var list=[];
    var flag=1;
      for(var i=0;i<5;i++){
        if(this.nowlist.length>i+5*(newpage-1))
        list[i]=this.nowlist[i+5*(newpage-1)]
        else{
          break;
        }
      }
      this.currentlist=list;
      if(this.nowlist.length<=5*(newpage-1))
      this.show=true
      else
      {
        this.show=false;
      }
    },
    handleCurrentChange2(newpage){
    //  int i;
    var list=[];
    var flag=1;
      for(var i=0;i<5;i++){
        if(this.timelist.length>i+5*(newpage-1))
        list[i]=this.timelist[i+5*(newpage-1)]
        else{
          break;
        }
      }
      this.currentlist=list;
      if(this.timelist.length<=5*(newpage-1))
      this.show=true
      else
      {
        this.show=false;
      }
    },
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
    min-height:30px;
    word-wrap:break-word;
    height:auto;
  }
  .zuozhe{
    font-size: 15px;
    color:#207e04
  }
  .jianjie{
    font-size: 15px;
    word-break:break-all;
    //height:80px;
    color:rgb(102, 89, 84);
    margin-bottom: 5px;
    // overflow:hidden;
    // text-overflow:ellipsis;
    // white-space: nowrap;
  }
  .neirong12{
    float:right;
    margin-top:0%;
    width:5%;
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
