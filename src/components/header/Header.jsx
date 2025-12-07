import { Link } from "react-router";

export default function Header() {
    return (
        <div>
            <nav >
                <div className="navbar">
                    <div className="nav-links"> 
                        <Link className="logo" to="/"><img src="pictures/Pinpoint-Color.svg" alt="Logo" /></Link>
                        <Link to="/likedPosts">Liked Posts</Link> {/*might just add a heart icon */}
                        <Link to="/followersPosts">Following</Link>
                    </div>
                    <Link className="user-icon" to="/profile/`${userId}`">Icon</Link>
                </div>
            </nav>
        </div>
    );
}
