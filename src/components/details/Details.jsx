import { Link, useParams } from 'react-router';
import CardPost from '../home/card/CardPost';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';

export default function Details() {
	const [post, setPost] = useState(null);
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [likes, setLikes] = useState(0);
	// const [hasLiked, setHasLiked] = useState(false);
	const { isAuthenticated } = useUserContext();

	const { postId } = useParams();

	console.log(`http://localhost:3030/data/posts/${postId}?load=creator%3D_ownerId%3Ausers`);

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				fetch(`http://localhost:3030/data/posts/${postId}?load=creator%3D_ownerId%3Ausers`)
					.then(res => res.json())
					.then(result => {
						setPost(result);
					})
			} catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false);
			}
		}
		async function fetchPosts() {
			try {
				fetch(`http://localhost:3030/data/posts/`)
					.then(res => res.json())
					.then(result => {
						setPosts(result);
					})
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		fetchPosts();
		// loadLikes(postId, post?._ownerId);
	}, [postId, post?._ownerId]);

	// async function loadLikes(postId, userId) {
	// 	const res = await fetch(`http://localhost:3030/data/likes?where=postId%3D%22${postId}%22`);
	// 	const allLikes = await res.json();
	// 	setLikes(allLikes.length);


	// 	const userLiked = allLikes.some(like => like._ownerId === userId);
	// 	setHasLiked(userLiked);
	// }

	// const likeHandeler = (postId) => {
	// 	const token = sessionStorage.getItem('authToken'); // your auth token

	// 	if (!hasLiked) {
	// 		// Add like
	// 		const res = fetch('http://localhost:3030/data/likes', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				'X-Authorization': token
	// 			},
	// 			body: JSON.stringify({ postId })
	// 		});
	// 		if (res.ok) {
	// 			setLikes(l => l + 1);
	// 			setHasLiked(true);
	// 		}
	// 	} else {

	// 		const res = fetch(`http://localhost:3030/data/likes?where=postId%3D%22${postId}%22%20AND%20_ownerId%3D%22${currentUserId}%22`);
	// 		const data = res.json();
	// 		if (data.length > 0) {
	// 			const likeId = data[0]._id;
	// 			const delRes = fetch(`http://localhost:3030/data/likes/${likeId}`, {
	// 				method: 'DELETE',
	// 				headers: { 'X-Authorization': token }
	// 			});
	// 			if (delRes.ok) {
	// 				setLikes(l => l - 1);
	// 				setHasLiked(false);
	// 			}
	// 		}
	// 	}
	// }

	console.log(post);
	if (loading) {
		return (
			<div className="main-container">
				<div className="spinner"></div>
			</div>
		);
	}

	if (!post) {
		return <p>Error loading post.</p>;
	}

	return (
		<div className='main-container'>
			<span className='back-arrow-container'>
				<Link to="/">
					<img className="back-arrow"
						src={"/pictures/angle-left-solid-full.svg"}
						alt="back" />
				</Link>
			</span>

			<div className='details-container'>
				<img src={post.img} alt={post.title} />
				<div className='post-info'>
					<p>{post.title}</p>
					<p>{post.description}</p>
				</div>
				<div className='post-info-poster'>
					<p>Icon {post.creator.username}</p>
					{isAuthenticated && {/* <button onClick={likeHandeler(post._id)}>{hasLiked ? 'Unlike' : 'Like'} <p>{likes}</p></button> */ }}
				</div>
				{isAuthenticated &&
					<div className='comments-container'>
						<p>Add comment</p>
						<input className='comment-field' type="text" name='comment' />
					</div>}
			</div>
			<div className="masonry-details">
				{posts && posts.map(post => <CardPost key={post._id} {...post} />)}
				{posts && posts.map(post => <CardPost key={post._id} {...post} />)}
			</div>
		</div>
	);
}