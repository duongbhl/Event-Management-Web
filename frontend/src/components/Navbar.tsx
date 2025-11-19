import React from 'react';
import { Search} from 'lucide-react'; 
import { Link } from 'react-router-dom';


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
    return (
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                
                {/* Logo Section - Trỏ về trang Home (Quick Access) */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center">
                        <div className="text-2xl font-bold text-orange-600">TU Events</div>
                    </Link>
                </div>

                {/* Navigation Links (Desktop) */}
                <nav className="hidden md:flex space-x-1">
                    {/* ĐÃ SỬA: Trỏ Events tới /events */}
                    <NavItem to="/events">Events</NavItem>
                    <NavItem to="/calendar">Calendar</NavItem>
                    <NavItem to="/myevent">My Events</NavItem>
                    <NavItem to="/registrations">My Registrations</NavItem>
                    <NavItem to="/analytics">Analytics</NavItem>
                    <NavItem to="/profile">Profile</NavItem>
                      
                </nav>

                {/* Icons and Sign In */}
                <div className="flex items-center space-x-3">
                    
                    

                    {/* Search Icon */}
                    <button 
                        aria-label="Search"
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    {/* Sign In Button (ĐÃ SỬA: Dùng Link to="/login") */}
                    <Link 
                        to="/login"
                        className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;