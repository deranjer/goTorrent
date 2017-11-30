d := dom.GetWindow().Document()  //getting the dom to manipulate it

logTextArea := d.GetElementByID("loggerData")

torrentLinkSubmit := d.GetElementByID("torrentLinkSubmit")
magnetLink := d.GetElementByID("magnetLink")

addTorrentModal := d.GetElementByID("addTorrentModal")
addTorrentLinkBtn := d.GetElementByID("addTorrentLink") // Get the button that opens the modal

addTorrentFileModal := d.GetElementByID("addTorrentFile")
addTorrentFileModalClose := d.GetElementsByClassName("addTorrentFileModalClose")

addTorrentModalClose := d.GetElementsByClassName("addTorrentModalClose") // Get the <span> element that closes the modal



//add magnet link modal
addTorrentLinkBtn.AddEventListener("click", false, func(event dom.Event){
	addTorrentModal.SetAttribute("display", "block")

})
//close torrent link modal
addTorrentModalClose[0].AddEventListener("click", false, func(event dom.Event){
	addTorrentModal.SetAttribute("display", "none")
})
//show torrent file modal
addTorrentFileModal.AddEventListener("click", false, func(event dom.Event){
	addTorrentFileModal.SetAttribute("display", "block")
})
//hide torrent file modal
addTorrentFileModalClose[0].AddEventListener("click", false, func(event dom.Event){
	addTorrentFileModal.SetAttribute("display", "none")
})

// When the user clicks anywhere outside of the modal, close it
d.AddEventListener("click", false, func(event dom.Event){
	addTorrentModal.SetAttribute("display", "none")
	addTorrentLinkBtn.SetAttribute("display", "none")
})



//websocket logic
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
		
		logTextArea.SetInnerHTML(logTextArea.InnerHTML() + "</br>" + "Client Update Event....")
		logTextArea.SetInnerHTML(logTextArea.InnerHTML() + "</br>" + clientData.String())

	}
}

onClose := func(ev *js.Object){
	logTextArea.SetInnerHTML(logTextArea.InnerHTML() + "</br>" + "Connection closed")
}


onError := func(ev *js.Object){
	logTextArea.SetInnerHTML(logTextArea.InnerHTML() + "</br>" + "Error opening websocket")
}

conn.AddEventListener("open", false, onOpen)
conn.AddEventListener("message", false, onMessage)
conn.AddEventListener("close", false, onClose)
conn.AddEventListener("error", false, onError)


err = conn.Close()

torrentLinkSubmit.AddEventListener("click", false, func(event dom.Event){ //listening to the submit button for magnet link
	
	
			
			conn.Send(magnetLink.TextContent()) 
			logTextArea.SetInnerHTML(logTextArea.InnerHTML() + "</br>" + "Adding Magnet Link: " + magnetLink.TextContent())  //adding the magnet link to the log
			addTorrentModal.SetAttribute("display", "none")
			magnetLink.SetTextContent("")
	
		})
		
}