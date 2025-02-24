import React, { useState } from 'react';

export default function Register({ setPage, register }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="flex w-full items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Đăng ký</h1>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                    placeholder="Tên (tùy chọn)"
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
                    className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="flex justify-between">
                    <button
                        onClick={() => register(email, password, name, avatar, description)}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Đăng ký
                    </button>
                    <button
                        onClick={() => setPage('posts')}
                        className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        </div>
    );
}
