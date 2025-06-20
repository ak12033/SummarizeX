import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard';
import AddEditArticle from './pages/AddEditArticle';
import ArticleView from './pages/ArticleView';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-article" element={<PrivateRoute><AddEditArticle /></PrivateRoute>} />
        <Route path="/edit-article/:id" element={<PrivateRoute><AddEditArticle /></PrivateRoute>} />
        <Route path="/article/:id" element={<PrivateRoute><ArticleView /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
