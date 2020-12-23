<template>
    <div>
        <div>
            <NavBar></NavBar>
            <el-container>
                <!-- 头部 -->

                <!-- 主体 -->
                <el-container>
                    <!-- 侧边栏 -->
                    <el-aside width="200px" style="background-color: #81b3f9">
                        <el-avatar :size="90" style="margin-left: 30%;margin-top: 10%">

                        </el-avatar>
                        <div>
                            <p style="color: white;text-align: center">{{UserName}}</p>
                        </div>
                        <el-menu
                                background-color="#81b3f9"
                                text-color="white"
                                active-text-color="#ffd04b"
                                :default-active="$route.path">
                            <el-menu-item index="/personalinfo/personalinfo_collection" @click="itemClickc">
                                <i class="el-icon-star-off" style="color: white" ></i>
                                <span>  我的收藏</span>
                            </el-menu-item>
                            <el-menu-item index="/personalinfo/personalinfo_follow" @click="itemClickf" >
                                <i class="el-icon-s-custom" style="color: white"></i>
                                <span slot="title">  关注学者</span>
                            </el-menu-item>
                            <el-menu-item index="/personalinfo/personalinfo_child" @click="itemClickp" >
                                <i class="el-icon-info" style="color: white"></i>
                                <span slot="title">  个人信息</span>
                            </el-menu-item>
                            <el-menu-item index="/home/recycle" @click="itemClicks_academ" >
                                <i class="el-icon-trophy" style="color: white"></i>
                                <span slot="title">  学者信息</span>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                    <!-- 右侧主体 -->
                    <el-main>
                        <div>
                            <div>
                                <el-row>
                                    <el-col :span="8">
                                        <div><span style="margin-left: 1%"><i class="el-icon-s-custom"> 我的收藏</i></span></div>
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
                                            :data="paper_list"


                                            style="width: 1000px">
                                        <el-table-column
                                                fixed
                                                prop=""
                                                label=""
                                                width="30">
                                        </el-table-column><!--需要文献名-->
                                        <el-table-column
                                                fixed
                                                prop="Title"
                                                label="标题"
                                                width="400">
                                            <template slot-scope="scope">
                                                <el-link @click="viewPaper(scope.$index)">{{scope.row.Title}}</el-link>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="Author"
                                                label="学者姓名"
                                                width="220">
                                        </el-table-column>
                                        <el-table-column
                                                prop="Time"
                                                label="发布时间"
                                                width="60">
                                        </el-table-column>
                                        <el-table-column
                                                fixed="right"
                                                label=""
                                                width="120"
                                                type="index">
                                            <template slot-scope="scope">
                                                <el-button type="danger" size="small" @click="cancel(scope.$index)">取消收藏</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>

                            </div>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>
<script>

    import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
    import ElLink from "../../node_modules/element-ui/packages/link/src/main.vue";
    import NavBar from "../homepage/NavBar";
    import axios from "axios";

    export default {
        components: {
            NavBar,
            ElLink,
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'PaperCollection',
        props: {
            msg: String
        },
        data() {
            return {
                activeIndex: '1',
                dialogFormVisible: false,//发送私信的dialog
                formLabelWidth: '120px',
                select:0,//选择查看哪一个消息

                paper_list:[]
            }
        },
        created(){
            this.showpaperinfo()
        },
        methods: {
            showpaperinfo () {
                var _this=this;
                _this.did = this.$route.query.id,
                //axios.post('/message/sys?user=" + id)

                axios.post("/showcollection?Did=" + _this.did)
                    .then(function (response) {

                        _this.paper_list = response.data.data
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                return 0
            },

            cancel(index) {
                var _this=this;
                this.$confirm('是否确定取消对该文献的收藏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.scholar_list.splice(index, 1);
                    //从scholar_list里删除该学者
                    console.log(index)
                    //_this.userL = JSON.parse(sessionStorage.getItem("userL"));
                    //_this.userid = _this.userL.id
                    _this.collectid = _this.paper_list[index].Cid
                    //axios.post('/message/sys?user=" + id)

                    axios.post("/collection/cancelindir?Cid=" + _this.collectid)
                        .then(function (response) {
                            console.log('233')
                            console.log(response.data)
                            _this.showpaperinfo()
                        })
                        .catch(function (error) {
                            console.log(error)
                        })

                    this.$message({
                        type: 'success',
                        message: '取消收藏成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            viewPaper(index){
                this.$router.replace(
                    {path:'/paper',
                        params:{
                            id: this.paper_list[index].Paper
                            //     id:this.$route.query.id
                        }
                    })
            },
            itemClickc(){
                //   this.$router.replace("/wordtemplate")
                this.$router.replace(
                    {path:'/personalinfo/personalinfo_collection',
                        query:{
                            //     id:this.$route.query.id
                        }
                    })
            },

            itemClickf(){
                this.$router.replace(
                    {path:'/personalinfo/personalinfo_follow',
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            itemClickp(){
                this.$router.replace(
                    {path:"/personalinfo/personalinfo_child",
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            itemClicks_academ()
            {
                this.$router.replace(
                    {
                        path:"/personalinfo/personalinfo_academ",
                        query:
                            {

                            }
                    }
                )
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
    #home{
        height: 100%;
    }
    .el-aside{
        background-color: whitesmoke;
        height: 700px;
    }
    .el-container{
        height: 100%;
    }
    .el-main{
        height: 700px;
        background-color: snow;

    }

</style>
