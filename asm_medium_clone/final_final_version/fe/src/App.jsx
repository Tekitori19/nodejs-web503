import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Navbar from './components/NavBar';
import Register from './components/Register';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';
import Profile from './components/Profile';
import Sidebar from './components/SideBar';
import Footer from './components/Footer';


function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
    const [page, setPage] = useState('posts');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || 'https://via.placeholder.com/150');
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const api = axios.create({
        baseURL: 'http://localhost:5000',
        headers: token ? { Authorization: token } : {}
    });

    const register = async (email, password, name, avatar, description) => {
        try {
            await api.post('/register', { email, password, name, avatar, description });
            alert('Đăng ký thành công');
            setPage('login');
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/login', { email, password });
            setToken(res.data.token);
            setUserId(res.data.userId);
            setEmail(res.data.email);
            setName(res.data.name);
            setAvatar(res.data.avatar);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('avatar', res.data.avatar);
            setPage('posts');
            getPosts(1);
            getUsers();
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setEmail('');
        setName('');
        setAvatar('https://via.placeholder.com/150');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('avatar');
        setPage('posts');
        setSelectedPost(null);
        setProfile(null);
        getPosts(1);
    };

    const createPost = async (title, content) => {
        try {
            await api.post('/post', { title, content });
            alert('Đăng bài thành công');
            getPosts(currentPage);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const updatePost = async (title, content) => {
        try {
            await api.put(`/post/${selectedPost._id}`, { title, content });
            alert('Cập nhật thành công');
            setPage('posts');
            getPosts(currentPage);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const getPosts = async (page) => {
        const res = await api.get(`/post?page=${page}&limit=5`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
    };

    const viewPost = async (id) => {
        const res = await api.get(`/post/${id}`);
        setSelectedPost(res.data);
        setPage('postDetail');
    };

    const search = async (searchQuery, page = 1) => {
        const res = await api.get(`/search?q=${searchQuery}&page=${page}&limit=5`);
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
    };

    const viewProfile = async (id) => {
        const res = await api.get(`/profile/${id}`);
        setProfile(res.data);
        setPage('profile');
    };

    const updateProfile = async (updatedProfile) => {
        if (typeof updatedProfile === 'object') {
            try {
                const res = await api.put('/profile', {
                    avatar: updatedProfile.avatar,
                    description: updatedProfile.description,
                    name: updatedProfile.name,
                    oldPassword: updatedProfile.oldPassword,
                    newPassword: updatedProfile.newPassword
                });
                alert('Cập nhật profile thành công');
                setAvatar(res.data.avatar);
                setEmail(res.data.email);
                setName(res.data.name);
                localStorage.setItem('avatar', res.data.avatar);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('name', res.data.name);
                viewProfile(userId);
            } catch (err) {
                alert(err.response.data.message);
            }
        }
    };

    const deletePost = async (id) => {
        try {
            await api.delete(`/post/${id}`);
            alert('Xóa bài viết thành công');
            getPosts(currentPage);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const addComment = async (content) => {
        try {
            await api.post(`/post/${selectedPost._id}/comment`, { content });
            alert('Thêm comment thành công');
            viewPost(selectedPost._id);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const updateComment = async (commentId, content) => {
        try {
            await api.put(`/post/${selectedPost._id}/comment/${commentId}`, { content });
            alert('Cập nhật comment thành công');
            viewPost(selectedPost._id);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const handlePostsFetched = (data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
    };

    const deleteComment = async (commentId) => {
        try {
            await api.delete(`/post/${selectedPost._id}/comment/${commentId}`);
            alert('Xóa comment thành công');
            viewPost(selectedPost._id);
        } catch (err) {
            alert(err.response.data.message);
        }
    };

    const getUsers = async () => {
        const res = await api.get('/users');
        setUsers(res.data);
    };

    useEffect(() => {
        if (page === 'posts' || page === 'postDetail' || page === 'profile') {
            getPosts(currentPage);
            getUsers();
        }
    }, [page, token]);

    useEffect(() => {
        if (token && userId) {
            viewProfile(userId);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar
                avatar={avatar}
                name={name || email}
                token={token}
                setPage={setPage}
                logout={logout}
                viewProfile={viewProfile}
                userId={userId}
            />
            <div className="flex flex-1">
                {page === 'login' && <Login setPage={setPage} login={login} />}
                {page === 'register' && <Register setPage={setPage} register={register} />}
                {(page === 'posts' || page === 'postDetail' || page === 'profile') && (
                    <>
                        <div className="flex-1">
                            {page === 'posts' && (
                                <Posts
                                    posts={posts}
                                    userId={userId}
                                    token={token}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    createPost={createPost}
                                    search={search}
                                    viewPost={viewPost}
                                    viewProfile={viewProfile}
                                    deletePost={deletePost}
                                    setPage={setPage}
                                    setCurrentPage={setCurrentPage}
                                    onPostsFetched={handlePostsFetched}
                                />
                            )}
                            {page === 'postDetail' && selectedPost && (
                                <PostDetail
                                    post={selectedPost}
                                    userId={userId}
                                    token={token}
                                    updatePost={updatePost}
                                    addComment={addComment}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                    deletePost={deletePost}
                                    setPage={setPage}
                                />
                            )}
                            {page === 'profile' && profile && (
                                <Profile
                                    profile={profile}
                                    userId={userId}
                                    email={email}
                                    token={token}
                                    updateProfile={updateProfile}
                                    setPage={setPage}
                                    viewPost={viewPost}
                                />
                            )}
                        </div>
                        <Sidebar users={users} viewProfile={viewProfile} currentUserId={userId} />
                    </>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
}

export default App;
