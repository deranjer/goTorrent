//This is the basic template used to generate the kickwebsocket.  If needed you can manually edit this one to your needs and replace kickwebsocket-generated.

IP = "192.168.1.100"
Port = "8000"
ClientAuthString = "" //String generated on first start and stored in the root as "clientAuth.txt"
const LoginRequired = true
const ClientUsername = "admin"
const ClientPassword = "" //create a sha256 hash of your password and enter it here

//var ws = new WebSocket(`ws://${IP}:${Port}/websocket`); //for websockets not over an SSL reverse proxy

//var ws = new WebSocket("wss://yoursubdomain.domain.org/subroute/") //for websockets behind an SSL reverse proxy

var authMessage = {
    MessageType: "authRequest",
    Payload: [ClientAuthString]
}

var kickStart = {
    MessageType: "torrentListRequest"
}

ws.onopen = function()
{ 
   ws.send(JSON.stringify(authMessage));
   console.log("Sending authentication message...", JSON.stringify(authMessage))
   ws.send(JSON.stringify(kickStart)); //sending out the first ping
   console.log("Kicking off websocket to server.....", JSON.stringify(kickStart))
};