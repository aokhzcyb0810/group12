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
  <div style="width: 100%; background-color: whitesmoke;padding-bottom: 20px">
    <el-card style="width: 90%; margin-left: 5%; margin-top: 20px" shadow="hover">
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
      <div v-if="isManager">
        <el-row style="text-align: center">
          <el-button class="read_button" icon="el-icon-reading" round>阅读</el-button>
          <el-button class="star_button" icon="el-icon-star-off" round>收藏</el-button>
          <el-button class="del_button" icon="el-icon-close" round>删除</el-button>
        </el-row>
      </div>
      <div v-else>
        <el-row style="text-align: center">
          <el-button class="read_button" icon="el-icon-reading" round>阅读</el-button>
          <el-button class="star_button" icon="el-icon-star-off" round>收藏</el-button>
        </el-row>
      </div>
    </el-card>
    <el-card style="margin-top: 20px;width: 90%; margin-left: 5%" shadow="hover">
      <div>
        <el-form :model="Form" :rules="rule" ref="Form">
          <el-row style="margin-top: 10px;">
            <el-col span="2">
              <img :src="headSrc" class="commentHead" />
            </el-col>
            <el-col span="22">
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
                <el-col span="24">
                  <el-form-item>
                    <el-button
                            type="primary"
                            style="float: right; margin-right: 5%"
                            icon="el-icon-edit"
                            round
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
        <el-col span="1">
          <div class="tips">
            <p></p>
          </div>
        </el-col>
        <el-col span="23" style="margin-top: 5px">评论</el-col>
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
            <p>{{item.dateTime}}</p>
          </div>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
    </el-card>
  </div>
</div>

</template>

<script>
import NavBar from "../homepage/NavBar";
export default {
  name: "Paper",
  components: {NavBar},
  data() {
    return {
      headSrc: require("../assets/logo.png"),
      showSubmit: false,
      isManager: true,
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
      reference:[{
        key:'[1]',
        value:'参考文献1'
      },
      {
        key:'[2]',
        value:'参考文献2'
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
    };
  },
};
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
  .el-input {
    widows: 200px;
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
