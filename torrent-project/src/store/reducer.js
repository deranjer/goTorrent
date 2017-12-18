import * as actionTypes from './actions';



const initialState = {
    buttonStateDefault: [{startButton: "default", pauseButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default"}],
    buttonState: [{startButton: "default", pauseButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default"}],
    sorting: [],
    selection: [],
    filter: ["Status", ""],
    columnName: "Status",
    torrentList: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.CHANGE_SELECTION:
            console.log("Change Selection", action.selection)
            return {
                ...state,
                selection: action.selection,
            };

        case actionTypes.SORTLIST:
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
                torrentList: action.torrentList
            };

        case actionTypes.SET_BUTTON_STATE:
            return {
                ...state,
                buttonState: action.buttonState
            }; 


        default:
            return state;
    };

    console.log("no actiontypes found", action)
    return state;
}
export default reducer;