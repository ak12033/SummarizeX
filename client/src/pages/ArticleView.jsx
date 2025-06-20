import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState('');
  const [articleLoading, setArticleLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rateLimited, setRateLimited] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  const load = async () => {
    setArticleLoading(true);
    setErrorMessage('');
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setArticle(res.data);
    } catch (error) {
      console.error('Error loading article:', error);
      setErrorMessage('Failed to load article.');
    } finally {
      setArticleLoading(false);
    }
  };

  useEffect(() => {
    setArticle(null);
    setSummary('');
    setErrorMessage('');
    setRateLimited(false);
    setShowSummary(false);
    load();
  }, [id]);

  const summarize = async () => {
    setSummaryLoading(true);
    setSummary('');
    setErrorMessage('');
    setShowSummary(false);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/articles/${id}/summarize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSummary(res.data.summary);
      setShowSummary(true);

      setTimeout(() => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Summarize error:', error);
      if (error.response && error.response.status === 429) {
        setErrorMessage('⚠️ Rate limit exceeded. Please try again later.');
        setRateLimited(true);
      } else {
        setErrorMessage('Something went wrong while summarizing.');
      }
    } finally {
      setSummaryLoading(false);
    }
  };

  if (articleLoading || !article)
    return (
      <div className="p-10 text-center text-gray-300 text-xl animate-pulse">
        Loading article...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-10 mt-20 bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-xl text-white">
      <h2 className="text-4xl font-extrabold mb-6 text-cyan-400 drop-shadow">
        {article.title}
      </h2>

      <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-10">
        {article.content}
      </p>

      <div className="border-t border-gray-700 my-8"></div>

      <button
        onClick={summarize}
        disabled={summaryLoading || rateLimited}
        className={`px-6 py-3 rounded-lg font-semibold transition ${
          summaryLoading || rateLimited
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-md hover:shadow-cyan-500/50'
        }`}
      >
        {summaryLoading
          ? 'Summarizing...'
          : rateLimited
          ? 'Try later'
          : 'Summarize Article'}
      </button>

      {errorMessage && (
        <div className="my-6 p-4 bg-red-800/30 text-red-300 border border-red-500 rounded-lg shadow">
          {errorMessage}
        </div>
      )}

      {showSummary && (
        <div ref={summaryRef} className="mt-10 bg-gray-900/80 p-6 rounded-lg shadow-inner border border-gray-700">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">Summary</h3>
          <p className="text-gray-300 leading-relaxed">{summary}</p>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
