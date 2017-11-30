package main

import (
	"honnef.co/go/js/dom"
	"github.com/gopherjs/websocket/websocketjs"
	"github.com/gopherjs/gopherjs/js"
	"github.com/johanbrandhorst/gopherjs-json"
	"time"
	//"honnef.co/go/js/dom"
	
)

var (
	//d = dom.GetWindow().Document()  //getting the dom to manipulate it
	document = dom.GetWindow().Document().(dom.HTMLDocument)
	//conn = func(){websocketjs.New("ws://192.168.1.141:8000/websocket")}//creating a global JS websocket connection
)
 

func main(){
	document.AddEventListener("DOMContentLoaded", false, func(_ dom.Event){
		println("DOMLoaded...")
		go ready()
	})
}

func ready(){
	
	//conn := conn()
	conn, err := websocketjs.New("ws://192.168.1.141:8000/websocket") // Blocks until connection is established.

	if err != nil {
		println("Error creating client websocket connection") // handle error
	}
	onOpen := func(ev *js.Object){
		err := conn.Send("ping!") //on startup send the ping message
		if err != nil {
			println("Cannot send ping message")
		}
	}

	onMessage := func(ev *js.Object){
		messageData := ev.Get("data").String()
		if messageData == "pong"{ //if the server says a pong, send a ping back
			time.Sleep(6 * time.Second)
			conn.Send("ping")
		} else {
			clientData, err := json.Unmarshal(messageData)
			if err != nil {
				println("Error unmarshalling server message")
			}
			
			println(clientData.String())

		}
	}

	onClose := func(ev *js.Object){
		println("Closing Connection....")
	}

	
	onError := func(ev *js.Object){
		println("Error....")	
	}

	conn.AddEventListener("open", false, onOpen)
	conn.AddEventListener("message", false, onMessage)
	conn.AddEventListener("close", false, onClose)
	conn.AddEventListener("error", false, onError)


	err = conn.Close()	
}