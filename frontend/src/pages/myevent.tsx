import { Clock, MapPin, Calendar as CalendarIcon, Edit, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

// Định nghĩa kiểu dữ liệu cho sự kiện
interface EventData {
    id: number;
    category: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    ticketCode?: string;
}

interface MyEventTabsProps {
    activeTab: 'registered' | 'past' | 'created';
    onTabChange: (tab: 'registered' | 'past' | 'created') => void;
}

// Interfaces cho các tab khác
interface PastEventData extends EventData {
    isAttended: boolean;
    hasSubmittedFeedback: boolean;
}

interface CreatedEventData extends EventData {
    status: 'Active' | 'Draft' | 'Finished';
    registeredCount: number;
    totalCapacity: number;
}


const MyEventTabs: React.FC<MyEventTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { key: 'registered', label: 'Registered' },
        { key: 'past', label: 'Past Events' },
        { key: 'created', label: 'Created By Me' },
    ];
    
    return (
        <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key as 'registered' | 'past' | 'created')}
                    className={`px-6 py-3 text-sm font-medium transition duration-150 
                        ${activeTab === tab.key 
                            ? 'text-gray-900 border-b-2 border-orange-600' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

// --- 1. Registered Event Card ---
export const RegisteredEventCard: React.FC<{ event: EventData }> = ({ event }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="flex">
            <div className="w-1/4 bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 p-16">
                    

[Image of Placeholder]

                </div>
            </div>
            {/* Event Details */}
            <div className="w-3/4 p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-3">
                    {event.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {/* Date, Time, Location */}
                <div className="space-y-2 text-sm mb-4 text-gray-700">
                    <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-500" /><span>{event.date}</span></div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /><span>{event.time}</span></div>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /><span>{event.location}</span></div>
                </div>
                {/* Ticket Code */}
                <div className="border-t border-b border-gray-200 py-3 mb-5">
                    <p className="text-sm font-medium text-gray-800">Ticket Code</p>
                    <p className="text-lg font-semibold text-gray-900">{event.ticketCode}</p>
                </div>
                {/* Actions */}
                <div className="flex space-x-3">
                    <Link to={`/view-details`} className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition">View Details</Link>
                    <button className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">Add to Calendar</button>
                    <button className="px-5 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">Cancel Registration</button>
                </div>
            </div>
        </div>
    </div>
);

// --- 2. Past Event Card ---
export const PastEventCard: React.FC<{ event: PastEventData }> = ({ event }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden relative">
        <div className="flex">
            {/* Trạng thái Attended */}
            <div className="w-1/4 bg-gray-100 flex flex-col items-center justify-center p-4">
                <div className="text-gray-400 p-16">
                    
                </div>
                {event.isAttended && (
                    <div className="flex items-center text-green-600 font-semibold mt-4">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Attended
                    </div>
                )}
            </div>

            {/* Event Details */}
            <div className="w-3/4 p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-3">
                    {event.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                {/* Date, Time, Location */}
                <div className="space-y-2 text-sm mb-4 text-gray-700">
                    <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-500" /><span>{event.date}</span></div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /><span>{event.time}</span></div>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /><span>{event.location}</span></div>
                </div>
                
                {/* Actions */}
                <div className="flex space-x-3 mt-4">
                    {/* LOGIC MỚI: Dựa vào trạng thái feedback để hiển thị nút */}
                    {event.hasSubmittedFeedback ? (
                        <Link 
                            to={`/feedback-view/${event.id}`} // Dẫn đến trang xem Feedback đã tạo
                            className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            View Feedback
                        </Link>
                    ) : (
                        <Link to={`/feedback`} className="px-5 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition">
                            Submit Feedback
                        </Link>
                    )}
                    <Link to={`/view-details`} className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

// --- 3. Created Event Card ---
export const CreatedEventCard: React.FC<{ event: CreatedEventData }> = ({ event }) => {
    const progress = Math.round((event.registeredCount / event.totalCapacity) * 100);
    const isFull = event.registeredCount === event.totalCapacity;
    
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden relative">
             {/* Status Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${event.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                {event.status}
            </div>

            <div className="flex">
                <div className="w-1/4 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-400 p-16">
                        
                    </div>
                </div>

                <div className="w-3/4 p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-3">
                        {event.category}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    {/* Date, Time, Location */}
                    <div className="space-y-2 text-sm mb-4 text-gray-700">
                        <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2 text-gray-500" /><span>{event.date}</span></div>
                        <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500" /><span>{event.time}</span></div>
                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-gray-500" /><span>{event.location}</span></div>
                    </div>
                    
                    {/* Registration Status */}
                    <div className="pt-3 mb-5">
                        <p className="text-sm font-medium text-gray-800 mb-2">Registration Status</p>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 whitespace-nowrap">{event.registeredCount} / {event.totalCapacity} registered</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className={`text-xs font-medium whitespace-nowrap ${isFull ? 'text-red-500' : 'text-gray-600'}`}>{progress}% full</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center"><Settings className="w-4 h-4 mr-1" /> Manage Event</button>
                    
                        <Link to="/addevent" className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center"><Edit className="w-4 h-4 mr-1" /> Edit Event</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Màn hình MyEvent.tsx chính ---
const MyEvents: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'registered' | 'past' | 'created'>('registered');

    // Dữ liệu giả định
    const registeredEvents: EventData[] = [
        {
            id: 1,
            category: 'Arts & Culture',
            title: 'Annual Spring Concert',
            description: 'Join us for a night of music and entertainment featuring the university orchestra and choir.',
            date: 'Tuesday, April 15',
            time: '7:00 PM',
            location: 'University Auditorium',
            ticketCode: 'CONCERT-2025-1234'
        },
        {
            id: 2,
            category: 'Academic',
            title: 'Tech Workshop: AI Fundamentals',
            description: 'Learn the basics of artificial intelligence and machine learning.',
            date: 'Friday, March 28',
            time: '2:00 PM',
            location: 'Engineering Building, Room 305',
            ticketCode: 'TECH-2025-5678'
        }
    ];

    const pastEvents: PastEventData[] = [
        {
            id: 3,
            category: 'Arts & Culture',
            title: 'Winter Music Festival',
            description: 'A celebration of music featuring performance from various university ensembles.',
            date: 'Monday, January 20',
            time: '6:00 PM',
            location: 'University Auditorium',
            isAttended: true,
            hasSubmittedFeedback: true, // Đặt là TRUE để test View Feedback, sửa thành false để test Submit Feedback
        }
    ];
    const createdEvents: CreatedEventData[] = [
        {
            id: 4,
            category: 'Academic',
            title: 'Student Club Meeting',
            description: 'Weekly meeting of the Computer Science Club.',
            date: 'Thursday, April 10',
            time: '5:00 PM',
            location: 'Student Center, Room 203',
            status: 'Active',
            registeredCount: 15,
            totalCapacity: 30,
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">
                
                <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2">My Events</h1>

                <MyEventTabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                {/* Nội dung Tab: REGISTERED */}
                {activeTab === 'registered' && (
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upcoming Registered Events</h2>
                            <button className="text-sm font-medium text-orange-600 hover:text-orange-800">
                                View All Registrations
                            </button>
                        </div>
                        {registeredEvents.map(event => (<RegisteredEventCard key={event.id} event={event} />))}
                    </section>
                )}
                
                {/* Nội dung Tab: PAST EVENTS */}
                {activeTab === 'past' && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Events</h2>
                        {pastEvents.map(event => (<PastEventCard key={event.id} event={event} />))}
                    </section>
                )}

                {/* Nội dung Tab: CREATED BY ME */}
                {activeTab === 'created' && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Events Created By Me</h2>
                        {createdEvents.map(event => (<CreatedEventCard key={event.id} event={event} />))}
                    </section>
                )}

            </main>
        </div>
    );
};

export default MyEvents;