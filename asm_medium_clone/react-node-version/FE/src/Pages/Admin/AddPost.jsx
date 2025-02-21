import React, { useState } from 'react';
import { post } from '../../services/Endpoint';
import toast from 'react-hot-toast';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  console.log('image',image)

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (image) {
        formData.append('postimg', image);
      }
      formData.append('title', title);
      formData.append('desc', description);
      
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      
      const response = await post('/blog/create', formData);
      const data = response.data;
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setImage(null)
        setDescription('')
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded shadow overflow-hidden">
        <div className="bg-blue-500 py-3">
          <h2 className="text-center text-white text-xl font-bold">Thêm Bài Viết Mới</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="postImage" className="block text-sm font-medium text-gray-700 mb-1">
                Tải Ảnh Lên
              </label>
              <input 
                type="file" 
                className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                id="image" 
                onChange={(e) => setImage(e.target.files[0])} 
              />
            </div>
            
            <div>
              <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu Đề
              </label>
              <input 
                type="text" 
                className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                id="postTitle" 
                placeholder="Nhập tiêu đề bài viết" 
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
                required
              />
            </div>

            <div>
              <label htmlFor="postDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Nội Dung
              </label>
              <textarea 
                className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                id="postDescription" 
                rows="4" 
                placeholder="Viết nội dung bài viết của bạn tại đây" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition duration-150"
              onClick={handleSumbit}
            >
              Đăng Bài
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}