import React, { useEffect, useState } from 'react';
import { FaUser, FaLock, FaCamera } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { BaseUrl, patch } from '../services/Endpoint';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUser } from '../redux/AuthSlice';

export default function Profile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setName(user.FullName)
    }
  }, [])

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('FullName', name)
    formData.append('oldpassword', oldPassword)
    formData.append('newpassword', newPassword)
    if (profileImage) {
      formData.append('profile', profileImage)
    }
    try {
      const resposne = await patch(`auth/profile/${userId}`, formData)
      const data = resposne.data
      console.log(data)
      if (resposne.status == 200) {
        toast.success(data.message)
        dispatch(setUser(data.user));
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Cập nhật hồ sơ</h1>
      
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <label htmlFor="profileImage" className="cursor-pointer block">
              {profileImage ? (
                <img 
                  src={URL.createObjectURL(profileImage)} 
                  alt="Avatar" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src={`${BaseUrl}/images/${user.profile}`} 
                    alt='Avatar'  
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="absolute bottom-0 right-0 p-2 bg-gray-700 rounded-full">
                <FaCamera className="text-white text-xl" />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cập nhật tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Cập nhật hồ sơ
        </button>
      </form>
    </div>
  );
}
