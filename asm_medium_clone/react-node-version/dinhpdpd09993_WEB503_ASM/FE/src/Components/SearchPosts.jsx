import React, { useState, useEffect } from 'react';
import { get } from '../services/Endpoint';
import Markdown from 'react-markdown';

function SearchPosts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);  // Khởi tạo là mảng rỗng
  const [loading, setLoading] = useState(false);

  const searchPosts = async () => {
    try {
      setLoading(true);
      const response = await get(`/blog/search`, { title: searchTerm });
      // Đảm bảo dữ liệu trả về là một mảng
      setPosts(response.data.success ? response.data.posts : []);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm bài viết:', error);
      setPosts([]); // Reset về mảng rỗng nếu có lỗi
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchPosts();
      } else {
        setPosts([]); // Reset về mảng rỗng khi không có từ khóa tìm kiếm
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="mt-5 p-5">
      <input
        type="text"
        placeholder="Tìm kiếm bài viết..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2.5 mb-5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <div className="text-gray-600">Đang tìm kiếm...</div>
      ) : (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {posts.length > 0 ? (
            posts.map(post => (
              <a href={`/blog/${post._id}`} key={post._id} className="block p-4 border-b border-gray-100 hover:bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900">{post.title}</h3>
                <Markdown className="text-xs text-gray-500 mt-1">{post.desc.slice(0, 100) + "..."}</Markdown>
              </a>
            ))
          ) : searchTerm ? (
            <div className="text-gray-600">Không tìm thấy bài viết nào</div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SearchPosts;