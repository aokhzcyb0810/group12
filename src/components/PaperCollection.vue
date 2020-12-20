<template>
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


                        style="width: 800px">
                    <el-table-column
                            fixed
                            prop=""
                            label=""
                            width="150">
                    </el-table-column><!--需要文献名-->
                    <el-table-column
                            fixed
                            prop="Title"
                            label="标题"
                            width="70">
                        <template slot-scope="scope">
                            <el-link @click="viewPaper(scope.$index)">{{scope.row.Title}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="Author"
                            label="学者姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="Time"
                            label="发布时间"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label=""
                            width="150"
                            type="index">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="cancel(index)">取消收藏</el-button>
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
                let postData = {
                    'Did': this.$route.query.Did
                }
                const res = this.$axios.post('/showcollection', postData).catch(err=>{console.log(err)})
                this.paper_list = res.data
                return 0
            },

            cancel(index) {
                this.$confirm('是否确定取消对该文献的收藏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let postData = {
                        'Cid': this.paper_list[index].Cid
                    }
                    this.$axios.post('/collection/cancelinpaper', postData).then((response) => {
                        this.showpaperinfo()
                    })
                    this.$message({
                        type: 'success',
                        message: '已取消收藏!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消操作'
                    });
                });
            },
            viewPaper(){
                this.$router.replace(
                    {path:'/paperread',
                        query:{
                            id: this.paper_list.Paper
                            //     id:this.$route.query.id
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
