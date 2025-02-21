import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { removeUser } from '../redux/AuthSlice';
import SearchPosts from './SearchPosts';
import toast from 'react-hot-toast';

export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [islogin, setIslogin] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const user = useSelector((state) => state.auth.user)

    const handleLogout = async () => {
        try {
            const request = await post("/auth/logout")
            const response = request.data
            if (request.status == 200) {
                navigate('/login')
                dispatch(removeUser())
                toast.success(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to={'/'} className="flex items-center">
                            <h1 className="text-2xl font-bold text-indigo-600">Blog</h1>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <SearchPosts />
                        {!user ? (
                            <Link to={'/login'}>
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Đăng nhập
                                </button>
                            </Link>
                        ) : (
                            <div className="relative">
                                <div 
                                    className="flex items-center cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={`${BaseUrl}/images/${user.profile}`}
                                            alt="Profile"
                                        />
                                    </div>
                                </div>
                                {showDropdown && (
                                    <ul className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                        {user.role === 'admin' && (
                                            <li>
                                                <Link 
                                                    to="/dashboard" 
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}
                                        <li>
                                            <Link 
                                                to={`/profile/${user._id}`} 
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
