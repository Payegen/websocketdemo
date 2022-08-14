import {WebSocketServer} from 'ws'

const wss = new WebSocketServer({port:8088});
let count = 0;
let users = {
};
wss.on('connection',(socket,req)=>{
    count++
    socket.onmessage = function(e){
        let data = JSON.parse(e.data)
        switch (data.type) {
            case "login":
                if(!users[data.name]){
                    users[data.name] = socket
                    socket.send('注册成功')
                }else{
                    socket.send('该用户已存在')
                }
                break;
            case 'all':
                wss.clients.forEach( client =>{
                    client.send(data.msg)
                    JSON.stringify({
                        type:"all",
                        msg:data.msg
                    })
                })
                console.log('这是一条广播消息'+data.msg);
                console.log('客户端的长度为'+wss.clients.size);
                break;
            case 'p2p':

                break;
            default:

                break;
        }
        console.log(e.data);
        // console.log(users);
    }
    socket.send("恭喜连接成功")
})
wss.on('error',(e)=>{
    console.log(e.message);
})