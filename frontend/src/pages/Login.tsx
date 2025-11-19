import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Logging in with: ${email} and password: ${password}`);
        // Logic đăng nhập sẽ được thêm vào đây sau
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex flex-col items-center justify-center p-4 grow">
                
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 sm:p-10">
                    
                    <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
                        Sign In
                    </h1>
                    <p className="text-gray-500 text-center mb-8">
                        Access your Event Management Portal
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* 1. Email/Username Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>

                        {/* 2. Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm font-medium text-orange-600 hover:text-orange-800 transition">
                                Forgot Password?
                            </Link>
                        </div>
                        
                        {/* 3. Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2"
                        >
                            <User className="w-5 h-5" />
                            <span>Sign In</span>
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account? {' '}
                            <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-800 transition">
                                Register here
                            </Link>
                        </p>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default Login;