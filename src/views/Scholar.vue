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
  <div class="choose"><span class="lunwen" span @click="tolunwen">论文</span><span class="zhuanjia">专家</span></div>
</div>
<div class="zhushi" v-show="isshowhead"><span v-show="ishowselect">在{{select}}中</span>为您找到 “{{sousuoneirong}}” 相关的结果 ({{tiaoshu}})。</div>
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
          <div class="xingming neirong1" >{{item.name}}</div>
          <div class="lunwenshu neirong1"><i class="el-icon-document" style="margin-right:5px"></i>论文数：{{item.paperCount}}</div>
          <div class="yinyongshu neirong1"><i class="el-icon-document-copy" style="margin-right:5px"></i>被引用数：{{item.citation}}</div>
          <div class="jigou neirong1"><i class="el-icon-school" style="margin-right:5px"></i>{{item.organization}}</div>
          <div class="lingyu neirong1">
            <div v-for="it in item.field.slice(0,6)" :key="it" class="lingyunei">{{it}}</div>
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
    v-show="isshowhead"
     style="margin-top:0px;margin-bottom:20px;clear:both"
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
      scholarlist:[],
      currentlist:[],
      show:false,
      dangqianfangshi:1,
      xuekeliebiao:[],
      xueke:'1',
      lingyulist:[],
      sousuoneirong:'',
      tiaoshu:'',
      isshowhead:false,
      ishowselect:false,
    }
  },
  created(){
    this.createsearch(),
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
          }
        },
  methods: {
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
            for(var i=0;i<1000;i++){
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
            {path:'/scholar',
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
               url:'/search/researcher?key='+self.input3, 
            }).catch(err=>{console.log(err)})
            this.scholarlist=res.data.data
            console.log(this.scholarlist)
            this.handleCurrentChange(1)
            this.sousuoneirong=this.input3
            this.tiaoshu=this.scholarlist.length
            this.ifshowhead()
            this.ifshowselect()
      }
      else{
        const res=await this.$axios({
             //  type:'params',
               method:'get',
               url:'/search/researcher/field?field='+self.select, 
            }).catch(err=>{console.log(err)})
            this.scholarlist=res.data.data
            console.log(this.scholarlist)
            this.handleCurrentChange(1)
            this.sousuoneirong=this.input3
            this.tiaoshu=this.scholarlist.length
            this.ifshowhead()
            this.ifshowselect()
      }
    },
    handleCurrentChange(newpage){
    //  int i;
    var list=[];
    var flag=1;
      for(var i=0;i<5;i++){
        if(this.scholarlist.length>i+5*(newpage-1))
        list[i]=this.scholarlist[i+5*(newpage-1)]
        else{
          break;
        }
      }
      this.currentlist=list;
      if(this.scholarlist.length<=5*(newpage-1))
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
      margin-right: 23%;
      margin-top: 30px;
  }
  .neirong{
      height:200px;
    //  background-color:#e5e9f2;
  }
  .neirong1{
    //  line-height: 30px;
      min-height: 30px;
      height:auto;
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
    min-height:21px;
    height:auto;
   // line-height: 21px;
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    background-color: rgb(235, 232, 232);
    margin-bottom: 5px;
    margin-top: 5px;
  }
</style>
