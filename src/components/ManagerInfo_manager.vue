<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div><span style="margin-left: 5%"><i class="el-icon-info"> 管理员检索</i></span></div>
                </el-col>
            </el-row>
            <el-row>
              <h1>搜索框</h1>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div><span style="margin-left: 5%"><i class="el-icon-info"> 管理员通知信息</i></span></div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                </el-col>
                <el-col :span="12">
                    <div> </div>
                </el-col>
                <el-col :span="8">
                    <div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div><p>   </p></div>
                </el-col>
                <el-col :span="4">
                    <div>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <table style="width: 100%">
                <tr>
                    <el-divider direction="vertical"></el-divider>
                    <td style="width: 48%">
                        <div style="margin-top: 0%;height: 700px">
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-top: 0px">
                                <el-menu-item index="1" @click="showCerMessagelist">学者认证</el-menu-item>
                                <el-menu-item index="2" @click="showAddPaperMessagelist">学者文献添加</el-menu-item>
                                <el-menu-item index="3" @click="showMineMessagelist">我的私信</el-menu-item>
                            </el-menu>
                            <div style="height: 5px"></div>
                            <div v-for="(item) in message" :key="item" @click="viewMessage(item)">
                                <table style="width: 100%">
                                    <tr style="height: 60px">
                                        <td style="width: 10%">
                                            <div style="height: 60px;font-size: 35px">
                                                <i  v-show="item.isread = 0" class="el-icon-s-release" style="color: red;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                                <i  v-show="item.isread = 1" class="el-icon-s-claim" style="color: lawngreen;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
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
                    <td style="width:48%">hhh</td>
                </tr>
            </table>


            <!-- <el-dialog title="发送私信" :visible.sync="dialogFormVisible2">
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

            <el-dialog title="回复私信" :visible.sync="dialogFormVisible">
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
            </el-dialog> -->

        </div>
    </div>

</template>
<script>

    import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";

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
                imageUrl: '',//头像
                isuser:false,
                isScholar:true,//是否是认证学者，是则为true
                activeIndex: '1',
                dialogFormVisible: false,//回复私信的dialog
                dialogFormVisible2: false,//发送私信的dialog
                formLabelWidth: '120px',
                select:0,//选择查看哪一个消息
                reply:'',//回复内容
                form: {
                    id: this.$store.state.userid,
                    name: '',
                    email: '',
                    info: ''
                },
                //message数组看实际情况加载内容，比如在“系统通知”则加载系统通知，切换其它目录时清空后重新加载
                message:[],
                send_message:{
                    to: '',
                    text: ''
                }
            }
        },
        created(){
            this.showUserinfo();
            this.showSysMessagelist();
        },
        methods: {
            showCerMessagelist() {
                const res= this.$axios({
                    method:'get',
                    url:'/message/sys'
                }).catch(err=>{console.log(err)})
                this.message = res.data

                return 0
            },
            showCAddPaperMessagelist() {
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
            Submit(){
                let postData = {
                    'id': parseInt(this.$store.state.userID),
                    'name': this.form.name,
                    'email': this.form.email,
                    'info': this.form.info
                }
                this.$axios.post('/api/user/edit', postData).catch(err=>{console.log(err)})
                this.showUserinfo()
            }



        }
    }

</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  // .el-row {
  //   margin-bottom: 50px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
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
