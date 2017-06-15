import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import AuthorsPage from './components/author/AuthorsPage';
import ManageAuthorsPage from './components/author/ManageAuthorsPage';
import ManageCourses from './components/course/ManageCoursesPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="about" component={AboutPage}/>
        <Route path="course(/:id)" component={ManageCourses}/>
        <Route path="courses" component={CoursesPage}/>
        <Route path="authors" component={AuthorsPage}/>
        <Route path="author(/:id)" component={ManageAuthorsPage}/>
    </Route>
);