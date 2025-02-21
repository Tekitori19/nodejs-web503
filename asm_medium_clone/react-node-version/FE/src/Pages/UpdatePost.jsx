import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BaseUrl, get, patch } from '../services/Endpoint';
import toast from 'react-hot-toast';

export default function UpdatePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    postimg: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await get(`/public/Singlepost/${postId}`);
        const post = response.data.Post;
        setFormData({
          title: post.title,
          desc: post.desc,
          postimg: null
        });
      } catch (error) {
        toast.error('Không thể tải thông tin bài viết');
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'postimg') {
      setFormData({ ...formData, postimg: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('desc', formData.desc);
      if (formData.postimg) {
        formDataToSend.append('postimg', formData.postimg);
      }

      const response = await patch(`/blog/update/${postId}`, formDataToSend);
      
      if (response.data.success) {
        toast.success('Cập nhật bài viết thành công');
        navigate('/dashboard/allposts');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật bài viết');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Cập nhật bài viết</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nội dung
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="desc"
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="postimg" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hình ảnh
                </label>
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  id="postimg"
                  name="postimg"
                  onChange={handleChange}
                  accept="image/*"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 max-w-[200px] rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className={`w-full px-4 py-2 text-white font-medium rounded-md ${
                    loading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } transition duration-150 ease-in-out`}
                  disabled={loading}
                >
                  {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-md transition duration-150 ease-in-out"
                  onClick={() => navigate('/dashboard/allposts')}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}