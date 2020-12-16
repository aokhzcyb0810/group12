<template>
    <div>
        <div>
            <el-row>
                <el-col :span="8">
                    <div><i class="el-icon-star-on" style="color: gold;margin-left: 1%"></i>我的收藏</div>
                </el-col>
                <el-col :span="16">
                    <div> </div>
                </el-col>
                <el-col :span="16">
                    <div>
                        <el-button type="primary" size="mini" style="margin-left: 80%" @click="newCollection">新建文件夹</el-button>
                    </div>
                </el-col>

            </el-row>


            <el-divider></el-divider>
            <div>
                <div v-for="(item,index) in collection_list" :key="item" @click="viewCollection(index)" style="display: inline-block;width: 16%;margin-top: 10px">
                    <i class="el-icon-folder" style="font-size: 80px;margin-left: 23%"></i>
                    <div style="text-align: center">
                        {{item.name}}
                    </div>

                    <el-button slot="reference" size="mini" style="margin-left: 30%;margin-top: 5px" @click="deleteCollection(index)">删除</el-button>

                </div>



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
    import ElIcon from "../../node_modules/element-ui/packages/icon/src/icon.vue";

    export default {
        components: {
            ElIcon,
            ElLink,
            ElInput,
            ElButton,
            ElAvatar,
            ElDivider},
        name: 'PersonalInfo_collection',
        props: {
            msg: String
        },
        data() {
            return {
                activeIndex: '1',
                //dialogVisible: false,//删除的dialog
                //dialogVisible2: false,//新建的dialog
                select:0,//选择删除哪一个文件夹
                form: {
                    id: '123456789',
                    sid: '',
                    name: this.$store.state.userid,
                    email: '',
                    info: ''
                },
                //message数组看实际情况加载内容，比如在“系统通知”则加载系统通知，切换其它目录时清空后重新加载
                collection_list:[{
                    id:'',//文件夹id
                    name:'收藏夹1',//文件夹名字
                },{
                    id:'',
                    name:'收藏夹2',
                },{
                    id:'',
                    name:'收藏夹3',
                },{
                    id:'',
                    name:'收藏夹4',
                },{
                    id:'',
                    name:'收藏夹5',
                },{
                    id:'',
                    name:'收藏夹6',
                },{
                    id:'',
                    name:'收藏夹7',
                },{
                    id:'',
                    name:'收藏夹8',
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
            deleteCollection(index){
                this.$confirm('是否确定删除该文件夹?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.collection_list.splice(index, 1);
                    //从collection_list里删除该文件夹
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            cancel(index) {
                this.$confirm('是否确定取消对该学者的关注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.scholar_list.splice(index, 1);
                    //从scholar_list里删除该学者
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
            viewCollection(index){

                this.$router.replace(
                    {path:'',
                        query:{
                            id:this.$route.query.id
                        }
                    })
                //跳转到对应收藏夹页
            },
            async newCollection() {
                await this.$prompt('请输入文件夹名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(async ({ value }) => {
                    if(!value){
                        alert('文件夹名不能为空')
                    }
                    else{
                        const res=await this.$axios({
                            type:'params',
                            method:'post',
                            url:'/team/create',
                            data:{
                                tname:value
                            }
                        }).catch(err=>{console.log(err)})
                        console.log(res)

                        this.showteamlist()
                        this.$message({
                            type: 'success',
                            message: '新建成功'
                        });}
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消创建'
                    });
                });
            },



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
