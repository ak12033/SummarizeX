import { FiLogIn } from 'react-icons/fi';

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full flex items-center justify-center gap-2 text-white 
      bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
      font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 transition-all duration-200 
      shadow-md hover:shadow-blue-800/50"
    >
      <FiLogIn size={18} /> {label}
    </button>
  );
};

export default Button;
