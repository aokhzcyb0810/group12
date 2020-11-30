<template>
    <div>
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#3D4246"
                text-color="#fff"
                active-text-color="#ffd04b">
            <div class="logo-div">
                logo
            </div>
            <div class="menu">
                <el-menu-item index="1" @click="loginFormVisible = true">登录/注册</el-menu-item>
            </div>
        </el-menu>

        <el-dialog title="登录" :visible.sync="loginFormVisible" width="35%" center>
            <div class="login-body">
                <el-form :model="form" :label-position="labelPos" :rules="rules">
                    <el-form-item label="输入邮箱" style="margin-bottom: 15px" prop="userName">
                        <el-col span=24>
                            <el-input placeholder="USERNAME" v-model="form.userName" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="输入密码" style="margin-bottom: 20px" prop="password">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="form.password" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="word-button">
                    <el-row>
                        <el-col :span="6">
                            <div  @click="openRegister">
                                新用户注册
                            </div>
                        </el-col>
                        <el-col :span="6">
                            忘记密码？
                        </el-col>
                    </el-row>
                </div>
                <div class="button-row">
                    <el-button @click="loginFormVisible = false">取 消</el-button>
                    <el-button type="primary" style="margin-left: 30px">确 定</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="注册" :visible.sync="registerFormVisible" width="35%" center>
            <div class="login-body">
                <el-form :model="reForm" :label-position="labelPos" :rules="reRules">
                    <el-form-item label="输入邮箱" style="margin-bottom: 15px" prop="userName">
                        <el-col span=24>
                            <el-input placeholder="USERNAME" v-model="reForm.userName" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="输入密码" style="margin-bottom: 20px" prop="password">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="reForm.password" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="word-button">
                    <el-row>
                        <el-col :span="6">
                            <div  @click="openRegister">
                                新用户注册
                            </div>
                        </el-col>
                        <el-col :span="6">
                            忘记密码？
                        </el-col>
                    </el-row>
                </div>
                <div class="button-row">
                    <el-button @click="registerFormVisible = false">取 消</el-button>
                    <el-button type="primary" style="margin-left: 30px">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return{
                activeIndex: '1',
                loginFormVisible: false,
                registerFormVisible: false,
                labelPos: 'right',
                form: {
                    userName: '',
                    password: ''
                },
                reForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                },
                reRules: {
                    userName:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            openRegister(){
                this.loginFormVisible = false;
                this.registerFormVisible = true;
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
    .login-body{
        margin-left: 10%;
        margin-right: 10%;
    }
    .button-row{
        margin-left: 20%;
    }
    .word-button{
        margin-bottom: 20px;
        font-size: small;
        color: #62AAFF;
    }
</style>
