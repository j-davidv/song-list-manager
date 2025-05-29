import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, UserPlus, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register, adminLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdminMode) {
      if (!username || !password) {
        toast.error('Please enter admin username and password');
        return;
      }
    } else {
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }
    }

    setLoading(true);
    try {
      if (isAdminMode) {
        await adminLogin(username, password, stayLoggedIn);
        toast.success('Admin logged in successfully!');
      } else if (isRegistering) {
        await register(email, password);
        toast.success('Account created successfully!');
      } else {
        await login(email, password, stayLoggedIn);
        toast.success('Logged in successfully!');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (adminMode: boolean) => {
    setIsAdminMode(adminMode);
    setIsRegistering(false);
    setEmail('');
    setPassword('');
    setUsername('');
    setStayLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 px-4">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto w-32 h-32 rounded-2xl flex items-center justify-center shadow-xl mb-6 bg-white p-3">
            <img 
              src="/church-logo.png" 
              alt="Beloved Community Church Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Song Lineup Manager
          </h2>
          <p className="text-sm text-gray-600">
            {isAdminMode 
              ? 'Admin Access Portal' 
              : isRegistering 
                ? 'Create your account' 
                : 'Sign in to manage songs'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center space-x-2 sm:space-x-4">
          <button
            type="button"
            onClick={() => handleModeChange(false)}
            className={`px-4 sm:px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 shadow-md ${
              !isAdminMode
                ? 'bg-gradient-to-r from-blue-600 to-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            disabled={loading}
          >
            User Login
          </button>
          <button
            type="button"
            onClick={() => handleModeChange(true)}
            className={`px-4 sm:px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center shadow-md ${
              isAdminMode
                ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
            disabled={loading}
          >
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            Admin
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-xl shadow-sm -space-y-px overflow-hidden border border-gray-200">
              {isAdminMode ? (
                <>
                  <div>
                    <label htmlFor="username" className="sr-only">
                      Admin Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      className="appearance-none rounded-t-xl relative block w-full px-4 py-4 border-0 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:z-10 text-sm sm:text-base bg-gray-50 focus:bg-white transition-all duration-200"
                      placeholder="Admin Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="admin-password" className="sr-only">
                      Admin Password
                    </label>
                    <input
                      id="admin-password"
                      name="admin-password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-b-xl relative block w-full px-4 py-4 border-0 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:z-10 text-sm sm:text-base bg-gray-50 focus:bg-white transition-all duration-200 border-t border-gray-200"
                      placeholder="Admin Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-t-xl relative block w-full px-4 py-4 border-0 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-sm sm:text-base bg-gray-50 focus:bg-white transition-all duration-200"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-b-xl relative block w-full px-4 py-4 border-0 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 text-sm sm:text-base bg-gray-50 focus:bg-white transition-all duration-200 border-t border-gray-200"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Stay Logged In Checkbox */}
            {!isRegistering && (
              <div className="flex items-center">
                <input
                  id="stay-logged-in"
                  name="stay-logged-in"
                  type="checkbox"
                  checked={stayLoggedIn}
                  onChange={(e) => setStayLoggedIn(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                  disabled={loading}
                />
                <label htmlFor="stay-logged-in" className="ml-2 block text-sm text-gray-700 font-medium">
                  Stay logged in
                </label>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 ${
                  isAdminMode
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 focus:ring-red-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 focus:ring-blue-500'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </span>
                ) : (
                  <>
                    {isAdminMode ? (
                      <>
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Admin Sign In
                      </>
                    ) : isRegistering ? (
                      <>
                        <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Create Account
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Sign In
                      </>
                    )}
                  </>
                )}
              </button>
            </div>

            {!isAdminMode && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  {isRegistering
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Register"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 