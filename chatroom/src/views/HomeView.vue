<template>
  <div class="home">
   
  <div :class="$['mainbox']">
<!--     
      <input type="text" placeholder="输入用户名" v-model="username">
      <button @click="login">zhuce</button>
    <textarea name="" id="" cols="30" rows="10" v-model="message"></textarea>
    <button @click="sendall">sendall</button> -->
    <section :class="$['leftbox']">
      <ul :class="$['selectbar']">
        <li><img src="@/assets/logo.png" alt=""></li>
        <li></li>
      </ul>

      <ul :class="$['userlist']">
        <li class="serch" style="">
          <input type="text" placeholder="搜索">
          <button>+</button>
        </li>
        <li></li>
      </ul>
    </section>

    <section :class="$['rightbox']">
      <h1>聊天室</h1>

      <div :class="$['neirong']">
      
      </div>

      <p :class="$['shuru']">
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <button>发送</button>
      </p>
    </section>
  </div>


  <h1>{{mymessage}}</h1>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Ws from '@/socket/ws'

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {

  username='';
  message='';
  mymessage='h1'
  count:number=0;
  ws?:Ws;

  created(){
    this.count++
    this.ws = new Ws()
    this.ws.init()
  }

  login(){
    this.ws!.login(this.username)
  }
  sendall(){
    this.ws?.sendall(this.message)
    this.mymessage = this.ws!.msg
  }
  // sendmsg(){
  //   this.ws!.send(JSON.stringify({
  //     msg:'woshidi'+this.count
  //   }))
  // }
  // sendall(){
  //   this.ws?.send(JSON.stringify({
  //     type:'all',
  //     msg:'wo 广播 给大家'
  //   }))
  // }
}
</script>

<style lang="scss" module="$">
.mainbox{
  box-sizing: border-box;
  margin: 100px auto;
  width: 800px;
  height: 500px;
  background-color: pink;
  display: flex;

  .leftbox{
    flex: 1;
    border: 1px solid ;
    background-color: rgb(232, 231, 230);
    display: flex;
    .selectbar{
      margin: 0;
      padding: 0;
      // float: left;
      width: 50px;
      height: 100%;
      background-color: rgb(46,46,46);
      img{
        height: 35px;
        width: 35px;
        margin: 10px auto;
        border: 1px solid white;
      }
    }
    .userlist{
      position: relative;
      width: 100%;
      display: inline-block;
      &>li:first-child{
        margin-top: 0;
        background-color: rgb(247,247,247);
        input{
          background-color: rgb(226,226,226);
          border-radius: 5px;
          border: none;
          height: 25px;
          margin:{
            top: 35px;
            right: 10px;
          }
        }
        button{
          width: 20px;
          height: 20px;
          border: none;
          background-color: rgb(226,226,226);
          &:hover{
            cursor: pointer;
          }
        }
      }
      li{
        height: 70px;
        background-color: pink;
        border:1px solid;
        margin: 1px 0;
      }
    }
  }
  .rightbox{
    flex: 2;

    border: 1px solid ;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1{
      max-height: 72px;
      // background-color: red;
      line-height: 72px;
      flex: 1;
    }
    .neirong{
      flex: 3;
      background: white;
      
    }
    .shuru{
      flex: 1;
      max-height: 70px;
      // background: blue;
      display: flex;
      textarea{
       flex: 9;
       max-height: 60px;
       border: none;
       margin: 5px 10px;
       background-color: pink;
      }
      button{
        flex: 1;
      }
    }
  }
}

</style>