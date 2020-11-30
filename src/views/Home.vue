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
        <el-dialog :visible.sync="formVisible" width="35%" center>
            <div class="login-body">
                <el-form :model="searchForm" label-position="right">
                    <el-form-item label="学者名" style="margin-bottom: 15px" prop="name">
                        <el-col span=24>
                            <el-input placeholder="NAME" v-model="searchForm.name" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="关键词" style="margin-bottom: 15px" prop="key">
                        <el-col span=24>
                            <el-input placeholder="KEY" v-model="searchForm.key" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="发表时间" style="margin-bottom: 30px" prop="time">
                        <el-col span=24>
                            <el-date-picker
                                    v-model="searchForm.time"
                                    type="date"
                                    placeholder="请选择日期"
                                    style="width: 100%">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="button-row">
                    <el-button type="primary" style="width: 100%" @click="formVisible = false">完 成</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import NavBar from "../homepage/NavBar";
    export default {
        name:"home",
        components: {NavBar},
        data(){
            return{
                searchForm:{
                    radio: '',
                    text: '',
                    name: '',
                    key: '',
                    time: ''
                },
                formVisible: false,
            }
        },
        methods:{
        }
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
</style>

