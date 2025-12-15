import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, Ticket, User, Edit, Trash2, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/useToast';

// Giả định dữ liệu chi tiết đăng ký
interface RegistrationData {
    id: number;
    eventId: number;
    eventName: string;
    date: string;
    time: string;
    location: string;
    ticketCode: string;
    guestCount: number;
    specialRequest: string;
}

const registrationData: RegistrationData = {
    id: 101,
    eventId: 1,
    eventName: "Annual Spring Concert",
    date: 'Tuesday, April 15, 2026',
    time: '7:00 PM',
    location: 'University Auditorium, Main Campus',
    ticketCode: 'CONCERT-2026-1234',
    guestCount: 2,
    specialRequest: 'Vegetarian meal requested for one guest.',
};

// --- Component Chi tiết Đăng ký ---
const RegistrationDetail: React.FC<{ data: RegistrationData }> = ({ data }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">
            Registration Details for: {data.eventName}
        </h3>

        {/* Thông tin Sự kiện */}
        <div className="space-y-3 text-base mb-6">
            <p className="flex items-center text-gray-700">
                <CalendarIcon className="w-5 h-5 mr-3 text-orange-500" />
                <span className="font-semibold">{data.date}</span>
            </p>
            <p className="flex items-center text-gray-700">
                <Clock className="w-5 h-5 mr-3 text-orange-500" />
                <span>{data.time}</span>
            </p>
            <p className="flex items-center text-gray-700">
                <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                <span>{data.location}</span>
            </p>
        </div>
        
        {/* Thông tin Đăng ký */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
            <p className="flex items-center text-gray-700">
                <Ticket className="w-5 h-5 mr-3 text-gray-500" />
                Ticket Code: <span className="font-semibold ml-2 text-gray-900">{data.ticketCode}</span>
            </p>
            <p className="flex items-center text-gray-700">
                <User className="w-5 h-5 mr-3 text-gray-500" />
                Guests: <span className="font-semibold ml-2 text-gray-900">{data.guestCount}</span>
            </p>
            
            {/* Yêu cầu đặc biệt */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                 <p className="text-sm font-medium text-gray-500 mb-1">Special Requests:</p>
                 <p className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 italic">{data.specialRequest || "None"}</p>
            </div>
        </div>
        
    </div>
);


const MyRegistrations: React.FC = () => {
    const navigate = useNavigate();
    const toast = useToast();
    
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    
    // State để quản lý form chỉnh sửa
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<RegistrationData>(registrationData);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    // Check authentication on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (!token || !user) {
            navigate('/login', { replace: true });
            return;
        }
        
        setIsAuthenticated(true);
    }, [navigate]);

    // Don't render until auth check is complete
    if (isAuthenticated === null) {
        return null;
    }
    
    // Hàm xử lý thay đổi form (Form Handler)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'guestCount' ? parseInt(value) || 0 : value }));
    };

    // Hàm lưu (Save)
    const handleSave = () => {
        toast.success('Registration updated successfully!');
        setIsEditing(false);
    };
    
    // Hàm hủy (Cancel)
    const handleCancelRegistration = () => {
        setShowCancelConfirm(false);
        toast.info('Registration has been cancelled.');
        // Logic điều hướng/xóa sẽ được thêm ở đây
    };
    
    const handleEditToggle = () => setIsEditing(prev => !prev);


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <toast.ToastComponent />
            
            {/* Cancel Confirmation Modal */}
            {showCancelConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Cancel Registration?</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to cancel this registration? This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                            >
                                Keep Registration
                            </button>
                            <button
                                onClick={handleCancelRegistration}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                {/* Back Button */}
                <Link to="/myevent" className="text-gray-600 hover:text-gray-800 flex items-center mb-6 text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to My Events
                </Link>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    My Registrations / Edit
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cột 1 & 2: Chi tiết hoặc Form Chỉnh sửa */}
                    <div className="lg:col-span-2">
                        {isEditing ? (
                            <div className="bg-white p-6 rounded-lg border border-orange-300 shadow-xl">
                                <h2 className="text-2xl font-bold text-orange-600 mb-6">Edit Your Registration</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                                    
                                    {/* Tên Sự kiện (Read-only) */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">Event Name</label>
                                        <input
                                            type="text"
                                            value={formData.eventName}
                                            disabled
                                            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md p-2 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>
                                    
                                    {/* Số lượng Khách */}
                                    <div className="mb-4">
                                        <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">Number of Guests (including yourself)</label>
                                        <input
                                            type="number"
                                            id="guestCount"
                                            name="guestCount"
                                            value={formData.guestCount}
                                            onChange={handleChange}
                                            min="1"
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    {/* Yêu cầu đặc biệt */}
                                    <div className="mb-6">
                                        <label htmlFor="specialRequest" className="block text-sm font-medium text-gray-700">Special Requests</label>
                                        <textarea
                                            id="specialRequest"
                                            name="specialRequest"
                                            value={formData.specialRequest}
                                            onChange={handleChange}
                                            rows={4}
                                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    {/* Nút Save/Cancel Edit */}
                                    <div className="flex space-x-3">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 text-white bg-orange-600 rounded-lg hover:bg-orange-700 font-medium transition flex items-center"
                                        >
                                            <Edit className="w-4 h-4 mr-2" /> Save Changes
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <RegistrationDetail data={registrationData} />
                        )}
                    </div>

                    {/* Cột 3: Hành động */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 bg-white border border-gray-200 rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Actions</h3>
                            
                            <div className="space-y-3">
                                <button 
                                    onClick={handleEditToggle}
                                    className={`w-full py-3 text-white rounded-lg font-bold transition flex items-center justify-center space-x-2 
                                        ${isEditing ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                    <Edit className="w-5 h-5" />
                                    <span>{isEditing ? 'View Details' : 'Edit Registration'}</span>
                                </button>
                                
                                <button 
                                    onClick={() => setShowCancelConfirm(true)}
                                    className="w-full py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 font-bold transition flex items-center justify-center space-x-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    <span>Cancel Registration</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}

export default MyRegistrations;