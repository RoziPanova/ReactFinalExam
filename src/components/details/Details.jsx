import { Link } from 'react-router';

export default function Details() {
	return (
		<div className='main-container'>
			<span className='back-arrow-container'>
				<Link to="/">
					<img className="back-arrow"
						src="/pictures/angle-left-solid-full.svg"
						alt="back" />
				</Link>
			</span>
			<div className='details-container'>
				<img src="/pictures/pexels-mikhaelmayim-30253591.jpg" alt="" />
				<div className='post-info'>
					<p>Title</p>
					<p>Desctription</p>
				</div>
				<div className='post-info-poster'>
						<p>Posted By: w icon</p>
						<p>Likes: Number</p>
					</div>
				<div className='comments-container'>
					<p>Add comment</p>
					<input className='comment-field' type="text" name='comment' />
				</div>
			</div>

		</div>
	);
}