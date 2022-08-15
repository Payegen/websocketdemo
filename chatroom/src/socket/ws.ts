class Ws{
    ws:WebSocket;

    allmsg:any[]=[];
    
    constructor(){
       this.ws = new WebSocket('ws://localhost:8088');
       this.init();
    }
    init(){
        this.ws.onopen = function () {
            // console.log('ws onopen');
            this.send(JSON.stringify({
                msg:'from client: hello'
            }));
        };
        let that = this
        this.ws.onmessage = function (e) {
            let data = JSON.parse(e.data)

            switch (data.type) {
                case 'all':
                    that.allmsg.push({ 
                        name : data.from,
                        msg : data.msg
                    })
                    break;
                case 'login':
                    if(data.code===0){
                        console.error(data.msg)
                    }
                    else{
                        console.log(data.msg);
                    }
                    break;
                default:
                    break;
            }
        };
    }
    sendall(name:string,data:string){
        if(this.ws.readyState===WebSocket.OPEN){
            this.ws.send(JSON.stringify({
                type:'all',
                from:name,
                msg:data
            }));
        }
        let that = this
        // this.ws.onmessage = function (e) {
        //     console.log('from server: ' + e.data);
        //     // console.error(e.data)
        //     that.msg = e.data
        // };
    }
    p2p(to:string,data:string){
        if(this.ws.readyState===WebSocket.OPEN){
            this.ws.send(JSON.stringify({
                type:'p2p',
                to:to,
                msg:data
            }));
        }
    }
    login(name:string){
        if(this.ws.readyState===WebSocket.OPEN){
            this.ws.send(JSON.stringify({
                type:'login',
                name:name
            }));
        }
    }
    close(){
        this.ws.close()
    }
}
export default Ws;