<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div><span style="margin-left: 1%"><i class="el-icon-s-custom"> 我关注的学者</i></span></div>
                </el-col>
                <el-col :span="16">
                    <div> </div>
                </el-col>
                <el-col :span="16">
                    <div></div>
                </el-col>

            </el-row>
            <el-divider></el-divider>
            <div>
                <el-table
                        :data="scholar_list"


                        style="width: 800px">
                    <el-table-column
                            fixed
                            prop="avatar"
                            label=""
                            width="70">
                        <el-avatar :size="35"></el-avatar>
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="name"
                            label="学者姓名"
                            width="150">
                        <template slot-scope="scope">
                            <el-link @click="viewScholar(scope.$index)">{{scope.row.name}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="article_num"
                            label="文献数量"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="field"
                            label="主要研究领域"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label=""
                            width="150"
                            type="index">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="cancel(index)">取消关注</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>
    </div>

</template>
<script>

    import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
    import ElLink from "../../node_modules/element-ui/packages/link/src/main.vue";

    export default {
        components: {
            ElLink,
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'PersonalInfo_follow',
        props: {
            msg: String
        },
        data() {
            return {
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
                scholar_list:[{
                    id:'',//关注id
                    photo:'',//头像
                    name:'学者1',//学者姓名
                    article_num:1,//文献数量
                    field:'医学'//研究领域
                },{
                    id:'',
                    photo:'',
                    name:'学者2',
                    article_num:10,
                    field:'计算机，数学，电子技术，软件，人工智能'
                },{
                    id:'',
                    photo:'',
                    name:'学者3',
                    article_num:114514,
                    field:'金融'
                }]
            }
        },
        created(){
            this.showfollowinfo()
        },
        methods: {
            showfollowinfo () {
                let postData = {
                    'id': parseInt(this.$store.state.userID)
                }
                this.$axios.post('/follow/getList', postData).then((response) => {
                    this.scholar_list = response.data
                })
            },
            toIdentify(){
                this.$router.replace(
                    {path:"",
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            cancel(index) {
                this.$confirm('是否确定取消对该学者的关注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.scholar_list.splice(index, 1);
                    //从scholar_list里删除该学者
                    let postData = {
                        'id': this.scholar_list[index].id
                    }
                    this.$axios.post('/follow/delete', postData).then((response) => {
                        this.showfollowinfo()
                    })
                    this.$message({
                        type: 'success',
                        message: '取关成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            viewScholar(index){

                this.$router.replace(
                    {path:'/scholar',
                        query:{
                            id:this.scholar_list[index].id
                        }
                    })
                
            }



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
