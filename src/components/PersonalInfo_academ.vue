<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div><span style="margin-left: 5%"><i class="el-icon-info"> 学者信息</i></span></div>
                </el-col>
                <el-col :span="12">
                    <div> </div>
                </el-col>
                <el-col :span="8">
                    <div>
                        <span style="margin-left: 48%"><i class="el-icon-view"> 学者关系</i></span>
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
                        <div style="margin-top:-5%" >
                            <!--
                            <el-form ref="form" :model="form" label-width="70px" :disabled="isuser" style="margin-left: 5%">
                                <el-form-item label="用户id">
                                    <el-input v-model="form.id" disabled style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="姓名">
                                    <el-input v-model="form.name" :disabled="!editing" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item
                                        prop="email"
                                        label="邮箱"
                                >
                                    <el-input v-model="form.email" :disabled="!editing" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input type="textarea" v-model="form.info" :disabled="!editing" style="width: 300px" size="small"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button v-if="!editing" type="primary" style="margin-left:80px" @click="editing=true" size="small">修改</el-button>
                                    <el-button v-if="editing" type="primary" @click="Submit" size="small">完成修改</el-button>
                                    <el-button v-if="editing" style="margin-left: 160px"@click="editing=false" size="small">取消</el-button>
                                </el-form-item>
                            </el-form>
                            -->
                        <div>
                            <p >ID:  {{researcher.id}}</p>
                            <p style="margin-top:3%">姓名： {{researcher.truename}}</p>
                            <p style="margin-top:3%">研究领域：  {{researcher.field1}},{{researcher.field2}},{{researcher.field3}}</p>
                            <p style="margin-top:3%">合作机构：  {{researcher.organization}}</p>
                            <p style="margin-top:3%">论文数量：  {{researcher.paperCount}}篇</p>
                            <p style="margin-top:3%">Hindex  ：{{researcher.index}}</p>

                        </div>
                        <div style="margin-left: 5%;margin-top: 10%">
                                <span>上传头像</span>
                        </div>

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
                            <div style="text-align: center;margin-top: 3%">
                                <h4 v-show="!isScholar">你还未进行学者认证，<el-link type="primary" style="font-size: 16px" @click="toIdentify">点击这里</el-link>进行认证</h4>
                            </div>
                        </div>
                    </td>
                    <el-divider direction="vertical"></el-divider>
                    <td style="width: 48%">
                        <div>
                            <!--关系图表-->
                            <div class="Echarts">
                                <div id="main" style="width:400px;height: 400px">
                                </div>
                                
                            </div>
                        </div>
                        <!--
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

                            </div>
                        </div>
                        -->
                    </td>
                </tr>
            </table>
                        <el-divider></el-divider>
            <span style="font-size:25px;">学者文献</span>
            <el-button type="primary" @click="add_file" style="margin-left:90% ; ">
                <i class="el-icon-document" ></i><span>添加文献</span>
            </el-button>
            <el-main>
                <el-table :data="doc_table" style="width:100%" :row-style="{height:'30px'}">
                    <el-table-column prop="title" label="题目" @contextmenu.prevent=""></el-table-column>
                    <el-table-column prop="paperTime" label="发表时间" width="240px"></el-table-column>
                    <el-table-column prop="field" label="领域" width="120px"></el-table-column>
                    <el-table-column prop="citation" label="被引用量" width="120px"></el-table-column>
                           <el-table-column fixed="right" width="50">
              <template slot-scope="scope">
                <el-tooltip  effect="dark" content="删除" placement="bottom-end">
                  <el-button @click.native="delFile(scope.row.id)" type="text" style="color: #999" size="mini">
                    <i class="el-icon-delete-solid"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
                </el-table>
            </el-main>


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

    export default {
        name:'Echarts',
        mounted()
        {
            this.myEcharts();
        },
        components: {
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'PersonalInfo_academ',
        props: {
            msg: String
        },
        data() {
            return {
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
                editing:false,//信息是否处于可编辑状态
                form: {
                    id: this.$store.state.userid,
                    name: '',
                    email: '',
                    info: ''
                },
                researcher:
                {

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
        created(){
            this.showUserinfo();
            this.showSysMessagelist();
        },

        methods: {
            myEcharts()
            {
                var myChart = this.$echarts.init(document.getElementById('main'));
                var option = {
                    title:
                    {
                        text:'test图谱'
                    },
                    tooltip:{},
                    legend:{
                        data:['论文']
                    },
                    xAxis:
                    {
                        data:["计算机","电子电信","人工智能"]
                    },
                    yAxis:{},
                    series:[{
                        name: '产量',
                        type: 'bar',
                        data:[5,3,12]
                    }]
                };
                myChart.setOption(option);
            },

            showUserinfo () {
                const res= this.$axios({
                    method:'get',
                    url:'/user/getUser'
                }).catch(err=>{console.log(err)})

                this.form.name=res.data.name
                this.form.email=res.data.email
                this.form.info=res.data.info
                return 0
            },
            showSysMessagelist() {
                const res= this.$axios({
                    method:'get',
                    url:'/message/sys'
                }).catch(err=>{console.log(err)})
                this.message = res.data

                return 0
            },
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
                this.editing=false;
                let postData = {
                    'id': parseInt(this.$store.state.userID),
                    'name': this.form.name,
                    'email': this.form.email,
                    'info': this.form.info
                }
                this.$axios.post('/api/user/edit', postData).catch(err=>{console.log(err)})
                this.showUserinfo()
            }



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
