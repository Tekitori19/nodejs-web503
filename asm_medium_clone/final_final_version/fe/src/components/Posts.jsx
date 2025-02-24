import React, { useState } from 'react';
import Markdown from 'react-markdown';
import axios from 'axios'; // Thêm axios vào Posts.js

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export default function Posts({
    posts,
    userId,
    token,
    currentPage,
    totalPages,
    createPost,
    search,
    viewPost,
    viewProfile,
    deletePost,
    setPage,
    setCurrentPage,
    onPostsFetched // Thêm props để truyền dữ liệu lên cha
}) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Sửa lại handlePageChange để không gọi getPosts trực tiếp
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            if (searchQuery) {
                search(searchQuery, newPage);
            } else {
                // Gọi API và truyền dữ liệu lên cha
                fetchPosts(newPage);
            }
        }
    };

    const fetchPosts = async (page) => {
        try {
            const res = await api.get(`/post?page=${page}&limit=5`, {
                headers: token ? { Authorization: token } : {}
            });
            // Truyền dữ liệu lên cha thay vì set trực tiếp
            onPostsFetched({
                posts: res.data.posts,
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage
            });
        } catch (err) {
            console.error('Lỗi khi lấy posts:', err);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg mb-12">
                <div className="py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">BLOG CÁ NHÂN</h2>
                    <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Chia sẻ kiến thức và trải nghiệm
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                        Nơi ghi lại những câu chuyện, kiến thức và trải nghiệm thú vị trong cuộc sống.
                    </p>
                </div>
            </div>

            {token && (
                <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng bài mới</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <input
                            placeholder="Tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <textarea
                            placeholder="Nội dung"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            cols="30"
                            rows="10"
                        />
                        <button
                            onClick={() => createPost(title, content)}
                            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Đăng bài
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-12 flex items-center">
                <input
                    placeholder="Tìm kiếm bài viết hoặc tên user"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={() => search(searchQuery, 1)}
                    className="px-4 py-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Tìm
                </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài viết</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="https://th.bing.com/th/id/R.2cb49a527925196a98c76d5451347655?rik=4tt8mZ2FRG2fiw&pid=ImgRaw&r=0" alt="Post" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                                <span className="mx-2">•</span>
                                <span>5 phút đọc</span>
                            </div>
                            <h3
                                onClick={() => viewPost(post._id)}
                                className="text-xl font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer"
                            >
                                {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                <Markdown>
                                    {post.content.substring(0, 100) + '...'}
                                </Markdown>
                            </p>
                            <div className="flex items-center">
                                <img src={post.author.avatar} alt="Author" className="w-10 h-10 rounded-full" />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{post.author.name || post.author.email}</p>
                                    <p className="text-sm text-gray-500">Người dùng</p>
                                </div>
                                <button
                                    onClick={() => viewProfile(post.author._id)}
                                    className="ml-auto px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                >
                                    Xem profile
                                </button>
                                {token && post.author._id === userId && (
                                    <button
                                        onClick={() => deletePost(post._id)}
                                        className="ml-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                    >
                                        Xóa
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                >
                    Trang trước
                </button>
                <span className="text-gray-800">Trang {currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                >
                    Trang sau
                </button>
            </div>

            {!token && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setPage('login')}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Đăng nhập để thêm bài viết
                    </button>
                </div>
            )}
        </div>
    );
}
