import React, { useState, useEffect } from 'react';
import { Search, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface NavItemProps {
    children: React.ReactNode;
    to: string;
}

const NavItem: React.FC<NavItemProps> = ({ children, to }) => (
    <Link
        to={to}
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition duration-150"
    >
        {children}
    </Link>
);

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (token && userData && userData !== "undefined") {
                try {
                    const parsedUser = JSON.parse(userData);
                    setIsLoggedIn(true);
                    setUser(parsedUser);
                } catch (error) {
                    console.error("Invalid user data in localStorage:", error);
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkAuth();

        // Listen cho sự thay đổi localStorage (khi login/logout)
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        setShowUserMenu(false);
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        <div className="text-2xl font-bold text-orange-600">TU Events</div>
                    </Link>
                </div>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-1">
                    <NavItem to="/events">Events</NavItem>
                    <NavItem to="/calendar">Calendar</NavItem>
                    {isLoggedIn && (
                        <>
                            <NavItem to="/myevent">My Events</NavItem>
                            <NavItem to="/addevent">Add Event</NavItem>
                            <NavItem to="/analytics">Analytics</NavItem>
                        </>
                    )}
                </nav>

                {/* Right Section */}
                <div className="flex items-center space-x-3">
                    {/* Search Icon */}
                    <button
                        aria-label="Search"
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* User Menu hoặc Sign In Button */}
                    {isLoggedIn ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                            >
                                <User className="w-5 h-5 text-gray-700" />
                                <span className="text-sm font-medium text-gray-700">
                                    {user?.full_name || user?.email}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                                    {/* Admin Dashboard Link - Only for admin users */}
                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            onClick={() => setShowUserMenu(false)}
                                            className="flex items-center px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 font-medium"
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;