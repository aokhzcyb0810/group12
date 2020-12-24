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


                        style="width: 1050px">
                    <el-table-column
                            fixed
                            prop=""
                            label=""
                            width="70">
                        
                    </el-table-column>
                    <el-table-column
                            fixed
                            prop="name"
                            label="学者姓名"
                            width="250">
                        <template slot-scope="scope">
                            <el-link @click="viewScholar(scope.$index)">{{scope.row.name}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="paperCount"
                            label="文献数量"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="field"
                            label="主要研究领域"
                            width="450">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label=""
                            width="110"
                            type="index">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="cancel(scope.$index)">取消关注</el-button>
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
    import axios from "axios";

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

                scholar_list:[{

                },{

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
                var _this=this;
                _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                _this.userid = _this.userL.id
                //axios.post('/message/sys?user=" + id)

                axios.post("/follow/getList?id=" + _this.userid)
                    .then(function (response) {
                        console.log('233')
                        console.log(response.data)
                        _this.scholar_list = response.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })


                return 0
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
                var _this=this;
                this.$confirm('是否确定取消对该学者的关注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.scholar_list.splice(index, 1);
                    //从scholar_list里删除该学者
                    console.log(index)
                    _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                    _this.userid = _this.userL.id
                    _this.researcherid = _this.scholar_list[index].id
                    //axios.post('/message/sys?user=" + id)

                    axios.post("/follow/cancel?user=" + _this.userid + '&researcher=' + _this.researcherid)
                        .then(function (response) {
                            console.log('233')
                            console.log(response.data)
                            _this.showfollowinfo()
                        })
                        .catch(function (error) {
                            console.log(error)
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
                    {path:'/academic_home/'+this.scholar_list[index].id,
                        // query:{
                        //     id:this.scholar_list[index].id
                        // }
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
