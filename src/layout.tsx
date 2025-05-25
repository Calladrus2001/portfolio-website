import React from 'react'
import Home from './screens/Home';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiDevpost } from "react-icons/si";

function Layout() {
  return (
    <div className="min-h-screen w-full p-2 flex flex-col justify-between gap-4 bg-stone-800 text-stone-200">
      <div className="w-full flex">
        <p className="mx-auto font-semibold">viz_dugs</p>
      </div>
      <Home />
      <div className="w-full flex mt-8 lg:mt-0 justify-center space-x-5 text-lg [&>*]:cursor-pointer">
        <FaLinkedin />
        <FaGithub />
        <SiLeetcode />
        <SiDevpost />
      </div>
    </div>
  );
}

export default Layout;