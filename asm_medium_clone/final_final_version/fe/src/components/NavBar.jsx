import React, { useState } from 'react';

export default function Navbar({ avatar, name, token, setPage, viewProfile, userId, logout }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        if (userId) {
            viewProfile(userId);
            setIsDropdownOpen(false);
        }
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1
                                className="text-2xl font-bold text-indigo-600 cursor-pointer"
                                onClick={() => setPage('posts')}
                            >
                                MyBlog
                            </h1>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a
                                href="#"
                                onClick={() => setPage('posts')}
                                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Trang chủ
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Mới nhất
                            </a>
                            <a
                                href="#"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Phổ biến
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {token ? (
                            <div className="relative">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                        <button
                                            onClick={handleProfileClick}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                                        >
                                            Profile ({name})
                                        </button>
                                        <button
                                            onClick={logout}
                                            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                                        >
                                            Đăng xuất
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => setPage('login')}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    onClick={() => setPage('register')}
                                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Đăng ký
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
