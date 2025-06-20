import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditArticle = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    useEffect(() => {
        if (isEdit) {
            const fetchArticle = async () => {
                try {
                    const res = await axios.get(
                        import.meta.env.VITE_BACKEND_URL + `/articles/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    );
                    setTitle(res.data.title);
                    setContent(res.data.content);
                    setTags(res.data.tags ? res.data.tags.join(', ') : '');
                } catch (error) {
                    console.error('Failed to fetch article:', error);
                    alert('Failed to load article data.');
                    navigate('/dashboard');
                }
            };

            fetchArticle();
        }
    }, [id, isEdit, navigate]);

    const handleSubmit = async () => {
        const articleData = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
        };

        try {
            if (isEdit) {
                await axios.put(
                    import.meta.env.VITE_BACKEND_URL + `/articles/${id}`,
                    articleData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
            } else {
                await axios.post(
                    import.meta.env.VITE_BACKEND_URL + `/articles`,
                    articleData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
            }
            navigate('/dashboard');
        } catch (error) {
            console.error('Failed to save article:', error);
            alert('Failed to save article. Please try again.');
        }
    };

    const handleBackOrCancel = () => {
        navigate('/dashboard');
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit' : 'Add'} Article</h2>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Title</label>
                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring"
                    placeholder="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Content</label>
                <textarea
                    className="w-full border p-2 rounded h-48 resize-none focus:outline-none focus:ring"
                    placeholder="Article Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label className="block font-semibold mb-1">Tags (comma separated)</label>
                <input
                    className="w-full border p-2 rounded focus:outline-none focus:ring"
                    placeholder="e.g. react, node, mongodb"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleSubmit}
                    disabled={!title || !content}
                    className={`px-4 py-2 rounded transition ${!title || !content
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'
                        }`}
                >
                    {isEdit ? 'Update Article' : 'Create Article'}
                </button>

                <button
                    onClick={handleBackOrCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer"
                >
                    {isEdit ? 'Cancel' : 'Back'}
                </button>
            </div>
        </div>
    );
}

export default AddEditArticle;
