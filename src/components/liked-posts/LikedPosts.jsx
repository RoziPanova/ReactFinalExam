import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

export default function LikedPosts() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadLiked() {
      // 1) Get likes by this user
      const likeRes = await fetch(
        `http://localhost:3030/data/likes?where=_ownerId%3D"${userId}"`
      );
      const likes = await likeRes.json();

      // 2) No likes → no posts
      if (likes.length === 0) {
        setPosts([]);
        return;
      }

      // 3) Get all post details
      const likedPostIds = likes.map(l => l.postId);

      const postPromises = likedPostIds.map(id =>
        fetch(`http://localhost:3030/data/posts/${id}`).then(r => r.json())
      );

      const results = await Promise.all(postPromises);

      setPosts(results);
    }

    loadLiked();
  }, [userId]);

  if (posts.length === 0) {
    return <p>You have no liked posts yet.</p>;
  }

  return (
    <div className="liked-posts-container">
      <h2>Your Liked Posts</h2>

      <div className="posts-grid">
        {posts.map(p => (
          <div className="post-card" key={p._id}>
            <img src={p.img} alt="" />
            <h3>{p.title}</h3>
            <Link to={`/details/${p._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
