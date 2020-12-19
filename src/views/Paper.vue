<template>
<div >
  <el-container>
  <el-header class='m-header'>
    <div style="margin-top: 40px;">
  <el-input placeholder="搜索文档标题" v-model="retrieve" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择检索类型">
      <el-option label="学术资源检索" value="1"></el-option>
      <el-option label="科研工作者检索" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</div>
  </el-header>
  <el-main>
    <h1 class="papertitle">{{papertitle}}</h1>
    <el-table :data ="paperdata" style = "width : 100%" id="papertable">
      <el-table-column
        prop="key"
        width="400"
        align="right">
      </el-table-column>
      <el-table-column
        prop="value"
        width="1000">
      </el-table-column>
    </el-table>
    <br>
    <br>
    <br>
    <el-row>
      <el-button class="read_button" icon="el-icon-reading" round>阅读</el-button>
      <el-button class="star_button" icon="el-icon-star-off" round>收藏</el-button>
    </el-row>
  </el-main>
  <el-footer class='l-header'>
    <p class="reffer">参考文献</p>
    <ul class="reffer">
      <li v-for= "item in reference" v-bind:key = item.key>{{item.key}}  {{item.value}}</li>
    </ul>
  </el-footer>
</el-container>
</div>

</template>

<script>
export default {
  name: "Paper",
  data() {
    return {
      papertitle: ' 文章标题',
      paperdata: [{
        key:'摘要',
        value:'tem_abstract'
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
    margin-left: 680px;
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
    margin-left: 400px;
    font-size: 16px;
    font-weight: 500;
    
  }
  .star_button{
    background-color: rgb(253, 218, 153);
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
</style>