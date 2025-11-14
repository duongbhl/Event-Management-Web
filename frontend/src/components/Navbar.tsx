import React from 'react';
import { Search, Bell, X } from 'lucide-react'; 
import { Link } from 'react-router-dom';

// Dữ liệu thông báo giả định
const notifications = [
    { id: 1, type: 'Registration', title: 'Registration Successful', message: 'You are successfully registered for the Annual Spring Concert.', time: '2 mins ago' },
    { id: 2, type: 'Update', title: 'Event Update: AI Workshop', message: 'The Tech Workshop: AI Fundamentals has been rescheduled.', time: '1 hour ago' },
    { id: 3, type: 'Feedback', title: 'Feedback Requested', message: 'Please submit feedback for the Winter Music Festival.', time: '1 day ago' },
];

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

// --- Component Dropdown Thông báo ---
const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Logic cơ bản để đóng khi click vào một thông báo
    const handleClose = () => setIsOpen(false);

    return (
        <div className="relative">
            {/* Icon Chuông (Button kích hoạt) */}
            <button 
                aria-label="Notifications"
                className={`p-2 rounded-full text-gray-500 transition 
                    ${isOpen ? 'bg-gray-200 text-gray-800' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-red-500"></span>
                )}
            </button>

            {/* Panel Thông báo (Dropdown Content) */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 max-w-xs bg-white border border-gray-300 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in-0 slide-in-from-top-1">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-bold text-gray-900">Notifications ({notifications.length})</h3>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Danh sách Thông báo */}
                    {notifications.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer transition" onClick={handleClose}>
                                    <p className="text-xs font-semibold uppercase text-orange-600 mb-1">{notif.type}</p>
                                    <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                                    <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-gray-500">
                            No new notifications.
                        </div>
                    )}

                    {/* Footer (View All Link) */}
                    <div className="p-3 text-center border-t">
                        <Link 
                            to="/myevent" 
                            className="text-sm font-medium text-orange-600 hover:text-orange-800"
                            onClick={handleClose}
                        >
                            View all notifications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};


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
                    <NavItem to="/profile">Profile</NavItem>
                </nav>

                {/* Icons and Sign In */}
                <div className="flex items-center space-x-3">
                    
                    {/* THAY THẾ Icon Chuông Tĩnh bằng Component Dropdown */}
                    <NotificationDropdown />

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