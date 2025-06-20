import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const ArticleCard = ({ article, onDelete }) => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    let user = null;
    if(token) {
        try {
            user = jwtDecode(token);
        } catch (e) {
            console.error('Invalid token', e);
        }
    }
    // Compare user id and article creator id (handle both string or object with _id)
    const userId = user?.id || user?._id || user?.sub; // fallback keys if any
    const creatorId = article.createdBy?._id || article.createdBy;

    const isCreator = userId === creatorId;
    const isAdmin = user?.role === 'admin';

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await axios.delete(
                    import.meta.env.VITE_BACKEND_URL + `/articles/${article._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (onDelete) onDelete();
            } catch (error) {
                console.error('Error deleting article:', error);
                alert('Failed to delete the article. Please try again.');
            }
        }
    };

    const handleEdit = () => {
        navigate(`/edit-article/${article._id}`);
    };

    return (
        <div className="border p-4 rounded shadow bg-white">
            <h3 className="text-lg font-bold">{article.title.slice(0, 62)}</h3>
            <p className="text-sm text-gray-600">{article.content.slice(0, 200)}...</p>
            <div className="flex justify-between items-center mt-2">
                <Link to={`/article/${article._id}`} className="bg-blue-400 text-white hover:bg-blue-700 pr-4 pl-4 rounded">
                    View
                </Link>
                <div className="flex gap-3">
                    {isCreator && (
                        <button
                            onClick={handleEdit}
                            className="bg-green-400 text-white hover:bg-green-800 cursor-pointer pr-4 pl-4 rounded"
                        >
                            Edit
                        </button>
                    )}
                    {(isCreator || isAdmin) && (
                        <button
                            onClick={handleDelete}
                            className="bg-red-400 text-white hover:bg-red-700 cursor-pointer pr-4 pl-4 rounded"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ArticleCard
