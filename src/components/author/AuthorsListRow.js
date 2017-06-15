import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const AuthorsListRow = (props) => {
    return (
        <tr>
            <td>{props.author.id}</td>
            <td>{props.author.firstName}</td>
            <td>{props.author.lastName}</td>
            <td><Link to={`/author/${props.author.id}`}><span className="glyphicon glyphicon-pencil"/> </Link></td>
            <td><span className="glyphicon glyphicon-remove"/></td>
        </tr>
    );
};

AuthorsListRow.propTypes = {
    author: PropTypes.object.isRequired
};

export default AuthorsListRow;
