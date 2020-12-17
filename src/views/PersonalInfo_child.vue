<template>
    <div>
        <div>
            <el-row>
                <el-col span=8>
                    <div><span style="margin-left: 5%"><i class="el-icon-info"> 个人信息</i></span></div>
                </el-col>
                <el-col :span="12">
                    <div> </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <span style="margin-left: 45%"><i class="el-icon-message"> 消息</i></span>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div><p>   </p></div>
                </el-col>
                <el-col :span="4">
                    <div>
                        <el-button type="primary" v-show="isScholar" size="mini" style="float: right">发送私信</el-button>
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
                                    <el-input v-model="form.name" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="学者id">
                                    <el-input v-model="form.sid" disabled style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item
                                        prop="email"
                                        label="邮箱"
                                >
                                    <el-input v-model="form.email" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input type="textarea" v-model="form.info" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Submit" size="small">完成修改</el-button>
                                    <el-button style="margin-left: 160px" size="small">取消</el-button>
                                </el-form-item>
                            </el-form>
                            <span style="margin-left: 5%">编辑头像</span>
                            <div>
                                <el-avatar :size="100" style="margin-left: 40%;margin-top: 5%"></el-avatar>
                            </div>
                            <div>
                                <el-button style="margin-left: 43%;margin-top: 5%">保存</el-button>
                            </div>
                            <div style="text-align: center;margin-top: 3%">
                                <h4 v-show="!isScholar">你还未进行学者认证，<el-link type="primary" style="font-size: 16px" @click="toIdentify">点击这里</el-link>进行认证</h4>
                            </div>
                        </div>
                    </td>
                    <el-divider direction="vertical"></el-divider>
                    <td style="width: 48%">
                        <div style="margin-top: 0%;height: 700px">
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="margin-top: 0px">
                                <el-menu-item index="1">系统通知</el-menu-item>
                                <el-menu-item index="2">学者私信</el-menu-item>
                                <el-menu-item index="3">我的私信</el-menu-item>
                            </el-menu>
                            <div style="height: 5px"></div>
                            <div v-for="(item,index) in message" :key="item" @click="viewMessage(index)">
                                <table style="width: 100%">
                                    <tr style="height: 60px">
                                        <td style="width: 10%">
                                            <div style="height: 60px;font-size: 35px">
                                                <i  v-show="!item.isread" class="el-icon-s-release" style="color: red;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                                <i  v-show="item.isread" class="el-icon-s-claim" style="color: lawngreen;margin-bottom: 5px;margin-left: 5px;margin-top: 10px"></i>
                                            </div>
                                        </td>
                                        <td>
                                            <div style="margin-left: 1%;margin-top:1px;font-size: 14px">
                                                {{item.sender}}
                                            </div>
                                            <div style="margin-left: 1%;margin-top: 10px;font-size: 12px">
                                                {{item.content}}
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
            <el-dialog title="回复私信" :visible.sync="dialogFormVisible">
                <el-form :model="message[select]">
                    <el-form-item label="寄件人" :label-width="formLabelWidth">
                        {{message[select].sender}}
                    </el-form-item>
                    <el-form-item label="私信内容" :label-width="formLabelWidth">
                        {{message[select].content}}
                    </el-form-item>
                    <el-form-item label="回复内容" :label-width="formLabelWidth">
                        <el-input v-model="message[select].reply"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
                isuser:false,
                isScholar:true,//是否是认证学者，是则为true
                activeIndex: '1',
                dialogFormVisible: false,//发送私信的dialog
                formLabelWidth: '120px',
                select:0,//选择查看哪一个消息
                form: {
                    id: '123456789',
                    sid: '',
                    name: this.$store.state.userid,
                    email: '',
                    info: ''
                },
                //message数组看实际情况加载内容，比如在“系统通知”则加载系统通知，切换其它目录时清空后重新加载
                message:[{
                    sender:'系统',
                    content:'通知1',
                    isread:true,//消息是否已读，已读为true
                    reply:''
                },{
                    sender:'系统',
                    content:'通知2',
                    isread:false,
                    reply:''
                },{
                    sender:'系统',
                    content:'通知3',
                    isread:false,
                    reply:''
                }]
            }
        },
        created(){
            this.showuerinfo()
        },
        methods: {
            toIdentify(){
                this.$router.replace(
                    {path:"",
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            viewMessage(index){
                this.dialogFormVisible=true;
                this.select=index;
                if(this.message[index].isread==false)
                    this.message[index].isread=true;

            },
            /*async Submit() {
                var usex
                if(this.form.sex=='男')
                    usex=1
                else if(this.form.sex=='女')
                    usex=0
                console.log(this.form.sex)
                const res= await this.$axios({
                    type:'formData',
                    method:'post',
                    url:'/user/info/change',
                    data:{
                        Name:this.$store.state.userid,
                        Email:this.form.email,
                        Area:this.form.region,
                        Birthday:this.form.birth,
                        Sex:usex,
                        Sign:this.form.info
                    }
                }).catch(err=>{console.log(err)})
                console.log(res)
                alert('修改完成!');//这里还要保存修改后的数据
                this.showuerinfo()
            },
            async showuerinfo(){
                //  const res
                var nowname=''
                if(this.$route.query.Name)
                    nowname=this.$route.query.Name
                else
                    nowname=this.form.name
                //  console.log(this.$route.Name)
                if(nowname==this.$store.state.userid){
                    const res= await this.$axios({
                        method:'get',
                        url:'/user/info'
                    }).catch(err=>{console.log(err)})
                    console.log(res)
                    this.form.name=res.data.Name
                    this.form.birth=res.data.Birthday
                    this.form.email=res.data.Email
                    this.form.region=res.data.Area
                    this.form.info=res.data.Sign
                    var usex
                    if(res.data.Sex==1)
                        this.form.sex="男"
                    else if(res.data.Sex==0)
                        this.form.sex="女"
                    console.log('fasddasd')
                    this.isuser=false
                }
                else{
                    var uid=parseInt(this.$route.query.Uid)
                    const res= await this.$axios({
                        method:'get',
                        url:'/user/otherinfo',
                        params:{
                            Uid:uid
                        }
                    }).catch(err=>{console.log(err)})
                    console.log(res)
                    this.form.name=res.data.Name
                    this.form.email=res.data.Email
                    this.form.info=res.data.Sign
                    var usex
                    if(res.data.Sex==1)
                        this.form.sex="男"
                    else if(res.data.Sex==0)
                        this.form.sex="女"
                    this.isuser=true
                }
            }*/

        }
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

</style>
