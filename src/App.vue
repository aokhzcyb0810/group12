<template>
<div>
<paperread></paperread>
<owncomments></owncomments>
</div>
</template>

<script>
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Paper from './views/Paper.vue'
import Paperread from './views/Paperread.vue'
import Owncomments from './views/Owncomments'
export default {
  name: 'app',
  components: {
    Home,
    Login,
    Paper,
    Paperread,
    Owncomments,
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
