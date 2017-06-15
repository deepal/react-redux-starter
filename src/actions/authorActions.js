import * as actionTypes from './actionTypes';
import AuthorAPI from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {type: actionTypes.LOAD_AUTHORS_SUCCESS, authors};
}

export function createAuthorSuccess(author){
    return {type: actionTypes.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorSuccess(author) {
    return {type: actionTypes.UPDATE_AUTHOR_SUCCESS, author};
}

export function deleteAuthorSuccess(authorId){
    return {type: actionTypes.DELETE_AUTHOR_SUCCESS, authorId};
}

export function loadAuthors() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return AuthorAPI.getAllAuthors()
            .then(authors => {
                dispatch(loadAuthorsSuccess(authors));
            })
            .catch(err => {throw err;});
    };
}

export function saveAuthor(author) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        debugger;
        return AuthorAPI
            .saveAuthor(author)
            .then((savedAuthor) => {
                if (author.id){
                    return dispatch(updateAuthorSuccess(savedAuthor));
                }
                return dispatch(createAuthorSuccess(savedAuthor));
            })
            .catch((err) => {
                dispatch(ajaxCallError(err));
                throw err;
            });
    };
}

export function deleteAuthor(authorId) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return AuthorAPI.deleteAuthor(authorId)
            .then(() => {
                dispatch(deleteAuthorSuccess(authorId));
            })
            .catch((err) => {
                dispatch(ajaxCallError(err));
                throw err;
            });
    };
}