import React from "react";
import Navbar from "./Navbar";

const Sidebar = () => {
  return (
    <div>
      <div class="">
        <aside class="flex justify-center items-center bg-purple-600 w-72 overflow-y-auto h-screen fixed">
          <h1 className="text-white text-xl font-extrabold">Sidebar</h1>
        </aside>
        <main class="relative left-72 main">
          <div>
            <Navbar />
            <p className="p-96">Hi I'm Content</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
