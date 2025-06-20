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

            // Wait a tick for the DOM to update
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

    if (articleLoading || !article) return <div className="p-6">Loading article...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{article.content}</p>

            {/* spacing block */}
            <div className="my-6 border-t border-gray-300"></div>

            {/* Summary button */}
            <button
                onClick={summarize}
                disabled={summaryLoading || rateLimited}
                className={`px-4 py-2 rounded transition ${
                    summaryLoading || rateLimited
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-800 cursor-pointer'
                }`}
            >
                {summaryLoading
                    ? 'Summarizing...'
                    : rateLimited
                    ? 'Try later'
                    : 'Summarize Article'}
            </button>

            {/* Error Message */}
            {errorMessage && (
                <div className="my-4 p-3 bg-red-100 text-red-600 rounded">
                    {errorMessage}
                </div>
            )}

            {/* Summary content */}
            {showSummary && (
                <div ref={summaryRef} className="my-6">
                    <strong className="block mb-2 text-lg">Summary:</strong>
                    <p className="text-gray-800">{summary}</p>
                </div>
            )}
        </div>
    );
};

export default ArticleView;
