import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onChange, onSave, saving, errors}) => {
    return (
        <form>
            <h1>Manage Courses</h1>
            <TextInput name="firstName" label="First Name" onChange={onChange} value={author.firstName} error={errors.firstName}/>
            <TextInput name="lastName" label="Last Name" onChange={onChange} value={author.lastName} error={errors.lastName}/>
            <input className="btn btn-primary" type="submit" value={saving? 'Saving...': 'Save'} onClick={onSave}/>
        </form>
    );
};

AuthorForm.propTypes = {
    author: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    saving: PropTypes.bool
};

export default AuthorForm;