import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FiEdit, FiTrash2, FiUser, FiMoreVertical } from 'react-icons/fi';
import { useState } from 'react';

const ArticleCard = ({ article, onDelete }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (e) {
      console.error('Invalid token', e);
    }
  }

  const userId = user?.id || user?._id || user?.sub;
  const creatorId = article.createdBy?._id || article.createdBy;
  const creatorName = article.createdBy?.username || 'Anonymous';

  const isCreator = userId === creatorId;
  const isAdmin = user?.role === 'admin';

  const handleDelete = async (e) => {
    e.stopPropagation();
    setMenuOpen(false);
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

  const handleEdit = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    navigate(`/edit-article/${article._id}`);
  };

  return (
    <div onClick={() => navigate(`/article/${article._id}`)}
      className="relative block max-w-sm border border-gray-800 p-4 rounded-xl bg-gradient-to-br 
      from-gray-900 to-gray-700 shadow-md transition-all duration-500 ease-in-out transform 
      hover:scale-105 hover:shadow-blue-900/50 hover:shadow-2xl hover:backdrop-blur-sm cursor-pointer"
    >
      {/* 3-dot menu */}
      {(isCreator || isAdmin) && (
        <div className="absolute top-3 right-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="text-gray-400 hover:text-white p-1 rounded"
          >
            <FiMoreVertical size={20} className='cursor-pointer'/>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-28 bg-gray-800 border 
            border-gray-700 rounded shadow-lg z-50">
              {isCreator && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-200 
                  hover:bg-gray-700"
                >
                  <FiEdit size={14} /> Edit
                </button>
              )}
              {(isCreator || isAdmin) && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-3 py-2 w-full text-sm text-red-400 hover:bg-gray-700"
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* User Profile */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 bg-blue-700 rounded-full">
          <FiUser className="text-white" size={16} />
        </div>
        <p className="text-sm text-gray-300">{creatorName}</p>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2 tracking-wide">
        {article.title.slice(0, 62)}
      </h3>

      <p className="text-sm text-gray-400 mb-4 leading-relaxed">
        {article.content.slice(0, 200)}...
      </p>
    </div>
  );
};

export default ArticleCard;
