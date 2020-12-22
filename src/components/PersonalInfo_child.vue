<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div><span style="margin-left: 5%"><i class="el-icon-info"> 个人信息</i></span></div>
                </el-col>
                <el-col :span="12">
                    <div> </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <span style="margin-left: 48%"><i class="el-icon-message"> 消息</i></span>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div><p>   </p></div>
                </el-col>
                <el-col :span="4">
                    <div>
                         <el-button type="primary" v-show="isScholar" size="mini" style="float: right" @click="sendMessage">发送私信</el-button>
                                     
                    </div>
                </el-col>

            </el-row>
            <el-divider></el-divider>
            <table style="width: 100%">
                <tr>
                    <td style="width: 48%">
                        <div style="height: 700px;margin-top: 0%">
                            <el-form ref="form" :model="form" label-width="70px" :disabled="isuser" style="margin-left: 5%">
                                <el-form-item label="用户id">
                                    <el-input v-model="form.id" disabled style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <el-input v-model="form.trueName" :disabled="!editing" style="width: 300px" size="small"></el-input>
                                </el-form-item>

                                <el-form-item label="简介">
                                    <el-input type="textarea" v-model="form.info" :disabled="!editing" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button v-if="!editing" type="primary" style="margin-left:80px" @click="editing=true" size="small">修改</el-button>
                                    <el-button v-if="editing" type="primary" @click="Submit" size="small">完成修改</el-button>
                                    <el-button v-if="editing" style="margin-left: 160px" @click="editing=false" size="small">取消</el-button>
                                </el-form-item>
                            </el-form>
                            <span style="margin-left: 5%">编辑头像</span>
                            <div>
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload"
                                        style="margin-left: 30%">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </div>
                          <!--  <div style="text-align: center;margin-top: 3%">
                                <h4 v-show="!isScholar">你还未进行学者认证，<el-link type="primary" style="font-size: 16px" @click="toIdentify">点击这里</el-link>进行认证</h4>
                            </div> -->
                        </div>
                    </td>
                    <el-divider direction="vertical"></el-divider>
                    <td style="width: 48%">
                        <div style="margin-top: 0%;height: 700px">
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-top: 0px">
                                <el-menu-item index="1" @click="showSysMessagelist">系统通知</el-menu-item>
                                <el-menu-item index="2" @click="showScoMessagelist">学者私信</el-menu-item>
                                <el-menu-item index="3" @click="showMineMessagelist">我的私信</el-menu-item>
                            </el-menu>
                            <div style="height: 5px"></div>
                            <div v-for="(item,index) in message" :key="item" @click="viewMessage(item)">
                                <table style="width: 100%">
                                    <tr style="height: 60px">
                                        <td style="width: 10%">
                                            <div style="height: 60px;font-size: 35px">
                                                <i  v-show="item.read = 0" class="el-icon-s-release" style="color: red;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                                <i  v-show="item.read = 1" class="el-icon-s-claim" style="color: lawngreen;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="margin-left: 1%;margin-top:1px;font-size: 14px">
                                                {{item.from}}
                                            </div>
                                            <div style="margin-left: 1%;margin-top: 10px;font-size: 12px">
                                                {{item.text}}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <el-divider></el-divider>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>


            <el-dialog title="发送私信" :visible.sync="dialogFormVisible2"><!--发送私信-->
                <el-form :model="send_message">
                    <el-form-item label="收件人">
                        <el-input style="width: 45%; margin-left: 2%" v-model="send_message.to" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="私信内容">
                        <el-input type="textarea" style="width: 85%" v-model="send_message.text" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="submitSend">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="回复私信" :visible.sync="dialogFormVisible"><!--回复私信-->
                <el-form :model="message[select]">
                    <el-form-item label="寄件人">
                        {{message[select].from}}
                    </el-form-item>
                    <el-form-item label="私信内容">
                        {{message[select].text}}
                    </el-form-item>
                    <el-form-item label="回复内容">
                        <el-input type="textarea" v-model="this.reply"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitReply">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="学者认证" :visible.sync="dialogFormVisible3"><!--发送私信-->
                <el-form :model="identifyinfo">
                    <el-form-item label="申请用户id">
                        <el-input style="width: 45%; margin-left: 2%" v-model="identifyinfo.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份认证信息">
                        <el-input type="email" style="width: 65%" v-model="identifyinfo.identifyemail" autocomplete="off" placeholder="请填写邮箱"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="submitIdentify">确 定</el-button>
                </div>
            </el-dialog>

        </div>
    </div>

</template>
<script>

    import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
    import axios from "axios";

    export default {
        components: {
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'PersonalInfo_child',
        props: {
            msg: String
        },
        data() {
            return {

                editing:false,
                imageUrl: '',//头像
                isuser:false,
                isScholar:false,//是否是认证学者，是则为true
                activeIndex: '1',
                dialogFormVisible: false,//回复私信的dialog
                dialogFormVisible2: false,//发送私信的dialog
                dialogFormVisible3: false,//学者认证的dialog
                formLabelWidth: '120px',
                select:0,//选择查看哪一个消息
                reply:'',//回复内容
                form: {

                },
                //message数组看实际情况加载内容，比如在“系统通知”则加载系统通知，切换其它目录时清空后重新加载
                message:[{},{}],
                send_message:{
                    to: '',
                    text: ''
                },
                identifyinfo:{
                    id:'',//用户id
                    identifyemail: ''//认证邮箱
                }
            }
        },

        methods: {
            showUserinfo () {
                var _this=this;
                _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                _this.userid = _this.userL.id
                //axios.post('/message/sys?user=" + id)

                axios.post("/user/getUser?id=" + _this.userid)
                    .then(function (response) {
                        console.log(response.data)
                        _this.form = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })


                return 0
            },
            /*showSysMessagelist() {
                const res= this.$axios({
                    method:'get',
                    url:'/message/sys'
                }).catch(err=>{console.log(err)})
                this.message = res.data

                return 0
            },*/
            showScoMessagelist() {
                const res= this.$axios({
                    method:'get',
                    url:'/message/fromre'
                }).catch(err=>{console.log(err)})
                this.message = res.data
                return 0
            },
            showMineMessagelist() {
                const res= this.$axios({
                    method:'get',
                    url:'/message/mine'
                }).catch(err=>{console.log(err)})
                this.message = res.data
                return 0
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.avatar
                //this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            toIdentify(){
                this.dialogFormVisible3 = true

            },
            sendMessage() {
                this.dialogFormVisible2 = true
            },
            viewMessage(item){
                let postData = {
                    'Mid': item.id
                }
                this.$axios.post('/message/read', postData).then((response) => {
                    for(let i = 0; i < this.message.length; i++){
                        if(message[i].id == response.data.id){
                            this.select = i;
                            break;
                        }
                    }
                    this.message[select].isread = 1;//改变已读状态
                    this.dialogFormVisible = true;
                })

                this.$axios({//将新的状态返回
                    method:'post',
                    url:'/message/read',
                    data:{
                        Mid: item.id
                    }
                }).catch(err=>{console.log(err)})


            },
            submitReply() {
                this.$axios({//将回复内容返回
                    method:'post',
                    url:'/message/response',
                    data:{
                        from: item.from,
                        text: this.reply
                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible = false;
            },
            submitSend() {
                this.$axios({//将发送内容返回
                    method:'post',
                    url:'/message/send',
                    data:{
                        to: this.send_message.to,
                        text: this.send_message.text
                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible2 = false;
            },
            submitIdentify() {
                this.$axios({//将发送内容返回
                    method:'post',
                    url:'',
                    data:{

                    }
                }).catch(err=>{console.log(err)})
                this.dialogFormVisible3 = false;
            },
            Submit(){
                var _this=this;
                //_this.userL = JSON.parse(sessionStorage.getItem("userL"));
                this.editing=false;
                let postData = {
                    id: JSON.parse(sessionStorage.getItem("userL")).id,
                    trueName: _this.form.trueName,
                    //email: this.form.email,
                    info: _this.form.info,
                    avatar: _this.imageUrl
                }
                this.$axios.post('/user/info/change',postData)
                    .then(function (response) {
                        console.log(response)
                        _this.showUserinfo()
                    })
                    .catch(function (error) {
                        console.log(error)
                    })


            }



        },
        created(){
            this.showUserinfo();
            this.showSysMessagelist();
        },
    }

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .el-divider--vertical{
        height: 700px;
    }
    /* el-divider 修改高度&虚线效果 */
    .el-divider--horizontal{
        margin: 12px 3px;
        border-top: 1px dashed #e8eaec;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
