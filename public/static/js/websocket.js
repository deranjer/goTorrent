function myWebsocketStart()
{

    var torrentLinkSubmit = document.getElementById('torrentLinkSubmit');
    var magnetLink = document.getElementById('magnetLink');
    var addTorrentModal = document.getElementById('addTorrentModal');
    var myTextArea = document.getElementById("loggerData");
    var torrentHash = document.getElementById("hash");


    var ws = new WebSocket("ws://192.168.1.141:8000/websocket"); //creating websocket

    ws.onopen = function()
    {
        // Web Socket is connected, send data using send()
        ws.send("ping");

        myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + "First message sent";
    };

    ws.onmessage = function (evt)
    {
        var myTextArea = document.getElementById("loggerData");
        if(evt.data == "pong") {
            setTimeout(function(){ws.send("ping");}, 2000);
        } else {

            var clientUpdate = JSON.parse(evt.data);
            myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + "Client Update Event...";
            //myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + clientUpdate.LocalTorrentInfo.DateAdded;
            myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + evt.data;
            //myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + clientUpdate[0].TorrentHashString;

            //torrentHash.innerHTML = "Hash: " + clientUpdate[0].TorrentHashString;



        }
    };

    ws.onclose = function()
    {
        var myTextArea = document.getElementById("loggerData");
        myTextArea.innerHTML = myTextArea.innerHTML + "</br>" + "Connection closed";
    };


    torrentLinkSubmit.onclick = function(e) {
        e.preventDefault();

        var magnetLinkjs = magnetLink.value;

        ws.send(magnetLinkjs);
        myTextArea.innerHTML = myTextArea.innerHTML + "</br> Send:" + magnetLinkjs
        addTorrentModal.style.display = "none";
        magnetLink.value = '';
    }


}

function sendEvent(message)
{
    ws.send(message);
}
