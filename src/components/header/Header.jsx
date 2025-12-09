import { Link } from "react-router";

export default function Header() {
    const userId = "currentUserId"; // Replace with actual user ID logic
    return (
        <div className="navbar-container">
            <nav >
                <div className="navbar">
                    <div className="nav-links"> 
                        <Link to="/"><img className="logo" src="/pictures/Pinpoint-Color.svg" alt="Logo" /></Link>
                        {/* <img className="heart" src="\pictures\heart-regular-full.svg" alt="heart" /> */}
                        <Link to={`/likedPosts/${userId}`}>Liked Posts</Link> 
                        <Link to={`/followersPosts/${userId}`}>Following</Link>
                    </div>
                    <Link className="user-icon" to={`/profile/${userId}`}>Icon</Link>
                </div>
            </nav>
        </div>
    );
}
