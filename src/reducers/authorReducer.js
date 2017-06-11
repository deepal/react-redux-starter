import * as actionTypes from '../actions/actionTypes';
import InitialState from './initialState';

export default function authorReducer(state = InitialState.authors, action) {
    switch (action.type){
        case actionTypes.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        default:
            return state;
    }
}