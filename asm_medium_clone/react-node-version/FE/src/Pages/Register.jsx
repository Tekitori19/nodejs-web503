import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate=useNavigate()
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('FullName', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image);

    try {
      const response = await post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      if (data.success) {
        console.log(data.message)
        navigate('/login')
        toast.success(data.message)
      }
      console.log('register api', data);
    } catch (error) {
      console.log(error);
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
            <h1 className="text-xl font-bold text-gray-900 mb-4">Tạo tài khoản mới</h1>
            <form onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900">Ảnh đại diện</label>
                <div className="flex justify-center">
                  <img 
                    src={value.image ? URL.createObjectURL(value.image) : 'https://via.placeholder.com/150'} 
                    alt="avatar" 
                    className="rounded-full w-24 h-24 cursor-pointer"
                    onClick={handleImageClick}
                  />
                </div>
                <input 
                  type="file" 
                  className="hidden"
                  id="image" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900">Họ và tên</label>
                <input 
                  type="text" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  id="fullName" 
                  placeholder="Nguyễn Văn A" 
                  required 
                  value={value.fullName} 
                  onChange={(e) => setValue({ ...value, fullName: e.target.value })} 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input 
                  type="email" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  id="email" 
                  placeholder="name@company.com" 
                  required 
                  value={value.email} 
                  onChange={(e) => setValue({ ...value, email: e.target.value })} 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Mật khẩu</label>
                <input 
                  type="password" 
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  value={value.password} 
                  onChange={(e) => setValue({ ...value, password: e.target.value })} 
                />
              </div>
              <button 
                type="submit" 
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Đăng ký
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-500">
              Đã có tài khoản? {" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
