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
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.CHANGE_SELECTION:
            console.log("Change Selection", action.selection)
            return {
                ...state,
                peerList: [], //changing selection will purge out all of the old data
                selectionHashes: [],
                selection: action.selection,
            };

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
        console.log("FILELIST REDUX......", action.fileList)
            return {
                ...state,
                fileList: action.fileList
            }

        case actionTypes.SET_BUTTON_STATE:
            return {
                ...state,
                buttonState: action.buttonState
            }; 
        
        case actionTypes.SELECTED_TAB:
            return {
                ...state,
                selectedTab: action.selectedTab
            }

        default:
            return state;
    };

    console.log("no actiontypes found", action)
    return state;
}
export default reducer;