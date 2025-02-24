import React from 'react';
import { FaHome, FaPlusSquare, FaUsers, FaFileAlt, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="bg-gray-900 text-white h-screen w-[250px]">
      <div className="p-3">
        <ul className="flex flex-col space-y-3">
          <li>
            <Link className="flex items-center text-white hover:bg-gray-800 rounded-lg p-2" to="/dashboard">
              <FaHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link className="flex items-center text-white hover:bg-gray-800 rounded-lg p-2" to="/dashboard/addpost">
              <FaPlusSquare className="mr-2" /> Add Post
            </Link>
          </li>
          <li>
            <Link className="flex items-center text-white hover:bg-gray-800 rounded-lg p-2" to="/dashboard/users">
              <FaUsers className="mr-2" /> All Users
            </Link>
          </li>
          <li>
            <Link className="flex items-center text-white hover:bg-gray-800 rounded-lg p-2" to="/dashboard/allposts">
              <FaFileAlt className="mr-2" /> All Posts
            </Link>
          </li>
          {/* <li>
            <a className="flex items-center text-white hover:bg-gray-800 rounded-lg p-2" href="#">
              <FaComments className="mr-2" /> All Comments
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
