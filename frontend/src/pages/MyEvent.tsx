import { CreatedEventCard } from '@/components/Cards/CreatedEventCard';
import { PastEventCard } from '@/components/Cards/PastEventCard';
import { RegisteredEventCard } from '@/components/Cards/RegisteredEventCard';
import type { EventDataProp } from '@/components/Interfaces/EventDataProp';
import React, { useEffect } from 'react';
import axios from 'axios';

// Định nghĩa kiểu dữ liệu cho sự kiện
interface TicketData {
    _id: string;
    userId: string;
    eventId: EventDataProp;
    quantity: number;
    totalPrice: number;
    status: 'booked' | 'cancelled' | 'nothing';
    bookedAt: string;
}

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
    const [registeredEvents, setRegisteredEvents] = React.useState<EventDataProp[]>([]);
    const [pastEvents, setPastEvents] = React.useState<EventDataProp[]>([]);
    const [createdEvents, setCreatedEvents] = React.useState<EventDataProp[]>([]);

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const token = localStorage.getItem('token');

                // Fetch created events
                const createdRes = await axios.get('http://localhost:5000/api/user/events', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch registered events (tickets)
                const ticketsRes = await axios.get('http://localhost:5000/api/user/my-tickets', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const now = new Date();
                const allCreatedEvents: EventDataProp[] = createdRes.data.data || [];
                const allTickets: TicketData[] = ticketsRes.data.data || [];

                // Registered events = upcoming events from tickets
                const upcomingRegistered = allTickets
                    .filter((t: TicketData) => t.eventId && new Date(t.eventId.date) >= now)
                    .map((t: TicketData) => t.eventId);

                // Past events = past tickets + past created events
                const pastTickets = allTickets
                    .filter((t: TicketData) => t.eventId && new Date(t.eventId.date) < now)
                    .map((t: TicketData) => ({
                        ...t.eventId,
                        isAttended: true,
                        hasSubmittedFeedback: false
                    }));

                const pastCreated = allCreatedEvents
                    .filter((e: EventDataProp) => new Date(e.date) < now)
                    .map((e: EventDataProp) => ({
                        ...e,
                        isAttended: false,
                        hasSubmittedFeedback: false
                    }));

                setRegisteredEvents(upcomingRegistered);
                setPastEvents([...pastTickets, ...pastCreated]);
                setCreatedEvents(allCreatedEvents);

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchMyEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2">My Events</h1>

                <MyEventTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Nội dung Tab: REGISTERED */}
                {activeTab === 'registered' && (
                    registeredEvents.length === 0 ? (
                        <p className="text-gray-600">You have not registered for any upcoming events.</p>
                    ) : (
                        <section>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Upcoming Registered Events</h2>
                                <button className="text-sm font-medium text-orange-600 hover:text-orange-800">
                                    View All Registrations
                                </button>
                            </div>
                            {registeredEvents.map(event => (<RegisteredEventCard key={event._id} event={event} />))}
                        </section>
                    )
                )}

                {/* Nội dung Tab: PAST EVENTS */}
                {activeTab === 'past' && (
                    pastEvents.length === 0 ? (
                        <p className="text-gray-600">You have no past events.</p>
                    ) : (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Past Events</h2>
                        {pastEvents.map(event => (<PastEventCard key={event._id} event={event} />))}
                    </section>
                    )
                )}

                {/* Nội dung Tab: CREATED BY ME */}
                {activeTab === 'created' && (
                    createdEvents.length === 0 ? (
                        <p className="text-gray-600">You have not created any events.</p>
                    ) : (
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Events Created By Me</h2>
                        {createdEvents.map(event => (<CreatedEventCard key={event._id} event={event} />))}
                    </section>
                    )
                )}

            </main>
        </div>
    );
};

export default MyEvents;