const Hero = () => {
  return (
    <>
      <div className="mt-24">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="p-2 text-center">
              <h1 className="text-3xl tracking-tight leading-tight sm:text-4xl md:text-4xl lg:text-5xl font-medium">
                Shorten links in a flash — share everywhere ⚡️
              </h1>
              <p className="text-gray-400 text-md sm:text-lg mt-2 leading-tight sm:leading-tight lg:text-lg">
                Paste, shorten, edit, and remove — everything you need to manage
                short links quickly, reliably.
              </p>
              <button className="bg-gray-900 text-white px-4 py-[0.3rem] rounded-md hover:bg-gray-800 cursor-pointer text-sm border border-gray-900 hover:border-gray-800 transition-all duration-300 mt-4 relative overflow-hidden group">
                <div className="absolute bottom-0 left-0 right-0 w-full h-full border-b-2 border-sky-600 overflow-hidden rounded-md group-hover:border-sky-500 transition-all duration-300"></div>
                <span className="relative z-10">Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
