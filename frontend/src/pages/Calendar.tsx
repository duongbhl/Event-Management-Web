import React from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'; // Đã xóa CalendarIcon


// Định nghĩa kiểu dữ liệu cho sự kiện
interface EventItemProps {
    month: string;
    day: number;
    time: string;
    title: string;
    location: string;
}

// --- Component cho mỗi Sự kiện sắp tới ---
const EventItem: React.FC<EventItemProps> = ({ month, day, time, title, location }) => (
    <div className="flex p-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
        {/* Cột Ngày (Đã sửa flex-shrink-0 thành shrink-0) */}
        <div className="shrink-0 text-center w-12 mr-4">
            <div className="text-xs font-medium uppercase text-orange-500">{month}</div>
            <div className="text-xl font-bold text-gray-800">{day}</div>
        </div>
        
        {/* Cột Chi tiết Sự kiện (Đã sửa flex-grow thành grow) */}
        <div className="grow">
            <p className="font-semibold text-gray-800 leading-snug">{title}</p>
            <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium mr-2">{time}</span>
                <span className="inline-flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />{location}
                </span>
            </p>
        </div>
    </div>
);

// --- Component Danh sách Sự kiện sắp tới (Cột bên phải) ---
const UpcomingEventsList: React.FC = () => {
    const events: EventItemProps[] = [
        { month: 'Mar', day: 25, time: '10:00 AM', title: 'Career Fair', location: 'Student Center' },
        { month: 'Mar', day: 28, time: '2:00 PM', title: 'Tech Workshop: AI Fundamentals', location: 'Engineering Building, Room 305' },
        { month: 'Apr', day: 2, time: '9:00 AM', title: 'Basketball Tournament', location: 'University Sports Complex' },
        { month: 'Apr', day: 5, time: '11:00 AM', title: 'Student Club Fair', location: 'Main Quad' },
        { month: 'Apr', day: 10, time: '1:00 PM', title: 'Research Symposium', location: 'Science Center' },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Upcoming Events</h2>
            <div className="overflow-y-auto max-h-[600px]">
                {events.map((event, index) => (
                    <EventItem key={index} {...event} />
                ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <button className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition">
                    View All Events
                </button>
            </div>
        </div>
    );
};

// --- Component Lịch chính (Cột bên trái) ---
const CalendarGrid: React.FC = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Dữ liệu giả định cho tháng 11/2025
    const daysInMonth = [
        null, null, null, null, null, null, 1, 
        2, 3, 4, 5, 6, 7, 8, 
        9, 10, 11, 12, 13, 14, 15,
        16, 17, 18, 19, 20, 21, 22,
        23, 24, 25, 26, 27, 28, 29, 30
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col p-4">
            {/* Header Lịch (Tháng và Dropdown) */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xl font-semibold text-gray-800">
                        Tháng 11 2025
                    </span>
                    <button className="p-1 rounded-full text-gray-600 hover:bg-gray-100">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Dropdown (Month / Week) */}
                <div className="relative">
                    <select className="appearance-none block w-full bg-white border border-gray-300 py-2 pl-3 pr-10 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                        <option>Month</option>
                        <option>Week</option>
                        <option>Day</option>
                    </select>
                </div>
            </div>

            {/* Header Thứ */}
            <div className="grid grid-cols-7 border-t border-gray-200">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="text-sm font-medium text-center text-gray-500 p-2 border-r border-b border-gray-200 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>

            {/* Lưới Ngày (Đã sửa flex-grow thành grow) */}
            <div className="grid grid-cols-7 grow">
                {daysInMonth.map((day, index) => (
                    <div 
                        key={index} 
                        className={`min-h-[100px] border-r border-b border-gray-200 p-2 text-sm last:border-r-0 
                            ${day ? 'text-gray-900 bg-white' : 'bg-gray-50 text-gray-400'}`}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- Màn hình Calendar.tsx chính ---
const Calendar: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cột 1 & 2: Lịch */}
                    <div className="lg:col-span-2">
                        <CalendarGrid />
                    </div>
                    {/* Cột 3: Danh sách Sự kiện sắp tới */}
                    <div className="lg:col-span-1">
                        <UpcomingEventsList />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Calendar;