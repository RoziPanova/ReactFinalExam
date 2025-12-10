import { useEffect, useState } from 'react';
import CardPost from './card/CardPost';
export default function Home() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3030/data/posts')
            .then(res => res.json())
            .then(result => {
                setPosts(result);
            })
    }, []);
    return (
        <div>
            <div className="masonry">
                {posts && posts.map(post => <CardPost key={post._id} {...post} />)}
                {posts && posts.map(post => <CardPost key={post._id} {...post} />)}
            </div>
        </div>
    );
}