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
                <div v-for="(item,index) in collection_list" :key="item"  style="display: inline-block;width: 16%;margin-top: 10px">
                    <i class="el-icon-folder" style="font-size: 80px;margin-left: 25%;color: gold" @click="viewCollection(item.key)"></i>
                    <div style="text-align: center;font-size: 12px">
                        {{item.value}}
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
    import axios from "axios";

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
                select:0,//选择删除哪一个文件夹

                collection_list:[{}],
                paper_list:[{}]
            }
        },
        created(){
            this.showCollection()
        },
        methods: {
            showCollection () {
                var _this=this;
                _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                _this.userid = _this.userL.id
                //axios.post('/message/sys?user=" + id)

                axios.post("/getCollection?user=" + _this.userid)
                    .then(function (response) {
                        console.log(response.data)
                        console.log(response.data.data)
                        _this.collection_list = response.data.data
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
            deleteCollection(index){
                var _this=this;
                this.$confirm('是否确定删除该文件夹?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.collection_list.splice(index, 1);
                    //从collection_list里删除该文件夹
                    _this.did = _this.collection_list[index].key
                    //axios.post('/message/sys?user=" + id)

                    axios.post("/dir/delete?Did=" + _this.did)
                        .then(function (response) {
                            console.log('233')
                            console.log(response.data)
                            _this.showCollection()
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
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
            viewCollection(did){

                console.log(did)
                this.$router.replace(
                    {path:'/papercollection',
                        query:{
                            //    id:this.$route.query.id,
                            id:did,
                        }
                    })

                //跳转到对应收藏夹页
            },
            newCollection() {
                var _this=this;
                _this.userL = JSON.parse(sessionStorage.getItem("userL"));
                _this.userid = _this.userL.id
                this.$prompt('请输入收藏夹名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    if(!value){
                        alert('收藏夹名不能为空')
                    }
                    else{
                        axios.post("/makedir?Dname=" + value + '&user=' + _this.userid)
                            .then(function (response) {
                                console.log('233')
                                console.log(response.data)
                                _this.showCollection()
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
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
