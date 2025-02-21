import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, delet, get } from '../services/Endpoint';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

export default function AllPost() {
  const [posts,setPosts]=useState([])
  const [loadedata,setLoadedata]=useState(false)
  const navigate = useNavigate();

  const handleDelete = async(postId) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này?');
    
    if (confirmed) {
      try {
        const response = await delet(`/blog/delete/${postId}`);
        const data = response.data;

        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata);
        } else {
          toast.error('Không thể xóa bài viết.');
        }
      } catch (error) {
        console.error('Lỗi khi xóa:', error);

        if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      }
    }
  };

  const handleUpdate = (postId) => {
    console.log(`Post with ID ${postId} updated.`);
    navigate(`/update-post/${postId}`);
  };

  useEffect(()=>{
    const getposts=async()=>{
      try {
        const resposne= await get("/blog/GetPosts")
        const data= resposne.data
        setPosts(data.posts)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getposts()
  },[loadedata])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Tất cả bài viết</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img 
                src={`${BaseUrl}/images/${post.image}`} 
                className="absolute w-full h-full object-cover"
                alt={post.title} 
              />
            </div>
            <div className="p-6">
              <h5 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h5>
              <div className="prose prose-sm text-gray-600 line-clamp-3">
                <Markdown>{post.description}</Markdown>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
              <button
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors duration-150 ease-in-out"
                onClick={() => handleDelete(post._id)}
              >
                <FaTrashAlt className="mr-2 h-4 w-4" /> 
                <span>Xóa</span>
              </button>
              <button
                className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md transition-colors duration-150 ease-in-out"
                onClick={() => handleUpdate(post._id)}
              >
                <FaEdit className="mr-2 h-4 w-4" />
                <span>Sửa</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
