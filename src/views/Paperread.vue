<template>
  <div id="main" style="width: 1500px">
    <NavBar></NavBar>
    <div id="left" style="width: 1120px; float: left">
      <el-card class="box-card">
        <div>
          <span>
            <h1 class="titlestyle">{{ papertitle }}</h1>
            <el-button
              class="star_button"
              icon="el-icon-star-off"
              round
              @click="dialogVisible = true"
              >收藏</el-button
            >
            
          </span>
          <p>关键词：{{ keywords }}</p>
          <p>简介：{{ paperintro }}</p>
          <p>创作时间：{{ publishedtime }}</p>
          <h1 style="text-align: center; font-weight: unset">正文</h1>
          <div v-for="item in paperbody" :key="item.paperh">
            <h3 class="paperh">{{ item.paperh }}</h3>
            <p class="paperp" v-for="item1 in item.paperp" :key="item1">
              {{ item1 }}
            </p>
          </div>
        </div>
      </el-card>
    </div>
    <div id="right" style="width: 380px; float: left">
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">关于作者</span>
        </div>
        <div>
          <el-avatar :size="60" :src="scholarurl">
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
      <br />
      <br />
      <el-card class="box-card2">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">评论</span>
        </div>
        <div v-for="item in papercomments" v-bind:key="item.id">
          <el-avatar :size="60" :src="item.userurl" @error="errorHandler">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <span class="name">
            {{ item.username }} {{ item.commentsdate }}
          </span>
          <div>
            <br />
          </div>
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
import NavBar from "../homepage/NavBar";
import NavBar2 from "../homepage/NavBar2";

export default {
  components: { Owncomments, NavBar, NavBar2 },
  name: "paperread",
  data() {
    Owncomments;
    return {
      papertitle: "文章标题",
      keywords: "BFS",
      paperintro: "文章简介",
      publishedtime: "这是创作时间",
      scholarhead: "",
      scholarname: "学者名a",
      scholarurl: require("../assets/logo.png"),
      papernum: 2,
      researchfield: "计算机",
      papercomments: [
        {
          id: "",
          userurl: require("../assets/logo.png"),
          username: "用户123456",
          usercomments: "文献的评论",
          commentsdate: "11-11",
          othercomments: "其他用户的评论",
          userhead: "",
        },
      ],
      commentsinput: "",
      collectForm:{
        collect: 1
      },
      options: [{
        value: 1,
        label: '收藏夹1'
      }, {
        value: 2,
        label: '收藏夹2'
      }],
      canCollect: true,
      canCancel: true,

      paperbody: [
        {
          paperh: "语音技术",
          paperp: [
            "百度语音技术基于业界领先的声学模型和语音模型，可将声音与文字信息进行相互转换，可用于智能导航、语音输入、语音搜索、智能客服、文字有声阅读等场景。主要包括语音识别、语音合成、语音唤醒三大能力。",
          ],
        },
        {
          paperh: "知识图谱",
          paperp: [
            "百度知识图谱是全球最大规模中文知识图谱，包含6亿实体、3780亿事实，面向开放域多形态数据的知识挖掘技术及高性能图检索和计算框架，突破了传统知识获取规模小、成本高、效率低的瓶颈，实现了千亿级知识的实时查询和计算。",
            "在知识图谱规模、图谱数据容量及检索性能等指标上均达国际领先水平。知识图谱大规模应用于百度搜索、信息流、百度地图和对话式人工智能操作系统，覆盖超过85%的搜索请求，日均用户请求超过13亿次。",
          ],
        },
        {
          paperh: "视觉技术",
          paperp: [
            "百度图像技术是基于深度学习算法，输出多种核心人工智能视觉技术，包括图像识别、人脸与人体识别、视频技术、AR与VR等AI能力和多场景的行业解决方案。百度大脑图像处理技术可智能识别图像类别、内容和含义，支持基于图像识别的场景应用。百度视频技术，输出视频内容分析、封面选区、对比检索、内容审核等能力。",
          ],
        },
      ],
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
html {
  color: #000;
  background: #fff;
}
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
.name {
  font-weight: bold;
  margin-left: 15px;
}
.paperp {
  text-indent: 2em;
  line-height: 2;
  margin: 1em;
  text-align: left;
}
.paperh {
  text-align: left;
  margin: 1em;
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
