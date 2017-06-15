import * as actionTypes from '../actions/actionTypes';
import InitialState from './initialState';

export default function authorReducer(state = InitialState.authors, action) {
    switch (action.type){
        case actionTypes.LOAD_AUTHORS_SUCCESS:
            return action.authors;
        case actionTypes.CREATE_AUTHOR_SUCCESS:
            return [...state, action.author];
        case actionTypes.UPDATE_AUTHOR_SUCCESS:
            return state.map((curr) => {
               if (curr.id === action.author.id){
                   return action.author;
               }
               return curr;
            });
        case actionTypes.DELETE_AUTHOR_SUCCESS:
            return state.filter(curr => curr.id !== action.authorId);
        default:
            return state;
    }
}