import { useEffect, useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const fetchArticles = async () => {
        try {
            const res = await axios.get(
                import.meta.env.VITE_BACKEND_URL + '/articles',
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setArticles(res.data);
        } catch (error) {
            console.error('Failed to fetch articles:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('Session expired. Please log in again.');
                handleLogout();
            } else {
                alert('Failed to fetch articles. Try again later.');
            }
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Articles</h2>
                <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-slate-400 text-white hover:bg-slate-500 rounded cursor-pointer"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((a) => (
                    <ArticleCard key={a._id} article={a} onDelete={fetchArticles} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard
