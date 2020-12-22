<template>
    <div>
        <NavBar></NavBar>
        <div class="body-top">
            <h1>May the force be with you.</h1>
            <h2>愿原力与你同在</h2>
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
                            <el-input placeholder="请输入搜索内容" v-model="searchForm.text" class="searchinput input-with-select">
                                <el-select v-model="searchForm.select" slot="prepend" placeholder="请选择学科" style="width: 120px;">
                                    <el-option :label="item.name"  v-for="item in xuekeliebiao" :key=item.name style="height:40px;overflow:auto">{{item.name}}</el-option>
                                </el-select>
                                <i slot="suffix" class="el-input__icon el-icon-search search-button" style="cursor: pointer;"></i>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div style="width: 100%; margin-top: 20px;">
            <el-row>
                <el-col :span="12">
                    <div class="hotArticle">
                        <h1 style="text-align: center;">热点论文</h1>
                        <ul style="list-style: none;margin: 0; padding: 0;">
                            <li v-for="(item, index) in hotArticle" :key="index">
                                <el-row>
                                    <el-col :span="2">
                                        <i class="el-icon-edit-outline" style="font-size: 30px; color: gray;"></i>
                                    </el-col>
                                    <el-col :span="22">
                                        <h2 style="margin-top: 12px;" @click="toDoc(item.paperId)">{{item.title}}</h2>
                                        <span class="detail">
                                            published at {{item.date}} by {{item.author}}
                                        </span>
                                        <span class="temperature">
                                            <i class="el-icon-trophy"></i>
                                            {{item.heat}}
                                        </span>
                                        <el-divider></el-divider>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </div>
                </el-col>
                <el-col :span="12">
                    <h1 style="text-align: center;">热点领域</h1>
                    <div style="margin-left: 10%; margin-right: 10%">
                        <ul style="list-style: none;margin: 0; padding: 0;">
                            <li v-for="(item, index) in hotSpot" :key="index" class="hotSpot-li">
                                <a>{{item}}</a>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavBar from "../homepage/NavBar";
    import NavBar2 from "../homepage/NavBar2";
    import axios from "axios";
    export default {
        name:"home",
        components: {NavBar, NavBar2},
        data(){
            return{
                xuekeliebiao:[{name:"全部学科"},{name:'java'},{name:'jaa'},{name:'jva'},{name:'ava'},{name:'java'},{name:'java'},],
                xueke:'',
                searchForm:{
                    radio: '1', //1代表搜索文章，2代表搜索学者
                    text: '',  //搜索框内的内容
                    select: '',  //所选择的领域
                },
                formVisible: false,
                hotArticle: [
                    {
                        paperID: 1,
                        title: '我是文章标题',
                        author: '我是文章作者',
                        date: '我是创作时间',
                        heat: '111'
                    },
                    {
                        paperID: 1,
                        title: '我是大笨笨',
                        author: 'nzm',
                        date: '2020-12-5',
                        heat: '222'
                    },
                    {
                        paperID: 1,
                        title: '如何学习OS',
                        author: 'YuanCZ',
                        date: '2020-9-4',
                        heat: '10086'
                    },
                ],
                hotSpot: [
                    "闪耀暖暖",
                    "原力",
                    "奥利给",
                    "武德",
                    "摸鱼",
                    "乌兹永远滴神",
                    "凑数tag",
                    "试试换行效果"
                ]
            }
        },
        methods:{
            getHotArticle(){
                var _this=this;
                axios.get("http://127.0.0.1:8081/hot/paper")
                    .then(function (response) {
                        if(response.data.status === 200){
                            _this.hotArticle = response.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            getHotSpot(){
                var _this=this;
                axios.get("http://127.0.0.1:8081/hot/field")
                    .then(function (response) {
                        if(response.data.status === 200){
                            _this.hotSpot = response.data.data;
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            },
            toDoc(did){
                console.log("id是------------" + did);
                this.$router.push({
                    name: 'paper',
                    params:{
                        id: did
                    }
                });
            }
        },
        created() {
            this.getHotArticle();
            this.getHotSpot();
        },
        computed:{
            fangshi(){
                if(this.dangqianfangshi==1)
                    return '当前为关键字搜索'
                else
                    return '当前为模糊搜索'
            }
        },
    }
</script>

<style lang="less" scoped>
    .body-top{
        background: url("../assets/background.jpg");
        background-size: 100%;
        height: 320px;
    }
    .body-top h1{
        margin: 0;
        color: white;
        text-align: center;
        padding-top: 50px;
    }
    .body-top h2{
        color: white;
        text-align: center;
        font-weight: lighter;
    }
    .body-form{
        padding-top: 50px;
        padding-left: 10%;
        padding-right: 10%;
    }
    .login-body{
        margin-left: 5%;
        margin-right: 5%;
    }
    .button-row{
        text-align: center;
    }
    .hotArticle{
        margin-left: 10%;
        margin-right: 10%;
    }
    .title{
        font-size: 25px;
    }
    .detail{
        color: gray;
        font-size: 15px;
    }
    .temperature{
        float:right;
        color: gray;
        font-size: 15px;
    }
    .hotSpot-li{
        margin-bottom: 10px;
    }
    .hotSpot-li a{
        background-color: RGB(244,244,245);
        color: #606266;
        float: left;
        margin-left: 3px;
        margin-right: 3px;
        border-radius: 3px;
        padding: 6px 6px 6px 6px;
        margin-bottom: 10px;
    }
    .hotSpot-li a:hover{
        background-color: #C0C4CC;
        transition-duration: 0.3s;
    }
</style>

