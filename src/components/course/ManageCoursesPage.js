import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursesPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseStatus = this.updateCourseStatus.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.course.id !== nextProps.course.id){
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseStatus(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    redirect(){
        this.setState({saving: false});
        this.context.router.push('/courses');
        toastr.success('Course Saved!');
    }

    saveCourse(event){
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions
            .saveCourse(this.state.course)
            .then(() => this.redirect())
            .catch((err) => {
                toastr.error(err);
                this.setState({saving: false});
            });
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                allAuthors={this.props.authors}
                errors={this.state.errors}
                onChange={this.updateCourseStatus}
                onSave={this.saveCourse}
                loading={this.state.saving}
            />
        );
    }
}

ManageCoursesPage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.arrayOf(PropTypes.object),
    actions: PropTypes.object.isRequired
};

ManageCoursesPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getCourseById(courses, courseId) {
    const matches = courses.filter(c => c.id === courseId);
    if(matches.length !== 0) return matches[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = {};

    if (courseId && state.courses.length > 0){
        course = getCourseById(state.courses, courseId);
    }

    const formattedAuthors = state.authors.map(author => {
        return {
            value: author.id,
            text: `${author.firstName} ${author.lastName}`
        };
    });

    return {
        course: course,
        authors: formattedAuthors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);