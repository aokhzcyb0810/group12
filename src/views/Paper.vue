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
              <el-form-item>
                <el-input v-model="searchForm.text"><i slot="suffix" class="el-input__icon el-icon-search search-button"></i></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="text-align: center">
              <div v-if="searchForm.radio === '1'">
                <el-form-item>
                  <el-button type="primary" @click="formVisible = true">设置搜索条件</el-button>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item>
                  <el-button type="primary" disabled>设置搜索条件</el-button>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  <div style="width: 100%; background-color: whitesmoke;padding-bottom: 20px; padding-top: 20px;">
    <el-card style="width: 90%; margin-left: 5%" shadow="hover">
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
        <el-button class="read_button" icon="el-icon-reading" round>阅读</el-button>
        <el-button class="star_button" icon="el-icon-star-off" round v-show="canCollect" @click="formVisible = true">收藏</el-button>
        <el-button class="star_button" icon="el-icon-star-off" round v-show="canCancel" @click="cancelCollect">取消收藏</el-button>
      </el-row>
    </el-card>
    <el-card style="margin-top: 20px;width: 90%; margin-left: 5%" shadow="hover">
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
            <div v-show="showSubmit">
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
    <el-card style="margin-top: 20px; width: 90%; margin-left: 5%;" shadow="hover">
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
  </div>
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
                if (response.data.status === 200) {
                  _this.commentItem = response.data.data;
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
  },
    created() {
      this.getDoc();
      this.getCollect();
      this.getCollection();
      this.getComment();
      this.headSrc = "http://10.251.253.212" + JSON.parse(sessionStorage.getItem("userL")).avatar;
    }
}
</script>

<style scoped>
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
</style>
