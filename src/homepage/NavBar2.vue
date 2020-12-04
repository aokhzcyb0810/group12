<template>
    <div>
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#3D4246"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="border: 0">
            <div class="logo-div">
                logo
            </div>
            <div class="menu">
                <el-submenu index="1">
                    <template slot="title"><img :src="this.profileUrl" class="userhead"/></template>
                    <el-menu-item index="1-1">个人空间</el-menu-item>
                    <el-menu-item index="1-2" @click="changePasswordVisible = true">更改密码</el-menu-item>
                    <el-menu-item index="1-3">退出登录</el-menu-item>
                </el-submenu>
            </div>
            <div class="username">
                欢迎，lzmshh
            </div>
        </el-menu>
        <el-dialog title="更改密码" :visible.sync="changePasswordVisible" width="35%" center>
            <div class="login-body">
                <el-form :model="form" :label-position="labelPos" :rules="rules">
                    <el-form-item label="输入原密码" style="margin-bottom: 15px" prop="password1">
                        <el-col span=24>
                            <el-input placeholder="PASSWORD" v-model="form.password1" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="输入新密码" style="margin-bottom: 20px" prop="password2">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="form.password2" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="确认新密码" style="margin-bottom: 20px" prop="password3">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="form.password3" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="button-row">
                    <el-button @click="changePasswordVisible = false">取 消</el-button>
                    <el-button type="primary" style="margin-left: 30px">更 改</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "NavBar2",
        data(){
            return{
                profileUrl: require('@/assets/logo.png'),
                changePasswordVisible: false,
                labelPos: 'right',
                form: {
                    password1: '',
                    password2: '',
                    password3: ''
                },
                rules: {
                    password1:[
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    password2:[
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    password3:[
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    ],
                },
            }
        }
    }
</script>

<style scoped>
    .logo-div{
        float: left;
        margin-left: 10%;
    }
    .menu{
        float: right;
        margin-right: 10%;
    }
    .username{
        float: right;
        margin-right: 30px;
        text-align: center;
        color: #fff;
        margin-top: 20px;

    }
    .userhead {
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 50%;
        float: right;
        text-align: center;
        margin-top: 7px;
        margin-right: 20px;
    }
    .login-body{
        margin-left: 10%;
        margin-right: 10%;
    }
    .button-row{
        text-align: center;
    }
</style>
