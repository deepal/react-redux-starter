import React, {PropTypes} from 'react';
import AuthorsListRow from './AuthorsListRow';

const AuthorsList = (props) => {
    return (
        <table className="table table-hovered table-striped">
            <thead>
                <tr>
                    <td>Author ID</td>
                    <td>Author First Name</td>
                    <td>Author Last Name</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
            {props.authors.map((author, authorId) => <AuthorsListRow key={authorId} author={author}/>)}
            </tbody>
        </table>
    );
};

AuthorsList.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AuthorsList;