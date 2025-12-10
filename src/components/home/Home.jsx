import { useEffect, useState } from 'react';
import CardPost from './card/CardPost';
export default function Home() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            fetch('http://localhost:3030/data/posts')
                .then(res => res.json())
                .then(result => {
                    setPosts(result);
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);
    return (
        <div>
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="masonry">
                    {posts && posts.map(post => <CardPost key={post._id} {...post} />)}
                    {posts && posts.map(post => <CardPost key={post._id} {...post} />)}
                </div>
            )}
        </div>
    );
}