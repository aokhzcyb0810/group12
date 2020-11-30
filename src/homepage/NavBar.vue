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
                            <el-input placeholder="EMAIL" v-model="form.userName" autocomplete="off" clearable></el-input>
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
                    <el-button type="primary" style="margin-left: 30px">登 录</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog title="注册" :visible.sync="registerFormVisible" width="40%" center top="10px">
            <div class="login-body">
                <el-form :model="reForm" :label-position="labelPos" :rules="reRules">
                    <el-form-item label="输入邮箱" style="margin-bottom: 15px" prop="userName">
                        <el-col span=24>
                            <el-input placeholder="EMAIL" v-model="reForm.userName" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="输入验证码" style="margin-bottom: 15px" prop="verification">
                        <el-row>
                            <el-col :span="20">
                                <el-input placeholder="VERIFICATION CODE" v-model="reForm.userName" autocomplete="off" clearable></el-input>
                            </el-col>
                            <el-col :span="4">
                                <div class="timer">
                                    <span v-show="show" @click="getCode">获取验证码</span>
                                    <span v-show="!show" class="count">{{count}} s</span>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="输入用户名" style="margin-bottom: 15px" prop="name">
                        <el-col span=24>
                            <el-input placeholder="USERNAME" v-model="reForm.userName" autocomplete="off" clearable></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="输入密码" style="margin-bottom: 20px" prop="password">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="reForm.password" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="确认密码" style="margin-bottom: 20px" prop="passwordConfirm">
                        <el-col span="24">
                            <el-input placeholder="PASSWORD" v-model="reForm.password" autocomplete="off" show-password></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div class="word-button" style="text-align: center" @click="openLogin">
                    已有账号？点此登录
                </div>
                <div style="margin-left: 25%">
                    <el-button @click="registerFormVisible = false">取 消</el-button>
                    <el-button type="primary" style="margin-left: 50px">确 定</el-button>
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
                registerFormVisible: true,
                labelPos: 'right',
                show: true,
                count: '',
                timer: null,
                form: {
                    userName: '',
                    password: ''
                },
                reForm: {
                    userName: '',
                    verification: '',
                    name: '',
                    password: '',
                    passwordConfirm: ''
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
                    verification:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ],
                    name:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    passwordConfirm:[
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            openRegister(){
                this.loginFormVisible = false;
                this.registerFormVisible = true;
            },
            getCode() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            openLogin(){
                this.loginFormVisible = true;
                this.registerFormVisible = false;
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
    .timer{
        background-color: #409EFF;
        color: white;
        font-size: 10px;
        text-align: center;
        margin-left: 3px;
        border-radius: 3px;
        line-height: 3em;
        margin-top: 5px;
    }
</style>
