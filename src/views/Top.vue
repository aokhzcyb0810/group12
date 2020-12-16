<template>
    <div class="top">
        <el-row>
            <el-col :span="2">
                <div class="grid-content bg size4">矢口网</div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg size2"></div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg size3">
                    <el-button size="small" style="margin-top: 20%">登录</el-button>
                </div>
            </el-col>
            <el-col :span="3">
                <div><p>   </p></div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg size3">
                    <i class="el-icon-bell" style="color: white;margin-top: 20%"></i>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg size3">
                    <el-avatar :size="30" icon="el-icon-user-solid" style="margin-top: 20%"></el-avatar>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    // import ElDivider from "../../node_modules/element-ui/packages/divider/src/main.vue";
    import ElRow from "element-ui/packages/row/src/row";
    import ElCol from "element-ui/packages/col/src/col";
    import ElDropdown from "../../node_modules/element-ui/packages/dropdown/src/dropdown.vue";
    import ElAvatar from "../../node_modules/element-ui/packages/avatar/src/main.vue";
    import ElDropdownMenu from "../../node_modules/element-ui/packages/dropdown/src/dropdown-menu.vue";
    import ElDropdownItem from "../../node_modules/element-ui/packages/dropdown/src/dropdown-item.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        //components: {ElDivider},
        components: {
            ElButton,
            ElDropdownItem,
            ElDropdownMenu,
            ElAvatar,
            ElDropdown,
            ElCol,
            ElRow},
        name: 'Top',
        data () {

        },
        methods:{

        }
    }
</script>
<style scoped lang="less">
    .el-row {
        margin-bottom: 20px;
    }
    .el-col {
        border-radius: 4px;
    }

    .bg {

    }
    .grid-content {
        border-radius: 4px;
        min-height: 50px;
        margin-top: 10%;

    }
    .size2{
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 170%;
    }
    .size3{
        font-size: 30px;


    }
    .size4{
        font-family: "Ink Free";
        font-size: 200%;
        color: white;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .top{
        padding: 0;
        margin: 0;
        background-color: darkblue;
    }
</style>