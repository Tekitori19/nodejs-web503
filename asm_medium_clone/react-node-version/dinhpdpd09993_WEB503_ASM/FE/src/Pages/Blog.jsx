import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get, post } from '../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown'

export default function Blog() {
  const { postId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [singlePost, setSinglePost] = useState(null);
  const [comment, setComment] = useState('');
  const [loaddata, setLoaddata] = useState(false);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const request = await get(`/public/Singlepost/${postId}`);
        const response = request.data;
        setSinglePost(response.Post);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSinglePost();
  }, [loaddata, postId]);

  const onSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Vui lòng đăng nhập')
    } else {
      try {
        const request = await post("/comment/addcomment", {
          comment,
          postId,
          userId: user._id,
        });
        const response = request.data;
        console.log(response);
        setLoaddata((prevState) => !prevState);
        if (response.success) {
          toast.success(response.message)
          setComment('')
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{post && post.title}</h1>
        
        <img 
          src={singlePost && `${BaseUrl}/images/${singlePost.image}`}
          alt="Hình ảnh bài viết"
          className="w-full h-[500px] object-cover rounded-lg mb-8"
        />

        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-em:text-gray-300 prose-code:text-blue-300 prose-pre:bg-gray-800 prose-blockquote:text-gray-300 prose-blockquote:border-l-4 prose-blockquote:border-gray-500 prose-blockquote:pl-4 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-a:text-blue-400 hover:prose-a:text-blue-300">
          <Markdown className="text-2xl font-bold mb-8 leading-relaxed py-4">{post && post.title}</Markdown>
          <Markdown className="text-lg leading-loose py-6 px-4">{singlePost && singlePost.desc}</Markdown>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Viết bình luận</h3>
          <form onSubmit={onSubmitComment}>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium mb-2">Bình luận</label>
              <textarea 
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="comment"
                rows="4"
                placeholder="Viết bình luận của bạn"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Gửi bình luận
            </button>
          </form>
        </div>

        <hr className="my-8 border-gray-700" />

        <div>
          <h3 className="text-2xl font-semibold mb-6">Bình luận</h3>
          {singlePost && singlePost.comments && singlePost.comments.map((elem, index) => (
            <div key={index} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg mb-4">
              <img 
                src={`${BaseUrl}/images/${elem.userId.profile}`}
                alt={elem.userId.FullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-medium mb-2">{elem.userId.FullName}</h5>
                <p className="text-gray-300">{elem.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
