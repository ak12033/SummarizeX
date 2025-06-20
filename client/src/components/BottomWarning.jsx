import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="py-4 text-sm flex justify-center items-center gap-1">
      <span className="text-gray-400">{label}</span>
      <Link
        className="text-blue-800 hover:text-blue-500 font-medium transition duration-200"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
