import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import AuthorForm from './AuthorForm';
import {browserHistory} from 'react-router';
import toastr from 'toastr';
import * as authorActions from '../../actions/authorActions';

class ManageAuthorsPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            author: Object.assign({}, this.props.author),
            saving: false,
            errors: {}
        };

        this.saveAuthor = this.saveAuthor.bind(this);
        this.updateAuthor = this.updateAuthor.bind(this);
        this.redirectToAuthorsPage = this.redirectToAuthorsPage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({author: Object.assign({}, newProps.author)});
    }

    redirectToAuthorsPage(){
        this.setState({saving: false});
        browserHistory.push('/authors');
    }

    saveAuthor(event) {
        event.preventDefault();
        this.setState({saving: true});
        debugger;
        this.props.actions.saveAuthor(this.state.author)
            .then((author) => {
                toastr.success('Author saved!');
                this.redirectToAuthorsPage();
            })
            .catch((err) => {
                toastr.error('Error occurred!');
                this.redirectToAuthorsPage();
            });
    }

    updateAuthor(event) {
        const field = event.target.name;
        const author = Object.assign({}, this.state.author);
        author[field] = event.target.value;
        return this.setState({author: author});
    }

    render() {
        return (
            <AuthorForm
                author={this.state.author}
                onSave={this.saveAuthor}
                onChange={this.updateAuthor}
                saving={this.state.saving}
                errors={this.state.errors}/>
        );
    }
}

ManageAuthorsPage.propTypes = {
    author: PropTypes.object,
    actions: PropTypes.object.isRequired
};

ManageAuthorsPage.contextTypes = {
    router: PropTypes.object.isRequired
};

function getAuthorById(authors, authorId) {
    if (!(authors && (authors instanceof Array))) {
        return null;
    }
    const filteredAuthors = authors.filter(a => a.id === authorId);

    return filteredAuthors.length ? filteredAuthors[0] : null;
}

function mapStateToProps(state, ownProps) {
    const allAuthors = state.authors;
    const authorId = ownProps.params.id;

    const author = getAuthorById(allAuthors, authorId);

    return {
        author: author
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorsPage);