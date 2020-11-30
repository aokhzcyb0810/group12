<template>
    <div>
        <NavBar>

        </NavBar>
    </div>
</template>

<script>
    import NavBar from "../homepage/NavBar";
    export default {
        name:"home",
        components: {NavBar}
    }
</script>

<style lang="less" scoped>
.el-header{
    height: 60px;
    background-color:aliceblue;
    border-block-color: black;
}
</style>

