<template>
<div>
<router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app',
  components: {

  },
    provide () { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量
        return {
            reload: this.reload
        }
    },
    data () {
        return {
            isReload: true
        }
    },
    methods: {
        reload () {
            this.isReload = false;
            this.$nextTick( () => {
                this.isReload = true;
            });
        }
    }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
