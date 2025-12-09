import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const initialValues = {
  icon: '',
  username: ''
};

function validate(input) {
  let errors = {};
  if (!input.username) {
    errors.username = 'Username is required';
  }
  if (input.username && input.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }
  return errors;
}

export default function EditProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [dirty, setDirty] = useState(false);

  const changeHandler = (e) => {
    setData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  const submitAction = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    setDirty(errors);
    try {
      if (Object.keys(errors).length > 0) {

        return;
      }
      console.log('Submitted data:', data);
      setData(initialValues);
    }
    catch (err) { alert(err.message) }

  };

  const styleErrorChange = (field) => {
    return errors[field] && dirty[field] ? { border: '2px solid red' } : {};
  }

  const validationHandler = (e) => {
    setDirty(state => ({
      ...state,
      [e.target.name]: true,
    }));
    const errors = validate(data);
    setErrors(errors);

  }
  return (
    <div className="edit-profile-container">
      <form onSubmit={submitAction} className="edit-profile-form">
        <p>Edit Profile</p>
        <div className='edit-icon-container'> 
          <img className='edit-user-icon' src="\pictures\user-solid-full.svg" alt="icon" />
          <label htmlFor="icon" className='edit-icon-label'>Change icon</label>
          <input
            className='edit-icon-input'
            accept="image/png, image/gif, image/jpg, .png, .jpg, .jpeg"
            type="file"
            id="icon"
            name="icon"
            onBlur={validationHandler}
            onChange={changeHandler}
          />
        </div>

        <label htmlFor="username">Username</label>
        <input
          className='edit-username-input'
          type="text"
          id="username"
          name="username"
          value={data.username}
          onBlur={validationHandler}
          onChange={changeHandler}
          autoComplete="none"
          style={styleErrorChange('username')}
        />
        {errors['username'] && dirty['username'] && <span style={{ color: 'red' }}>{errors['username']}</span>}
        <div className="form-buttons-cancel-save">
          <button type="submit" className="save-button">Save</button>
          <button className="cancel-button" onClick={() => navigate(`/profile/${userId}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}