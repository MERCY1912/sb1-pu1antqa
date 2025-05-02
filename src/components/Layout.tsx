import React, { ReactNode, useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [heartClicks, setHeartClicks] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleHeartClick = () => {
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);
    
    if (newCount === 20) {
      setShowAdminLogin(true);
      setHeartClicks(0);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCredentials.username === 'admin' && adminCredentials.password === 'femmy2025') {
      setShowAdminLogin(false);
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <header className="py-4 px-6 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold relative group">
            <span className="bg-gradient-to-r from-[#5BCEFA] via-[#F5A9B8] to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
              Femmy Dolls
            </span>
            <button 
              onClick={handleHeartClick}
              className="inline-block ml-2 transform hover:scale-110 transition-transform"
            >
              <Heart className="h-6 w-6 text-pink-500 fill-pink-500 animate-pulse" />
            </button>
          </h1>
          <nav>
            <ul className="flex gap-4">
              <li>
                <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 hover:from-pink-200 hover:to-purple-200 transition-colors shadow-sm">
                  About
                </button>
              </li>
              <li>
                <button className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200 transition-colors shadow-sm">
                  Help
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {children}
      </main>

      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Admin Login</h2>
            <form onSubmit={handleAdminLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={adminCredentials.username}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={adminCredentials.password}
                  onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="py-4 text-center text-sm text-gray-500 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="container mx-auto">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-pink-500 fill-pink-500" /> by Femmy Dolls © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};