import { Link } from 'react-router';
export default function CardPost({
    _id,
    title,
    img,
}) {
    return (
        <article className="card">
            <Link to={`/details/${_id}`}><img src={img} alt={title} /></Link>
        </article>
    );
}