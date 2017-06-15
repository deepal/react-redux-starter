import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import AuthorsList from './AuthorsList';
import * as authorActions from '../../actions/authorActions';

class AuthorsPage extends Component {
    constructor(props) {
        super(props);
    }

    redirectToAddAuthorPage(){
        browserHistory.push('/author');
    }

    render(){
        return (
            <div>
                <h1>Authors</h1>
                <input className="btn-primary btn" type="submit" value="Add Author" onClick={this.redirectToAddAuthorPage}/>
                <AuthorsList authors={this.props.authors}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        authors: state.authors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

AuthorsPage.propTypes = {
    authors: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);