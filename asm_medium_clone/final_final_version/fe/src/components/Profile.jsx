import React, { useState } from 'react';
import Markdown from 'react-markdown';

export default function Profile({ profile, userId, email, token, updateProfile, setPage, viewPost }) {
    const [avatar, setAvatar] = useState(profile.avatar);
    const [description, setDescription] = useState(profile.description);
    const [name, setName] = useState(profile.name);
    const [oldPassword, setOldPassword] = useState(''); // Thêm state cho mật khẩu cũ
    const [newPassword, setNewPassword] = useState(''); // Thêm state cho mật khẩu mới
    const [activeTab, setActiveTab] = useState(null);

    const handleUpdate = () => {
        updateProfile({ ...profile, avatar, description, name, oldPassword, newPassword });
        setOldPassword(''); // Reset mật khẩu cũ sau khi cập nhật
        setNewPassword(''); // Reset mật khẩu mới sau khi cập nhật
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Profile</h1>
                <div className="flex items-center mb-6">
                    <img src={avatar} alt="Avatar" className="w-24 object-cover h-24 rounded-full mr-6" />
                    <div>
                        <p className="text-xl font-semibold text-gray-900">Tên: {profile.name || profile.email}</p>
                        <p className="text-gray-600">Email: {profile.email}</p>
                        {/* <p className="text-gray-600">{description}</p> */}
                        <div className='text-gray-600'>
                            <Markdown>
                                {description}
                            </Markdown>
                        </div>
                    </div>
                </div>
                {token && profile.email === email && (
                    <div className="mb-6">
                        <input
                            placeholder="Tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            placeholder="Link ảnh đại diện"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            placeholder="Mô tả bản thân"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            placeholder="Mật khẩu cũ (bắt buộc nếu đổi mật khẩu)"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            placeholder="Mật khẩu mới (ít nhất 6 ký tự, để trống nếu không đổi)"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                            onClick={handleUpdate}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cập nhật
                        </button>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h2
                            onClick={() => setActiveTab('posts')}
                            className={`text-2xl font-semibold text-gray-900 mb-4 cursor-pointer ${activeTab === 'posts' ? 'text-indigo-600' : 'hover:text-indigo-500'}`}
                        >
                            Bài viết ({profile.posts.length})
                        </h2>
                        {activeTab === 'posts' && (
                            <div className="space-y-4">
                                {profile.posts.map((post) => (
                                    <div key={post._id} className="bg-gray-50 rounded-md p-4">
                                        <h3 onClick={() => viewPost(post._id)} className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            <Markdown>
                                                {post.content.substring(0, 100) + '...'}
                                            </Markdown>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <h2
                            onClick={() => setActiveTab('comments')}
                            className={`text-2xl font-semibold text-gray-900 mb-4 cursor-pointer ${activeTab === 'comments' ? 'text-indigo-600' : 'hover:text-indigo-500'}`}
                        >
                            Bình luận ({profile.comments.length})
                        </h2>
                        {activeTab === 'comments' && (
                            <div className="space-y-4">
                                {profile.comments.map((cmt) => (
                                    <p key={cmt._id} className="bg-gray-50 rounded-md p-4 text-gray-700">
                                        {cmt.content} <span className="italic">(trong bài: {cmt.postTitle})</span>
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => setPage('posts')}
                    className="mt-6 px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                >
                    Quay lại
                </button>
            </div>
        </div>
    );
}
