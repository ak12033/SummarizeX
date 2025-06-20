const InputBox = ({ label, placeholder, onChange, type }) => {
  return (
    <div className="mb-5">
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl 
        text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-in-out 
        shadow-sm hover:border-blue-400 focus:scale-[1.02]"
      />
    </div>
  );
};

export default InputBox;
