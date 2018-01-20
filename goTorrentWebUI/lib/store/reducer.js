"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require("./actions");

var actionTypes = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
    buttonStateDefault: [{ startButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default" }],
    buttonState: [{ startButton: "default", stopButton: "default", deleteButton: "default", fSeedButton: "default", fRecheckButton: "default" }],
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
    RSSModalOpen: false
};

var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {

        case actionTypes.CHANGE_SELECTION:
            console.log("Change Selection", action.selection);
            return _extends({}, state, {
                peerList: [], //changing selection will purge out all of the old data
                fileList: [],
                selectionHashes: [],
                selection: action.selection
            });

        case actionTypes.NEW_RSS_FEED_STORE:
            console.log("New RSS Feed Store", action.RSSList);
            return _extends({}, state, {
                RSSList: action.RSSList
            });

        case actionTypes.RSS_TORRENT_LIST:
            console.log("New RSS Torrent List IN REDUCER", action.RSSTorrentList);
            return _extends({}, state, {
                RSSTorrentList: action.RSSTorrentList
            });

        case actionTypes.SELECTION_HASHES:
            console.log("Selection hashes REDUX", action.selectionHashes);
            return _extends({}, state, {
                selectionHashes: action.selectionHashes
            });

        case actionTypes.SORTLIST:
            //TODO do I even need this in redux?
            console.log("List Sort", action.sorting);
            return state;

        case actionTypes.CHANGE_FILTER:
            return _extends({}, state, {
                filter: action.filter
            });

        case actionTypes.TORRENT_LIST:
            return _extends({}, state, {
                torrentList: action.torrentList
            });

        case actionTypes.PEER_LIST:
            return _extends({}, state, {
                peerList: action.peerList
            });

        case actionTypes.FILE_LIST:
            return _extends({}, state, {
                fileList: action.fileList
            });

        case actionTypes.SELECTED_TAB:
            return _extends({}, state, {
                selectedTab: action.selectedTab
            });

        case actionTypes.RSS_MODAL_OPEN_STATE:
            console.log("Setting RSS Modal State...", action.RSSModalOpen);
            return _extends({}, state, {
                RSSModalOpen: action.RSSModalOpen
            });

        case actionTypes.SET_BUTTON_STATE:
            if (action.buttonState.length === 0) {
                //if selection is empty buttons will be default and selectionHashes will be blanked out and pushed to redux
                var _buttonStateFinal = state.buttonStateDefault; //if no selection dispatch that to redux
                return _extends({}, state, {
                    buttonState: _buttonStateFinal
                });
            } else {
                // if we have selection continue on with logic to determine button state
                var selectedRows = []; //array of all the selected Rows
                action.buttonState.forEach(function (element) {
                    selectedRows.push(state.torrentList[element]); //pushing the selected rows out of torrentlist
                });

                var buttonStateTest = selectedRows.filter(function (element) {
                    //TODO fix this bad mess... we literally just need to filter for stopped and go from there
                    var result = [];
                    if (element.Status === "Downloading" || element.Status === "Awaiting Peers" || element.Status === "Seeding" || element.Status === "Completed") {
                        result.push(element.Status);
                        return result;
                    }
                });
                var buttonStateTest2 = selectedRows.filter(function (element) {
                    return element.Status === "Stopped";
                });

                if (buttonStateTest.length > 0 && buttonStateTest2.length === 0) {

                    var _buttonStateFinal2 = [{ startButton: "default", stopButton: "primary", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary" }];
                    return _extends({}, state, {
                        buttonState: _buttonStateFinal2
                    });
                }
                if (buttonStateTest.length === 0 && buttonStateTest2.length > 0) {
                    var _buttonStateFinal3 = [{ startButton: "primary", stopButton: "default", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary" }];
                    return _extends({}, state, {
                        buttonState: _buttonStateFinal3
                    });
                }
                if (buttonStateTest.length > 0 && buttonStateTest2.length > 0) {
                    var _buttonStateFinal4 = [{ startButton: "primary", stopButton: "primary", deleteButton: "accent", fSeedButton: "default", fRecheckButton: "primary" }];
                    return _extends({}, state, {
                        buttonState: _buttonStateFinal4
                    });
                }
            }
            return _extends({}, state, {
                buttonState: buttonStateFinal
            });

        default:
            return state;
    };

    console.log("no actiontypes found", action);
    return state;
};
exports.default = reducer;