import { Link } from "react-router";
import { useUserContext } from '../../contexts/UserContext';

export default function Header() {
    const { isAuthenticated, user } = useUserContext();
    const userId = user?._id;
    return (
        <div className="navbar-container">
            <nav >
                <div className="navbar">

                    <Link to="/"><img className="logo" src="/pictures/Pinpoint-Color.svg" alt="Logo" /></Link>
                    {isAuthenticated ?
                        (
                            <div className="nav-links">

                                <Link to={`/likedPosts/${userId}`}>Liked Posts</Link>
                                <Link to={`/followersPosts/${userId}`}>Following</Link>
                                <div><Link className="user-icon" to={`/profile/${userId}`}>Icon</Link>
                                </div>

                            </div>
                        )
                        :
                        (
                            <div className="guest-links">
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </div>
                        )}

                </div>
            </nav>
        </div>
    );
}
