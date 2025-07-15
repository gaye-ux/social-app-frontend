import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Phone, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
import { useLoginUserMutation } from '@/generated/graphql';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNo: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();

  // // Log renders to detect loops
  // useEffect(() => {
  //   console.log('Login component rendered');
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!formData.phoneNo || !formData.password) {
      setError('Phone number and password are required');
      return;
    }

    // Basic phone number validation (non-empty and reasonable length)
    if (formData.phoneNo.length < 7) {
      setError('Phone number must be at least 7 characters');
      return;
    }

    // Optional: Validate phone number format (numeric only)
    if (!/^\d+$/.test(formData.phoneNo)) {
      setError('Phone number must contain only digits');
      console.log('Invalid phone number format:', formData.phoneNo);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, errors } = await loginUser({
        variables: {
          phoneNo: formData.phoneNo,
          password: formData.password,
        },
      });


    
      if (data?.login) {
        Cookies.set('token', data.login.token, { expires: 7 });
        Cookies.set('userId', data.login.user.id, { expires: 7 });
        Cookies.set('username', data.login.user.username, { expires: 7 });
        Cookies.set('userPhoneNo', data.login.user.phoneNo, { expires: 7 });
        Cookies.set('userRole', data.login.user.role, { expires: 7 });
        Cookies.set('isAuthenticated', 'true', { expires: 7 });

        navigate('/');
      } else {
        setError('No user data returned. Please try again');
      }
    } catch (err: any) {
      // Handle unexpected errors (e.g., network issues, timeouts)
      if (err.networkError) {
        setError('Network error. Please check your connection and try again');
      }
      else {
        setError("Invalid Phone number or Password")
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 social-gradient rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        <div className="social-card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="social-input pl-12"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="social-input pl-12 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full social-button py-3 relative"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;