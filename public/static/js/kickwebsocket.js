var ws = new WebSocket("ws://192.168.1.141:8000/websocket"); //creating websocket

var kickStart = {
    MessageType: "torrentListRequest"
}

ws.onopen = function()
{
   
   ws.send(JSON.stringify(kickStart)); //sending out the first ping
   console.log("Kicking off websocket to server.....", JSON.stringify(kickStart))
};