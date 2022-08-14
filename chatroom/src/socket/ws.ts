class Ws{
    ws:WebSocket;

    msg:string = '';
    
    constructor(){
       this.ws = new WebSocket('ws://localhost:8088');
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
            console.log('from server: ' + e.data);
            // console.error(e.data)
            that.msg = e.data
        };
    }
    sendall(data:string){
        if(this.ws.readyState===WebSocket.OPEN){
            this.ws.send(JSON.stringify({
                type:'all',
                msg:data
            }));
        }
        let that = this
        this.ws.onmessage = function (e) {
            console.log('from server: ' + e.data);
            // console.error(e.data)
            that.msg = e.data
        };
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
}
export default Ws;