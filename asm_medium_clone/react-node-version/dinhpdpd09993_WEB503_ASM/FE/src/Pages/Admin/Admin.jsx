import React, { useEffect, useState } from 'react';
import { get } from '../../services/Endpoint';

export default function Admin() {
  const [post,setPost]=useState([])
  const [users,setUsers]=useState([])
  const [comments,setComments]=useState([])
  console.log(post)
  useEffect(()=>{
    const GetData=async()=>{
      try {
        const request= await get('/dashboard')
        const response= request.data

        console.log(response)
        if (request.status===200) {
          setPost(response.Posts)
          setUsers(response.Users)
          setComments(response.comments)
        }
      } catch (error) {
        console.log(response)
      }
    }
    GetData()
  },[])
  return (
    <>
      <div className="p-3">
        <h2 className="mb-3 text-blue-400 text-xl font-bold">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-blue-500 rounded shadow p-4">
            <div className="text-white">
              <h5 className="text-lg font-semibold mb-1">Tổng Số Người Dùng</h5>
              <p className="text-2xl font-bold">{users ? users.length : '0'}</p>
            </div>
          </div>
          <div className="bg-green-500 rounded shadow p-4">
            <div className="text-white">
              <h5 className="text-lg font-semibold mb-1">Tổng Số Bài Viết</h5>
              <p className="text-2xl font-bold">{post ? post.length : "0"}</p>
            </div>
          </div>
          <div className="bg-yellow-500 rounded shadow p-4">
            <div className="text-white">
              <h5 className="text-lg font-semibold mb-1">Tổng Số Bình Luận</h5>
              <p className="text-2xl font-bold">{comments ? comments.length : "0"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
