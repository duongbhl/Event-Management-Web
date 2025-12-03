
import { CreatedEventCard} from '@/components/Cards/CreatedEventCard';
import { PastEventCard } from '@/components/Cards/PastEventCard';
import { RegisteredEventCard } from '@/components/Cards/RegisteredEventCard';
import type { EventDataProp } from '@/components/Interfaces/EventDataProp';
import React from 'react';


// Định nghĩa kiểu dữ liệu cho sự kiện


interface MyEventTabsProps {
    activeTab: 'registered' | 'past' | 'created';
    onTabChange: (tab: 'registered' | 'past' | 'created') => void;
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


// --- Màn hình MyEvent.tsx chính ---
const MyEvents: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState<'registered' | 'past' | 'created'>('registered');

    // Dữ liệu giả định
    const registeredEvents: EventDataProp[] = [
        {
            _id: '1',
            title: 'Annual Spring Concert',
            date: 'Tuesday, April 15',
            time: '7:00 PM',
            location: 'University Auditorium',
            attendees: 100,
            expectedAttendees: 200,
            price: 20,
            description: 'Join us for a night of music and entertainment featuring the university orchestra and choir.',
            status: 'approved',
            category: 'Agriculture',
            isAttended:true,
            hasSubmittedFeedback:false

        },
    ];

    const pastEvents: EventDataProp[] = [
        {
            _id: '3',
            title: 'Winter Music Festival',
            date: 'Monday, January 20',
            time: '6:00 PM',
            location: 'University Auditorium',
            attendees: 80,
            expectedAttendees: 150,
            price: 15,
            description: 'A celebration of music featuring performance from various university ensembles.',
            status: 'approved',
            category: 'Arts & Science',
            isAttended: true,
            hasSubmittedFeedback: true, // Đặt là TRUE để test View Feedback, sửa thành false để test Submit Feedback
        }
    ];
    const createdEvents: EventDataProp[] = [
        {
            _id: '4',
            title: 'Student Club Meeting',
            date: 'Thursday, April 10',
            time: '5:00 PM',
            location: 'Student Center, Room 203',
            attendees: 15,
            expectedAttendees: 30,
            price: 100,
            description: 'Weekly meeting of the Computer Science Club.',
            status: 'approved',
            category: 'Pharmacy'

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
                        {registeredEvents.map(event => (<RegisteredEventCard key={event._id} event={event} />))}
                    </section>
                )}

                {/* Nội dung Tab: PAST EVENTS */}
                {activeTab === 'past' && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Events</h2>
                        {pastEvents.map(event => (<PastEventCard key={event._id} event={event} />))}
                    </section>
                )}

                {/* Nội dung Tab: CREATED BY ME */}
                {activeTab === 'created' && (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Events Created By Me</h2>
                        {createdEvents.map(event => (<CreatedEventCard key={event._id} event={event} />))}
                    </section>
                )}

            </main>
        </div>
    );
};

export default MyEvents;