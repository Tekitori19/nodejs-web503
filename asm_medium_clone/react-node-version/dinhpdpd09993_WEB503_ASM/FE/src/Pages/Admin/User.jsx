import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { delet, get } from '../../services/Endpoint';
import toast from 'react-hot-toast';

export default function User() {
  const [Users,setUsers]=useState([])
  const [loadedata,setLoadedata]=useState(false)
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com' },
    // Add more users as needed
  ];

  const handleDelete = async (userId) => {
    // Display a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmed) {
      try {
        const response = await delet(`/dashboard/delete/${userId}`);
        const data = response.data;
  
        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata); // Trigger reloading the data
        } else {
          toast.error('Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
   
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message)
        } else {
            toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };
  
 useEffect(()=>{
  const getuser=async()=>{
    try {
        const resposne= await get("/dashboard/users")
        const data= resposne.data
        setUsers(data.Users)
        console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  getuser()
 },[loadedata])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Người Dùng</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Tên
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {Users && Users.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.FullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrashAlt className="mr-2" /> Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
