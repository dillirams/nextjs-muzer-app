
import WebSocket from "ws";
import { Addstream } from "../component/addstream";
import { Appbar } from "../component/appbar";
import { useStreamStore } from "../store/create";
import { RoomMessage } from "../component/roomMessage";

export default function RoomLive(){
   
   
    return <div className="bg-zinc-950">
        <div className="">
            <Appbar/>
        </div>

        welcome to my room

        <div className="">
            <Addstream dream={true}/>
        </div>

        <div className="mt-30">

            <RoomMessage/>

        </div>
    </div>
}