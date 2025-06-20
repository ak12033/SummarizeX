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
    <div className="p-8 max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-gray-700 shadow-2xl rounded-xl text-white mt-24">
      <h2 className="text-3xl font-extrabold mb-8 text-cyan-400 tracking-wide drop-shadow">
        {isEdit ? 'Edit Article' : 'Create New Article'}
      </h2>

      {/* Title */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-300">Title</label>
        <input
          className="w-full bg-gray-900 text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 text-gray-300">Content</label>
        <textarea
          className="w-full bg-gray-900 text-white border border-gray-600 p-3 rounded-lg h-48 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          placeholder="Article Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2 text-gray-300">Tags (comma separated)</label>
        <input
          className="w-full bg-gray-900 text-white border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          placeholder="e.g. react, node, mongodb"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={!title || !content}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            !title || !content
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md hover:shadow-cyan-500/50'
          }`}
        >
          {isEdit ? 'Update Article' : 'Publish Article'}
        </button>

        <button
          onClick={handleBackOrCancel}
          className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition shadow"
        >
          {isEdit ? 'Cancel' : 'Back'}
        </button>
      </div>
    </div>
  );
};

export default AddEditArticle;
