import {WebSocketServer} from 'ws'

const wss = new WebSocketServer({port:8088});
let count = 0;
let users = {};
wss.on('connection',(socket,req)=>{
    count++
    socket.onmessage = function(e){
        let data = JSON.parse(e.data)
        switch (data.type) {
            case "login":
                console.log('-------注册bgein--------');
                if(!users[data.name]){
                    users[data.name] = socket
                    socket.send(JSON.stringify({
                        type:'login',
                        code:1,
                        msg:`${data.name}注册成功`
                    }))
                }else{
                    socket.send(JSON.stringify({
                        type:'login',
                        code:0,
                        msg:'用户已存在'
                    }))
                }
                console.log('-------注册end--------');
                break;
            case 'all':
                wss.clients.forEach( client =>{
                    client.send(JSON.stringify({
                        type:"all",
                        from:data.from,
                        msg:data.msg
                    }))
                    
                })
                break;
            case 'p2p':

                break;
            default:

                break;
        }
        console.log(e.data);
        // console.log(users);
    }
    // socket.send(JSON.stringify({
    //     type:"all",
    //     from:data.name,
    //     msg:""
    // }))
    console.log(users);
})
wss.on('error',(e)=>{
    console.log(e.message);
})