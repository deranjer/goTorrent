import * as actionTypes from './actions';



const initialState = {
    buttonState: "default",
    sorting: [],
    selection: [],
    filter: ["Status", ""],
    columnName: "Status"
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
            }

        default:
            return state;
    };

    console.log("no actiontypes found", action)
    return state;
}
export default reducer;