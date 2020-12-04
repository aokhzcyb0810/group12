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
                    <el-menu-item index="1-2">更改密码</el-menu-item>
                    <el-menu-item index="1-3">退出登录</el-menu-item>
                </el-submenu>
            </div>
            <div class="username">
                lzmshh
            </div>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "NavBar2",
        data(){
            return{
                profileUrl: require('@/assets/logo.png')
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
        position: relative;

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
</style>
