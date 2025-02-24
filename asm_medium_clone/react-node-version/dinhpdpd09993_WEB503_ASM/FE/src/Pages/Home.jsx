import React, { useEffect, useState } from 'react';
import LatestPost from '../Components/LatestPost';
import { get } from '../services/Endpoint';

export default function Home() {

  return (
    <>
    <div class="bg-white">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div class="text-center">
                <h2 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">BLOG CÁ NHÂN</h2>
                <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Chia sẻ kiến thức và trải nghiệm
                </p>
                <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    Nơi ghi lại những câu chuyện, kiến thức và trải nghiệm thú vị trong cuộc sống.
                </p>
            </div>
        </div>
    </div>


      <div className="w-full p-20">
        <LatestPost />
      </div>
    </>
  );
}
