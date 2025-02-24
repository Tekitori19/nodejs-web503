import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const request = await post('/auth/login', value);
            const response = request.data;
            console.log("login success", response);
            if (request.status==200) {
                dispatch(setUser(response.user));
                navigate('/')
                toast.success(response.message)
            }
        } catch (error) {
            console.error("login error", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
            }
        }
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4">
                <div className="mb-4 flex items-center text-gray-900">
                    <img className="mr-2 w-8 h-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    <Link to={'/'}>
                        <span className="text-xl font-bold">Blog</span>
                    </Link>
                </div>
                <div className="w-full max-w-md bg-white rounded-lg shadow-md">
                    <div className="p-6">
                        <h1 className="text-xl font-bold text-gray-900 mb-4">Đăng nhập vào tài khoản</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    id="email"
                                    placeholder="name@company.com"
                                    required
                                    value={value.email}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                                <input
                                    type="password"
                                    onChange={handleChange}
                                    value={value.password}
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    id="password"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Đăng nhập
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-gray-500">
                            Chưa có tài khoản? {" "}
                            <Link to="/register" className="font-medium text-indigo-600 hover:underline">
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
