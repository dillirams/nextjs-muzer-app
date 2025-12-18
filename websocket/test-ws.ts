import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", (data) => {
    console.log("raw:", data.toString());

    ws.send(
      JSON.stringify({
        ok: true,
      })
    );
  });
});

console.log("ws server running on 8080");
