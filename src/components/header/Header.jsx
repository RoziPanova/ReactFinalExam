import { Link } from "react-router";

export default function Header() {
    return (
        <div className="navbar-container">
            <nav >
                <div className="navbar">
                    <div className="nav-links"> 
                        <Link to="/"><img className="logo" src="pictures/Pinpoint-Color.svg" alt="Logo" /></Link>
                        {/* <img className="heart" src="\pictures\heart-regular-full.svg" alt="heart" /> */}
                        <Link to="/likedPosts">Liked Posts</Link> {/*might just add a heart icon */}
                        <Link to="/followersPosts">Following</Link>
                    </div>
                    <Link className="user-icon" to="/profile/`${userId}`">Icon</Link>
                </div>
            </nav>
        </div>
    );
}
