import * as actionTypes from '../actions/actionTypes';
import InitialState from './initialState';

export default function courseReducer(state = InitialState.courses, action) {
    switch (action.type){
        case actionTypes.LOAD_COURSES_SUCCESS:
            return action.courses;
        case actionTypes.CREATE_COURSE_SUCCESS:
            return [...state, Object.assign({}, action.course)];
        case actionTypes.UPDATE_COURSE_SUCCESS:
            return state.map(curr => {
                if (curr.id === action.course.id){
                    return action.course;
                }
                return curr;
            });
        default:
            return state;
    }
}