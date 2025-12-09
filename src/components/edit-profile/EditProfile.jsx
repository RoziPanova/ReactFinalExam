import { Link, useParams } from 'react-router';
export default function EditProfile() {
  const { userId } = useParams();
  return (
    <div className="profile-container">
      <form action="" className="profile-form">
        <p>Edit Profile</p>
        <img className='edit-user-icon' src="\pictures\user-solid-full.svg" alt="icon" />
        <label htmlFor="icon">Change icon</label>
        <input accept="image/png, image/gif, image/jpg, .png, .jpg, .jpeg"
          type="file"
          id="icon"
          name="icon" />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          autoComplete="none" />
        <div className="form-buttons-cancel-save">
          <button className="save-button">Save</button>
          <button className="cancel-button">Cancel</button>
        </div>

      </form>
    </div>
  );
}