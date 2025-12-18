
import { WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8081 });

interface SocketType{
    ws:WebSocket,
    roomId:string
}

const allSocket:SocketType[]=[]

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
   const parsedMessage=JSON.parse(data.toString());
   console.log(parsedMessage.type);
   console.log(parsedMessage.roomId);

   if(parsedMessage.type=="join"){
         allSocket.push({
            ws:ws,
            roomId:parsedMessage.roomId
         });
   }

   if(parsedMessage.type=="chat"){
    console.log(parsedMessage.payload)
    let commonRoomId="";
    allSocket.map((e)=>{
        if(e.ws==ws){
            commonRoomId=e.roomId
        }
    })

    allSocket.map(e=>{
        if(e.roomId==commonRoomId){
            e.ws.send(JSON.stringify({
                payload:parsedMessage.payload
            }))
        }
    }) 
   }


   
   

  });

 
});


