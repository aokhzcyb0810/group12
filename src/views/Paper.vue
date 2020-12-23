<template>
<div>
  <NavBar></NavBar>
    <div class="body-top">
      <div class="body-form">
        <el-form :model="searchForm" label-position="right">
          <el-row>
            <el-col :span="4">
              <el-form-item>
                <el-radio-group v-model="searchForm.radio">
                  <el-radio label="1" style="margin-bottom: 5px; color: white; font-size: 8px">学术资源检索</el-radio>
                  <el-radio label="2" style="color: white;font-size: 8px">科研工作者检索</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="16">
             <el-input placeholder="请输入内容" v-model="searchForm.text" class="searchinput input-with-select" style="border-radius: 5px">
                               <el-select v-model="searchForm.select" slot="prepend" filterable placeholder="请选择学科">
                                   <el-option :label="item" :value="item"  v-for="item in xuekeliebiao" :key="item" @click.native="xuanzexueke(item)" style="height:40px;overflow:auto">{{item}}</el-option>
                               </el-select>
                                  <i slot="suffix" class="el-input__icon el-icon-search search-button" style="cursor: pointer;" @click.capture="tosearch"></i>
              </el-input>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  <div class="main">
    <div style="width: 70%; float: left;background-color: whitesmoke">
      <el-card shadow="hover">
        <h1 class="papertitle">{{papertitle}}</h1>
        <el-table :data ="paperdata" style = "width : 100%" id="papertable">
          <el-table-column
                  prop="key"
                  align="center"
                  width="300"
          >
          </el-table-column>
          <el-table-column
                  prop="value"
          >
          </el-table-column>
        </el-table>
        <br>
        <el-row style="text-align: center">
          <el-button class="read_button" icon="el-icon-reading" round @click="goRead">阅读</el-button>
          <el-button class="star_button" icon="el-icon-star-off" round v-show="canCollect" @click="formVisible = true">收藏</el-button>
          <el-button class="star_button" icon="el-icon-star-off" round v-show="canCancel" @click="cancelCollect">取消收藏</el-button>
        </el-row>
      </el-card>
      <el-card style="margin-top: 20px;" shadow="hover"  v-show="hasLogin">
        <div>
          <el-form :model="Form" :rules="rule" ref="Form">
            <el-row style="margin-top: 10px;">
              <el-col :span="2">
                <img :src="headSrc" class="commentHead" />
              </el-col>
              <el-col :span="22">
                <el-form-item prop="content">
                  <el-input
                          type="textarea"
                          :autosize="{ minRows: 3}"
                          placeholder="请输入内容"
                          v-model="Form.content"
                          class="te"
                          @click.native="showSubmit = true"
                          style="width: 90%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-collapse-transition>
              <div>
                <el-row>
                  <el-col :span="24">
                    <el-form-item>
                      <el-button
                              type="primary"
                              style="float: right; margin-right: 5%"
                              icon="el-icon-edit"
                              round
                              @click="onSubmit('Form')"
                      >提交</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-collapse-transition>
          </el-form>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;margin-bottom: 20px;" shadow="hover">
        <div style="font-size: 20px; margin-bottom: 40px; margin-left: 7px">
          <el-row>
            <el-col :span="1">
              <div class="tips">
                <p></p>
              </div>
            </el-col>
            <el-col :span="23" style="margin-top: 5px">评论</el-col>
          </el-row>
        </div>
        <el-row></el-row>
        <ul style="list-style: none;margin: 0; padding: 0;">
          <li v-for="(item,index) in commentItem" :key="index">
            <div style="width: 100%;float: left">
                  <span style="width: 8.3%; float: left">
                    <img :src="item.profileUrl" class="commentHead"/>
                  </span>
              <span style="float: left" class="commentName">{{item.userName}}</span>
            </div>
            <p class="commentText">{{item.content}}</p>
            <div style="width: 100%" class="commentTime">
              <div style="margin-left: 8.3%">
                <p>{{getTime(item.dateTime)}}</p>
              </div>
            </div>
            <el-divider></el-divider>
          </li>
        </ul>
      </el-card>
    </div>
   <div style="width: 28%; float: left; background-color: whitesmoke;margin-left: 2%">
     <el-card id="fixedCard" :class="{'isFixed':fixed}">
       <div slot="header" class="clearfix">
         <span style="font-weight: bold">关于作者</span>
       </div>
       <div style="margin-bottom: 60px">
         <div style="float: left;width: 100%">
           <span style="font-weight: bold;margin-left: 10px;">
          {{ scholarname }}
        </span>
         </div>
         <div style="width: 100%; float: left;margin-top: 20px; margin-left: 10px;">
           <p>研究领域: <span style="color: #409EFF">{{ researchfield }}</span></p>
           <p>工作单位: <span style="color: #409EFF">{{ work }}</span></p>
         </div>
         <div style="width: 100%;float: left; text-align: center;margin-bottom: 20px; margin-top: 20px;">
           <el-button plain icon="el-icon-share" @click="toPage">学者主页</el-button>
           <el-button plain icon="el-icon-star-off" @click="follow" v-show="canFollow">关注</el-button>
           <el-button plain icon="el-icon-star-off" @click="cancelFollow" v-show="canCancelFollow">取消关注</el-button>
         </div>
       </div>
     </el-card>
   </div>
  </div>
    <el-dialog :visible.sync="formVisible" width="35%" center>
      <div class="login-body">
        <el-form :model="collectForm" label-position="right">
          <el-form-item label="选择收藏夹" style="margin-bottom: 15px" prop="collect">
              <el-select v-model="collectForm.collect" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                </el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <div style="margin-top: 30px">
          <el-button type="primary" style="width: 100%" @click="collect">完 成</el-button>
        </div>
      </div>
    </el-dialog>
  <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>

</template>

<script>
import NavBar from "../homepage/NavBar";
import axios from "axios";
export default {
  name: "Paper",
  components: {NavBar},
  inject: ['reload'],
  data() {
    return {
      canFollow: true,
      canCancelFollow: true,
      httpUrl: '',
      offsetTop: 0,
      offsetWidth: 0,
      colWidth: 0,
      fixed: false,
      scholarname: "学者名a",
      scholarurl: require("../assets/logo.png"),
      work: "北京奶糖大学",
      researchfield: "计算机",
      scholarid: 1,
      hasLogin: false,
      formVisible: false,
      headSrc: require("../assets/logo.png"),
      showSubmit: false,
      canCollect: true,
      canCancel: true,
      papertitle: ' 文章标题',
      paperdata: [{
        key:'摘要',
        value:'一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要一大堆摘要'
      },
      {
        key:'作者',
        value:'tem_author'
      },
      {
        key:'关键词',
        value:'tem_keywords'
      },
      {
        key:'发表时间',
        value:'tem_date'
      }],
      retrieve:'',
      select:'',
      searchForm:{
        radio: '1',
        text: '',
        name: '',
        key: '',
        time: ''
      },
      commentItem: [
        {
          profileUrl: require("../assets/logo.png"),
          userName: "YuanCZ",
          content: "你用两个脑子思考？",
          dateTime: "2020-8-13",
        },
        {
          profileUrl: require("../assets/logo.png"),
          userName: "宋友",
          content: "你真幸运",
          dateTime: "2020-8-14",
        },
      ],
      Form: [
        {
          content: "",
        },
      ],
      rule: {
        content: [{ required: true, message: "请输入评论", trigger: ["blur"] }],
      },
      collectForm:{
        collect: 1
      },
      options: [{
        key: 1,
        value: '收藏夹1'
      }, {
        key: 2,
        value: '收藏夹2'
      }],
    };
  },
  methods: {
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
            tosearch(){
                if(this.searchForm.radio==1){
                    this.$router.replace(
            {path:'/search',
              query:{
              content:this.searchForm.text,
              select:this.searchForm.select
              }
            })
            }
            else if(this.searchForm.radio==2){
                this.$router.replace(
            {path:'/scholar',
              query:{
              content:this.searchForm.text,
              select:this.searchForm.select
              }
            })
            }
            },
    initHeight() {
      //兼容性，获取页面滚动距离
      var scrollTop =
              window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop;
      //判断滚动距离是否大于元素到顶端距离
      this.fixed = scrollTop > this.offsetTop ? true : false;
      //宽度赋值
      document.getElementById("fixedCard").style.width =
              this.offsetWidth + "px";
    },
    getDoc() {
      var _this = this;
      axios.get("http://127.0.0.1:8081/paper/get/" + _this.$route.params.id)
              .then(function (response) {
                if (response.data.status === 200) {
                  while (_this.paperdata.length > 0) {
                    _this.paperdata.pop();
                  }
                  _this.papertitle = response.data.data.title;
                  _this.paperdata.push({key: '摘要', value: response.data.data.abstract});
                  _this.paperdata.push({key: '作者', value: response.data.data.authorShow});
                  _this.paperdata.push({key: '关键词', value: response.data.data.keywordShow});
                  _this.paperdata.push({key: '发表时间', value: response.data.data.year});
                  _this.httpUrl = response.data.data.url;
                  console.log(_this.httpUrl);
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getCollect() {
      if (sessionStorage.getItem('userL') === null) {
        this.canCollect = false;
        this.canCancel = false;
      } else {
        var _this = this;
        axios.get("http://127.0.0.1:8081/collection/status?paper=" + _this.$route.params.id + "&user=" + JSON.parse(sessionStorage.getItem("userL")).id)
                .then(function (response) {
                  if (response.data.status === 200) {
                    if (response.data.data === 0) {
                      _this.canCollect = true;
                      _this.canCancel = false;
                    } else {
                      _this.canCollect = false;
                      _this.canCancel = true;
                    }
                  }
                })
                .catch(function (error) {
                  console.log(error)
                })
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var _this = this;
          var userL = JSON.parse(sessionStorage.getItem("userL"));
          axios
                  .post("http://127.0.0.1:8081/comment", {
                    content: _this.Form.content,
                    commentator: userL.id,
                    paperId: _this.$route.params.id
                  })
                  .then(function (response) {
                    if (response.data.status === 200) {
                      _this.$message({
                        message: "评论成功",
                        type: "success",
                      });
                      _this.reload();
                      _this.Form.content = "";
                      _this.getComment();
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    collect(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/collect?Did=" + _this.collectForm.collect+ "&paper=" + _this.$route.params.id + "&user=" + JSON.parse(sessionStorage.getItem("userL")).id)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "收藏成功",
                    type: "success",
                  });
                  _this.formVisible = false;
                  _this.reload();
                  _this.canCollect = false;
                  _this.canCancel = true;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getCollection(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/getCollection?user=" + JSON.parse(sessionStorage.getItem("userL")).id)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.options = response.data.data;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    cancelCollect(){
      var _this = this;
      axios.post("http://127.0.0.1:8081//collection/cancelinpaper?paper=" + _this.$route.params.id + "&user=" + JSON.parse(sessionStorage.getItem("userL")).id)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "取消收藏成功",
                    type: "success",
                  });
                  _this.reload();
                  _this.canCollect = true;
                  _this.canCancel = false;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getComment(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/paper/comment/" + _this.$route.params.id)
              .then(function (response) {
                if (response.data.status === 200 || response.data.status === 400) {
                  _this.commentItem = response.data.data;
                  console.log("拿到评论了");
                  for(var i = 0; i < _this.commentItem.length; i ++){
                    var src = _this.commentItem[i].profileUrl;
                    _this.commentItem[i].profileUrl = "http://10.251.253.212" + src;
                  }
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getTime(time) {

      var _time=new Date(time);
      var year=_time.getFullYear();//2017
      var month=_time.getMonth()+1;//7
      var date=_time.getDate();//10
      var hour=_time.getHours();//10
      var minute=_time.getMinutes();//56
      var second=_time.getSeconds();//15
      return year+"年"+month+"月"+date+"日"+hour+":"+minute+":"+second;
    },
    goRead(){
      window.location.href= this.httpUrl;
    },
    getAuthor(){
      var _this = this;
      axios.get("http://127.0.0.1:8081/paper/author/" + _this.$route.params.id)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.scholarid = response.data.data.id;
                  console.log("接口拿到id：" + _this.scholarid);
                  _this.scholarname = response.data.data.name;
                  _this.researchfield = response.data.data.field;
                  if (_this.researchfield === ""){
                    _this.researchfield = '未知';
                  }
                  _this.work = response.data.data.work;
                  if (_this.work === ""){
                    _this.work = '未知';
                  }
                  _this.getFollow();
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    toPage(){
      this.$router.push({
        name: 'Academic_home',
        params: {
          id : this.scholarid
        }
      })

    },
    follow(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/follow/insertFollow", {
          user: JSON.parse(sessionStorage.getItem("userL")).id,
          researcher: _this.scholarid
      })
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "关注成功",
                    type: "success",
                  });
                  _this.reload();
                  _this.canFollow = false;
                  _this.canCancelFollow = true;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    },
    getFollow(){
        if (sessionStorage.getItem('userL') === null) {
          this.canFollow = false;
          this.canCancelFollow = false;
        } else {
          var _this = this;
          axios.post("http://127.0.0.1:8081/follow/getStatus?user=" + JSON.parse(sessionStorage.getItem("userL")).id + "&researcher=" + _this.scholarid)
                  .then(function (response) {
                    if (response.data.status === 200) {
                      console.log("用户id：" + JSON.parse(sessionStorage.getItem("userL")).id);
                      console.log("学者id：" + _this.scholarid);
                      console.log("关注状态： " + response.data.data);
                      console.log("关注状态： " + response.data.msg);
                      if (response.data.data === 0) {
                        _this.canFollow = true;
                        _this.canCancelFollow = false;
                      } else {
                        _this.canFollow = false;
                        _this.canCancelFollow = true;
                      }
                    }
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
        }
    },
    cancelFollow(){
      var _this = this;
      axios.post("http://127.0.0.1:8081/follow/cancel?user=" + JSON.parse(sessionStorage.getItem("userL")).id + "&researcher=" + _this.scholarid)
              .then(function (response) {
                if (response.data.status === 200) {
                  _this.$message({
                    message: "取消关注成功",
                    type: "success",
                  });
                  _this.reload();
                  _this.canFollow = true;
                  _this.canCancelFollow = false;
                }
              })
              .catch(function (error) {
                console.log(error)
              })
    }
  },
  mounted() {
    //对整个页面滚轮进行监听，每发生一次滚轮事件，执行一次方法
    window.addEventListener("scroll", this.initHeight);

    // DOM异步更新 对未来更新后的视图进行操作 在更新后执行
    this.$nextTick(() => {
      //获取到达页面顶端的值
      var height = document.getElementById("fixedCard");
      this.offsetTop = height.offsetTop + 60;
      //获取宽度
      this.offsetWidth = height.offsetWidth;
      console.log(1);
    });
  },
  destroyed() {
    //移除监听
    window.removeEventListener("scroll", this.initHeight);
  },
    created() {
    console.log(this.$route.params.id);
      this.getDoc();
      this.getCollect();
      this.getComment();
      this.getAuthor();
      console.log("学者id:" + this.scholarid);
      if (sessionStorage.getItem("userL")=== null){
        this.hasLogin = false;
      }
      else {
        this.hasLogin = true;
        this.headSrc = "http://10.251.253.212" + JSON.parse(sessionStorage.getItem("userL")).avatar;
        console.log(JSON.parse(sessionStorage.getItem("userL")).avatar);
        this.getCollection();
      }
      console.log(this.hasLogin);
    },
  beforeCreate(){
    // 添加背景色
    document.querySelector('body').setAttribute('style', 'background-color:whitesmoke')
  },
  beforeDestroy(){
    document.querySelector('body').setAttribute('style', '')
  },
}
</script>

<style lang="less" scoped>
  .isFixed{
    position: fixed;
    top: 0;
  }
.el-header ,.el-footer {
    background-color:whitesmoke;
    color: #333;
    line-height: 60px;
    border-style: solid;
    border-width: 1.8px;
    border-color: grey;

  }

  .el-main {
    background-color: whitesmoke;
    color: #333;
    height: 500px;

  }
  .m-header{
    height: 140px  !important;
    line-height: 35px;
  }
  .l-header{
    height: 200px  !important;
  }
  .papertitle{
    font-style: normal;
    font-family: "黑体";
    font-size: 30px;
    font-weight: 200;
    text-align: center;
  }
  #papertable{
    padding: 0px;
    margin: 0px;
    border: none !important;
  }
  #papertable td{
    border: none !important;
  }
  .read_button{
    border-color: powderblue;
    background-color: rgb(209, 237, 243);
    font-size: 16px;
    font-weight: 500;
  }
  .star_button{
    background-color: rgb(253, 218, 153);
    font-size: 16px;
    font-weight: 500;
  }
.del_button{
  background-color: rgb(237, 134, 116);
  font-size: 16px;
  font-weight: 500;
}
  .reffer{
    font-weight: bold;
    margin-left: 200px;
    margin-top: 1px;
    line-height: 30px;
  }
  ul{
    list-style: none;
  }
  .el-select  {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

.body-top{
  background: url("../assets/background.jpg");
  width: 100%;
  background-size: 100%;
  height: 150px;
}
.body-form{
  padding-top: 50px;
  padding-left: 10%;
  padding-right: 10%;
}
.commentHead {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 50%;
}
.te .el-textarea__inner {
  font-size: 16px;
  color: #333333 !important;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif !important;
  line-height: 200%;
  background-color: #fafafa;
}
.tips {
  border-radius: 5px;
  padding: 5px;
  border: 3px solid white;
  border-left-color: RGB(80, 191, 255);
}
.commentTime {
  font-size: 14px;
  color: #969696;
  margin-top: 10px;
}
.commentName {
  float: left;
  margin-top: 10px;
  color: #409eff;
  font-size: 20px;
}
.commentText {
  margin-left: 8.3%;
}
  .main{
    width: 95%;
    margin-left: 2.5%;
    float: left;
    background-color: whitesmoke;
    padding-top: 20px;
  }
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-select {
     width: 150px;
     border:0px none;
 /* //    margin-top: 50px; */
 }
 .el-input {
    width: 800px;
    /* // height: 46px; */
    border-style: none;
    border:none;
  /* //  margin-top: 50px; */
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
</style>
