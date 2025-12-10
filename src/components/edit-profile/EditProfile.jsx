import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';

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

  const { user } = useUserContext();



  useEffect(() => {
    if (user) {
      setData({
        username: user.username || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }


  const changeHandler = (e) => {
    setData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  const submitAction = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);
    setDirty(errors);
    try {
      if (Object.keys(errors).length > 0) {

        return;
      }
      const res = await fetch(`http://localhost:3030/users/${userId}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });
      let result = null;
      if (res.status !== 204) {
        result = await res.json();
      }

      if (!res.ok) {
        throw new Error(result.message);
      }
      return result;

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