<template>
  <div id="main" style="width: 1500px">
    <div id="left" style="width: 1120px; float: left">
      <el-card class="box-card">
        <div>
          <span>
            <h1 class="titlestyle">{{ papertitle }}</h1>
            <el-button class="star_button" icon="el-icon-star-off" round
              >收藏</el-button
            >
          </span>
          <p>关键词：{{ keywords }}</p>
          <p>简介：{{ paperintro }}</p>
          <p>创作时间：{{ publishedtime }}</p>
          <h1 class="paperbody">正文</h1>
        </div>
      </el-card>
    </div>
    <div id="right" style="width: 380px; float: left">
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">关于作者</span>
        </div>
        <div>
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <span class="name">
            {{ scholarname }}
          </span>
        </div>
        <div id="main" style="width: 280px">
          <div id="left" style="width: 140px; float: left; text-align: center">
            <p>文献</p>
            <p>{{ papernum }}</p>

            <el-button plain>关注</el-button>
          </div>
          <div id="right" style="width: 140px; float: left; text-align: center">
            <p>研究领域</p>
            <p>{{ researchfield }}</p>

            <el-button plain>学者主页</el-button>
          </div>
        </div>
      </el-card>
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">评论</span>
        </div>
        <div v-for="item in papercomments" v-bind:key="item.id">
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <span class="name">
            {{ item.username }} {{ item.commentsdate }}
          </span>
          <div>
            <el-input
              v-model="item.usercomments"
              type="textarea"
              readonly="true"
              class="ocinput2"
            ></el-input>
            <br />
            <br />
            <el-input
              v-model="item.othercomments"
              type="textarea"
              readonly="true"
              class="ocinput2"
            ></el-input>
          </div>
        </div>
      </el-card>
    </div>

    <div id="some">
      <owncomments></owncomments>
    </div>
  </div>
</template>

<script>
import Owncomments from "../components/Owncomments.vue";

export default {
  components: { Owncomments },
  name: "paperread",
  data() {
    Owncomments
    return {
      papertitle: "文章标题",
      keywords: "BFS",
      paperintro: "文章简介",
      publishedtime: "这是创作时间",
      scholarhead: "",
      scholarname: "学者名a",
      papernum: 2,
      researchfield: "计算机",
      papercomments:[
        {id:'',
      username:'用户123456',
      usercomments:'文献的评论',
      commentsdate:'11-11',
      othercomments:'其他用户的评论',
      userhead:''}
      ],
      commentsinput:''
    };
  },
  methods: {
    errorHandler() {
      return true;
    },
  },
};
</script>
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 1000px;
  margin-left: 100px;
  margin-top: 40px;
}
.box-card1 {
  width: 320px;
  margin-top: 40px;
}
.box-card2 {
  width: 320px;
}
.titlestyle {
  color: rgb(175, 175, 245);
  font-size: 28px;
  font-family: "Microsoft YaHei";
  font-weight: unset;
}
.star_button {
  border-color: powderblue;
  background-color: rgb(209, 237, 243);
  font-size: 16px;
  font-weight: 500;
}
.paperbody {
  text-align: center;
  font-weight: unset;
}
.name {
  font-weight: bold;
  margin-left: 15px;
}
.owncomments {
  position: fixed;
  bottom: 0;
}
.ocinput {
  width: 300px;
  height: 100px;
  margin-left: 550px;
  border-radius: 8px;
  border: 1px solid lightgray;
  font-size: 14px;
}
.ocinput2 {
  font-family: "Microsoft YaHei";
  font-weight: bold;
}
</style>
