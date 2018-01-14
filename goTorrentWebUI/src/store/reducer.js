import * as actionTypes from './actions';



const initialState = {
    buttonStateDefault: [{startButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default"}],
    buttonState: [{startButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default"}],
    sorting: [],
    selection: [],
    selectionHashes: [],
    filter: ["Status", ""],
    columnName: "Status",
    torrentList: [],
    peerList: [],
    fileList: [],
    torrentDetailInfo: [],
    selectedTab: 0,
    RSSList: [],
    RSSTorrentList: [],
    RSSModalOpen: false,
}




const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.CHANGE_SELECTION:
            console.log("Change Selection", action.selection)
            return {
                ...state,
                peerList: [], //changing selection will purge out all of the old data
                fileList: [],
                selectionHashes: [],
                selection: action.selection,
            };

        case actionTypes.NEW_RSS_FEED_STORE:
            console.log("New RSS Feed Store", action.RSSList)
            return {
                ...state,
                RSSList: action.RSSList,
            }
        
        case actionTypes.RSS_TORRENT_LIST:
            console.log("New RSS Torrent List IN REDUCER", action.RSSTorrentList)
            return {
                ...state,
                RSSTorrentList: action.RSSTorrentList,
            }

        case actionTypes.SELECTION_HASHES:
            console.log("Selection hashes REDUX", action.selectionHashes)
            return {
                ...state,
                selectionHashes: action.selectionHashes,
            };

        case actionTypes.SORTLIST: //TODO do I even need this in redux?
            console.log("List Sort", action.sorting)
            return state;

        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            };

        case actionTypes.TORRENT_LIST:
            return {
                ...state,
                torrentList: action.torrentList,
            };
        
        case actionTypes.PEER_LIST:
            return {
                ...state,
                peerList: action.peerList
            }
        
        case actionTypes.FILE_LIST:
            return {
                ...state,
                fileList: action.fileList
            }

        case actionTypes.SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.selectedTab
            }
        
        case actionTypes.RSS_MODAL_OPEN_STATE:
            console.log("Setting RSS Modal State...", action.RSSModalOpen)
            return {
                ...state,
                RSSModalOpen: action.RSSModalOpen
            }
 
        case actionTypes.SET_BUTTON_STATE:
            if (action.buttonState.length === 0) { //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
                let buttonStateFinal = state.buttonStateDefault //if no selection dispatch that to redux
                return {
                    ...state,
                    buttonState: buttonStateFinal
                }; 

            } else { // if we have selection continue on with logic to determine button state
                const selectedRows = [] //array of all the selected Rows
                action.buttonState.forEach(element => {   
                    selectedRows.push(state.torrentList[element])   //pushing the selected rows out of torrentlist
                });
            
            
                let buttonStateTest = selectedRows.filter(element => { //TODO fix this bad mess... we literally just need to filter for stopped and go from there
                    let result = []
                    if (element.Status === "Downloading" || element.Status === "Awaiting Peers" || element.Status === "Seeding" || element.Status === "Completed"){
                        result.push(element.Status)
                        return result
                    }
                })
                let buttonStateTest2 = selectedRows.filter(element => element.Status === "Stopped")
            
                if (buttonStateTest.length > 0 && buttonStateTest2.length === 0){

                    let buttonStateFinal = [{startButton: "default", stopButton: "primary", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary"}]
                    return {
                        ...state,
                        buttonState: buttonStateFinal
                    }; 

                }
                if (buttonStateTest.length === 0 && buttonStateTest2.length > 0){
                    let buttonStateFinal = [{startButton: "primary", stopButton: "default", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary"}]
                    return {
                        ...state,
                        buttonState: buttonStateFinal
                    }; 

                }
                if (buttonStateTest.length > 0 && buttonStateTest2.length > 0){
                    let buttonStateFinal = [{startButton: "primary", stopButton: "primary", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary"}]
                    return {
                        ...state,
                        buttonState: buttonStateFinal
                    }; 

                }
            }
            return {
                ...state,
                buttonState: buttonStateFinal
            }; 
        
        default:
            return state;
    };

    console.log("no actiontypes found", action)
    return state;
}
export default reducer;