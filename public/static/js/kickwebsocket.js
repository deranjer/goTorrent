var ws = new WebSocket("ws://192.168.1.141:8000/websocket"); //creating websocket

ws.onopen = function()
{
   ws.send("clientUpdateRequest"); //sending out the first ping
   console.log("Kicking off websocket to server on 192.168.1.141.....")
};