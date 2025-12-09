import { useParams, Link } from 'react-router';
export default function Profile() {
    const { userId } = useParams();
    return (
        <div>
            <img className='edit-user-icon' src="public\pictures\user-solid-full.svg" alt="icon" />
            <div className="user-statistics">
                <p><Link to={`/profile/${userId}/myPosts`}>My Posts</Link></p>
                <p className="followers-button">Count Following</p>
                <p className="followers-button">Count Followers</p>
            </div>
            <button className="edit-button">
                <Link to={`/profile/${userId}/edit`}>Edit Profile</Link></button>
            <button className="logout-button">Log out</button>
        </div>
    );
}