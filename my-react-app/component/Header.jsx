import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="flex justify-between bg-gray-900 p-4 sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="text-white text-lg font-bold">HomeWebsite</Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="text-gray-500 hover:text-white">Home</Link>
        <Link to="/login" className="text-gray-500 hover:text-white">Login</Link>
        <Link to="/register" className="text-white hover:text-white">Sign In</Link>
        <Link to="/profile" className="text-gray-500 hover:text-white">Profile</Link>
        <button className="text-gray-500 hover:text-white" onClick={() => {
          localStorage.removeItem('user_name');
          localStorage.removeItem('user_email');
          localStorage.removeItem('user_id');
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
