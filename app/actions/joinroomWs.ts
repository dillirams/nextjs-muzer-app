"use client"

const BACKEND_URL="ws://localhost:8081"

  export function joinRoomWs(roomId:string){
        const wss= new WebSocket(BACKEND_URL);
        wss.onopen=()=>{
            wss.send(JSON.stringify({
                type:"join",
                roomId:roomId
            }))
        }

        return {
            wss:wss
        }

    }