import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthHook } from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuthHook();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Arizona Prime
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="text-blue-600 hover:underline"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;