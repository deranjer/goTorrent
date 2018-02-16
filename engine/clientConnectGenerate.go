package engine

import (
	"io/ioutil"
	"os"
)

var (
	baseFile = `
	var authMessage = {
		MessageType: "authRequest",
		Payload: {"ClientAuthString": ClientAuthString}
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
	};`
)

//GenerateClientConfigFile runs at first run (no db client detected) to generate a js file for connecting
func GenerateClientConfigFile(config FullClientSettings, authString string) {
	os.Remove("public/static/js/kickwebsocket-generated.js")
	var clientFile string
	var webUIAuth string
	if config.ClientUsername != "" {
		webUIAuth = `
		const LoginRequired = true
		const ClientUsername = "` + config.ClientUsername + `"
		const ClientPassword = "` + config.ClientPassword + `"
		`
	}

	if config.UseProxy {
		clientFile = `
		ClientAuthString = "` + authString + `"
		` + webUIAuth + `
		var ws = new WebSocket("wss://` + config.BaseURL + `websocket")
		` + baseFile
	} else {
		clientFile = `
		IP = "` + config.HTTPAddrIP + `"
		Port = "` + config.WebsocketClientPort + `"
		ClientAuthString = "` + authString + `"
		` + webUIAuth + `
		var ws = new WebSocket(` + "`" + `ws://${IP}:${Port}/websocket` + "`" + `); //creating websocket
		` + baseFile

	}
	clientFileBytes := []byte(clientFile)
	ioutil.WriteFile("public/static/js/kickwebsocket-generated.js", clientFileBytes, 0755)
}
