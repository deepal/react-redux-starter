import React, {PropTypes} from 'react';
import CourseListRow from './CourseListRow';

const CourseList = function ({courses}) {
    return (
        <table className="table table-hovered table-striped">
            <thead>
            <tr>
                <td>&nbsp;</td>
                <td>Title</td>
                <td>Author</td>
                <td>Category</td>
                <td>Length</td>
            </tr>
            </thead>
            <tbody>
            {courses.map(course => <CourseListRow key={course.id} course={course}/>)}
            </tbody>
        </table>
    );
};

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
};

export default CourseList;