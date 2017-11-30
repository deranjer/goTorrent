import * as actionTypes from './actions';



const initialState = {
    buttonState: "default",
    sorting: [],
    selection: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.CHANGE_SELECTION:
            console.log("Selection change", action.selection)
            return state;
        case actionTypes.SORTLIST:
            console.log("List Sort", action.sorting)
            return state;


    }

    console.log("no actiontypes found", action)
    return state;
}
export default reducer;