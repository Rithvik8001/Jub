import { Link as LinkIcon, MenuIcon } from "lucide-react";
import { useState } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="border-b border-gray-200 p-2 sticky top-0 bg-white z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <LinkIcon width={24} height={24} className="text-gray-900" />
            <h1 className="text-2xl font-bold tracking-tighter">Jub</h1>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="bg-gray-900 text-white px-4 py-[0.3rem]  rounded-md hover:bg-gray-800 cursor-pointer text-sm font-light border border-gray-900 hover:border-gray-800 transition-all duration-300">
              Signup
            </button>
            <button className="bg-white text-gray-900 px-4  py-[0.3rem]  rounded-md cursor-pointer text-sm font-light border border-gray-300 transition-all duration-300 hover:border- hover:border-gray-200">
              Login
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            >
              <MenuIcon width={24} height={24} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <LinkIcon width={24} height={24} className="text-gray-900" />
              <h1 className="text-2xl font-bold tracking-tighter">Jub</h1>
            </div>
            <button onClick={() => setIsOpen(false)} className="cursor-pointer">
              <MenuIcon width={24} height={24} className="text-gray-900" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center gap-4 p-4">
            <button className="bg-gray-900 text-white px-4 py-2  rounded-md hover:bg-gray-800 cursor-pointer text-sm font-light border border-gray-900 hover:border-gray-800 transition-all duration-300 w-full">
              Signup
            </button>
            <button className="bg-white text-gray-900 px-4 py-2 rounded-md cursor-pointer text-sm font-light border border-gray-300 transition-all duration-300 hover:border-gray-200 w-full">
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
