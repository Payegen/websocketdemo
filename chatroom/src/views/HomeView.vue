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

        <li>
          <img src="@/assets/logo.png" alt="">
          <span>用户：{{username}}</span>
        </li>
        <li></li>
        <li></li>
      </ul>
    </section>

    <section :class="$['rightbox']">
      <h1>聊天室</h1>

      <div :class="$['neirong']">
        <ul>
          <li v-for="(item,index) in allmessages" :key="index" :class="item.name===username? $['remsglist']:$['msglist']">
          <img src="@/assets/wx.jpg" alt="">
          <h5>用户：{{item.name}}</h5>
          <span>{{item.msg}}</span>
          </li>

        </ul>
      </div>

      <p :class="$['shuru']">
      <textarea name="" id="" cols="30" rows="10"  v-model="message"></textarea>
      <button @click="sendall">发送</button>
      </p>
    </section>
  </div>


  </div>
</template>

<script lang="ts">
import { Component, Vue ,Watch} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Ws from '@/socket/ws'
import { nextTick } from 'vue';

@Component({
  components: {
    HelloWorld,
  },
})
export default class HomeView extends Vue {

  username:any;
  message='';
  allmessages:any[]=new Array();
  count:number=0;
  ws?:Ws;

@Watch('mys')

  created(){
    // this.count++
    this.ws = new Ws()
    // this.ws.init()
    this.username = this.$route.query.uname
    this.allmessages = this.ws.allmsg
    this.$nextTick(()=>{
      this.login()
    }
    )
  }

@Watch('ws')
test(val:string,old:string){
  console.log('bainhuale'+val); 
}

  login(){
    this.ws!.login(this.username)
  }

  sendall(){
    this.ws?.sendall(this.username,this.message)
    this.allmessages = this.ws!.allmsg
    this.$nextTick(
    )
  }

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
        display: block;
        margin-top: 0;
        background-color: rgb(247,247,247);
        input{
          background-color: rgb(226,226,226);
          border-radius: 5px;
          border: none;
          height: 25px;
          margin: {
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
        // background-color: pink;
        border:1px solid;
        margin: 1px 0;
        display: flex;

        img{
          height: 50px;
          width: 50px;
          margin: 10px;
        }
  
        span{
          line-height: 40px;
          margin-left: 10px;
        }
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
      overflow: auto;
      .msglist{
        height: 40px;
        background-color: aqua;
        margin-bottom: 3px;
        img{
          height: 30px;
          width: 30px;
          margin: 5px;
          float: left;
        }
        h5{
          float: left;
          margin-left: 5px;
        }
        span{
          background-color: white;
          float: left;
          height: 30px;
          margin: 5px 10px;
          padding: 1px 7px;
         
          z-index: 1;
          position: relative;
          &::after{
            position: absolute;
            content: "";
            display: block;
            background-color: white;
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            top: 2px;
            left: -5px;
            z-index: 0;
          }
        }
      }
        .remsglist{
        height: 40px;
        background-color: aqua;
        margin-bottom: 3px;
        img{
          height: 30px;
          width: 30px;
          margin: 5px;
          float: right;
        }
        h5{
          float: right;
          margin-left: 5px;
        }
        span{
          background-color: white;
          float: right;
          height: 30px;
          padding: 1px 7px;
          margin: 5px;
          z-index: 1;
          position: relative;
          &::after{
            position: absolute;
            content: "";
            display: block;
            background-color: white;
            width: 10px;
            height: 10px;
            transform: rotate(45deg);
            top: 2px;
            right: -5px;
            z-index: 0;
          }
        }
        
      }

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