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
                            <el-menu-item index="/managerInfo/personalinfo_collection" @click="itemClickc">
                                <i class="el-icon-star-off" style="color: white" ></i>
                                <span>  我的收藏</span>
                            </el-menu-item>
                            <el-menu-item index="/managerInfo/personalinfo_follow" @click="itemClickf" >
                                <i class="el-icon-s-custom" style="color: white"></i>
                                <span slot="title">  关注学者</span>
                            </el-menu-item>
                            <el-menu-item index="/managerInfo/personalinfo_child" @click="itemClickp" >
                                <i class="el-icon-info" style="color: white"></i>
                                <span slot="title">  个人信息</span>
                            </el-menu-item>
                            <el-menu-item index="/managerInfo/personalinfo_collection" @click="itemClicks2" >
                                <i class="el-icon-trophy" style="color: white"></i>
                                <span slot="title">  学者信息</span>
                            </el-menu-item>
                            <el-menu-item index="/managerInfo/personalinfo_manager" @click="itemClick5" >
                                <i class="el-icon-trophy" style="color: white"></i>
                                <span slot="title">  管理员页面</span>
                            </el-menu-item>
                        </el-menu>
                    </el-aside>
                    <!-- 右侧主体 -->
                    <el-main>
                        <router-view :key="$route.fullPath"></router-view>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
    import Top from '../components/Top.vue'
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import NavBar from "../homepage/NavBar";
    export default {
        name:"ManagerInfo",
        components:{
            NavBar,
            ElAvatar,
            Top
        },
        created(){
            this.showteamlist()
        },
        methods:{
            /*async showteamlist(){
                const res= await this.$axios.get('/teamlist').catch(err=>{console.log(err)})
                this.menulist=res.data
                console.log(res)
            },*/
            itemClickc(){
                //   this.$router.replace("/wordtemplate")
                this.$router.replace(
                    {path:'/managerInfo/personalinfo_collection',
                        query:{
                            //     id:this.$route.query.id
                        }
                    })
            },

            itemClickf(){
                this.$router.replace(
                    {path:'/managerInfo/personalinfo_follow',
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            itemClickp(){
                this.$router.replace(
                    {path:"/managerInfo/personalinfo_child",
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },
            itemClick5(){
                this.$router.replace(
                    {path:"/managerInfo/personalinfo_manager",
                        query:{
                            //       id:this.$route.query.id
                        }
                    })
            },

        },
        data(){
            return{

            }
        },
    }
</script>

<style lang="less" scoped>
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
