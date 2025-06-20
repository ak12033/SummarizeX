const Heading = ({ label }) => {
  return (
    <div className="p-8 text-center">
      <h1
        className="font-extrabold pb-3 text-5xl md:text-6xl text-transparent bg-clip-text 
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 
        drop-shadow-[0_0_20px_rgba(59,130,246,0.7)] tracking-wide animate-pulse"
      >
        {label}
      </h1>
      <div className="w-28 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full mx-auto mt-4 shadow-[0_0_12px_rgba(59,130,246,0.5)] blur-[0.5px]"></div>
    </div>
  );
};

export default Heading;
