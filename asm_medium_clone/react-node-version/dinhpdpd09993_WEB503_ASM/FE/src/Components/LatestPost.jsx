import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseUrl, get } from '../services/Endpoint';
import Markdown from 'react-markdown';

export default function LatestPost() {
    const navigation = useNavigate();

    const handleBlog = (id) => {
        navigation(`/blog/${id}`);
    };

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const request = await get('/blog/GetPosts');
                const response = request.data;
                setBlogs(response.posts);
                console.log('blogs', response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, []);

    // Helper function to truncate text to a specific number of words
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-20 text-center">        
                    <h2 class="text-2xl font-bold text-gray-900 mb-6">Bài viết nổi bật</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {blogs && blogs.map((elem) => {
                        return (
                            <div className="mb-4" key={elem._id}>
                                <div className="border-2 border-green-500 bg-[#2b2b2b] rounded-lg overflow-hidden">
                                    <img 
                                        src={`${BaseUrl}/images/${elem.image}`} 
                                        className="w-full h-[200px] object-cover" 
                                        alt="Blog Post 1"
                                    />
                                    <div className="p-4 bg-gray-900 text-white">
                                        <h5 className="text-xl font-bold mb-2">{elem.title}</h5>
                                        <Markdown className="text-gray-300">{truncateText(elem.desc, 20)}</Markdown>
                                        <button 
                                            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200" 
                                            onClick={() => handleBlog(elem._id)}
                                        >
                                            Read Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
