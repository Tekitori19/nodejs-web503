import React, { useState } from 'react';
import Markdown from 'react-markdown';

export default function PostDetail({ post, userId, token, updatePost, addComment, updateComment, deleteComment, setPage, deletePost }) {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [comment, setComment] = useState('');
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');

    const handleDelete = () => {
        deletePost(post._id);
        setPage('posts');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                    <Markdown>
                        {post.title}
                    </Markdown>
                </h1>
                {token && post.author._id === userId && (
                    <div className="mb-6">
                        <input
                            placeholder="Tiêu đề"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            placeholder="Nội dung"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex space-x-4">
                            <button
                                onClick={() => updatePost(title, content)}
                                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cập nhật
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    <span className="mx-2">•</span>
                    <span>5 phút đọc</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                    <Markdown>
                        {post.content}
                    </Markdown>
                </p>
                <div className="flex items-center mb-6">
                    <img src={post.author.avatar} alt="Author Avatar" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">{post.author.name || post.author.email}</p>
                        <p className="text-sm text-gray-500">Người dùng</p>
                    </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Bình luận</h2>
                <div className="space-y-4 mb-6">
                    {post.comments.map((cmt) => (
                        <div key={cmt._id} className="bg-gray-50 rounded-md p-4">
                            {editCommentId === cmt._id ? (
                                <div className="flex items-center space-x-2">
                                    <input
                                        value={editCommentContent}
                                        onChange={(e) => setEditCommentContent(e.target.value)}
                                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button
                                        onClick={() => updateComment(cmt._id, editCommentContent)}
                                        className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                    >
                                        Lưu
                                    </button>
                                    <button
                                        onClick={() => setEditCommentId(null)}
                                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-gray-700">{cmt.content}</p>
                                    <div className="flex items-center mt-2">
                                        <img src={cmt.author.avatar || 'https://via.placeholder.com/40x40'} alt="Author" className="w-8 h-8 rounded-full mr-2" />
                                        <p className="text-sm text-gray-500 italic">{cmt.author.name || cmt.author.email}</p>
                                        {token && cmt.author._id === userId && (
                                            <div className="ml-auto flex space-x-2">
                                                <button
                                                    onClick={() => { setEditCommentId(cmt._id); setEditCommentContent(cmt.content); }}
                                                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                                                >
                                                    Sửa
                                                </button>
                                                <button
                                                    onClick={() => deleteComment(cmt._id)}
                                                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {token ? (
                    <div className="flex items-center mb-6">
                        <input
                            placeholder="Viết bình luận"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={() => addComment(comment)}
                            className="px-4 py-3 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Gửi
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 mb-6">Đăng nhập để thêm bình luận</p>
                )}
                <button
                    onClick={() => setPage('posts')}
                    className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}
