import * as actionTypes from './actionTypes';
import CourseAPI from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return {type: actionTypes.LOAD_COURSES_SUCCESS, courses};
}

export function updateCourseSuccess(course) {
    return {type: actionTypes.UPDATE_COURSE_SUCCESS, course};
}

export function createCourseSuccess(course) {
    return {type: actionTypes.CREATE_COURSE_SUCCESS, course};
}

export function loadCourses() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return CourseAPI.getAllCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(err => {throw err;});
    };
}

export function saveCourse(savingCourse){
    //getState can be used to access the redux store directly, without requiring as a parameter to saveCourse.
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return CourseAPI.saveCourse(savingCourse)
            .then(course => {
                savingCourse.id ? dispatch(updateCourseSuccess(course)) : dispatch(createCourseSuccess(course));
            })
            .catch(err => {
                dispatch(ajaxCallError(err));
                throw err;
            });
    };
}