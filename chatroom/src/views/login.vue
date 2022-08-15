<template>
<div class="login">
 <input type="text" placeholder="输入用户名" v-model="username">
    <button @click="login">zhuce</button>
</div>
   
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Ws from "@/socket/ws";
@Component({})
export default class Login extends Vue {

  username='';

  created(){
  }
 login(){
    // this.ws!.login(this.username)
    this.$router.push({
        path:'/home',
        query:{
            uname : this.username
        }
    })
  }
}
</script>

<style>

</style>