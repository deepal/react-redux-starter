import * as actionTypes from '../actions/actionTypes';
import InitialState from './initialState';

function actionTypeEndsInSuccess(type) {
    return type.substring(type.length-8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = InitialState.numAjaxCallsInProgress, action) {
    if (action.type === actionTypes.BEGIN_AJAX_CALL){
        return state + 1;
    }
    else if (actionTypeEndsInSuccess(action.type) || action.type === actionTypes.AJAX_CALL_ERROR){
        return state - 1;
    }

    return state;
}