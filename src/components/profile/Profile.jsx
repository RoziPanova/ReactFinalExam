import { useParams, Link } from 'react-router';
export default function Profile() {
    const { userId } = useParams();
    return (
        <div className='profile-container'>
            <img className='profile-user-icon' src="\pictures\user-solid-full.svg" alt="icon" />
            <div className="user-statistics">
                <p><Link to={`/profile/${userId}/myPosts`}>My Posts</Link></p>
                {/* //TODO: Replace "Count Following" and "Count Followers" with actual counts from the backend */}
                <p className="followers-button">Count Following</p>
                <p className="followers-button">Count Followers</p>
            </div>
            <div className='button-container-edit-logout'>
                <button className="edit-button">
                <Link to={`/profile/${userId}/edit`}>Edit Profile</Link></button>
            <button className="logout-button">Log out</button>
            </div>
            
        </div>
    );
}