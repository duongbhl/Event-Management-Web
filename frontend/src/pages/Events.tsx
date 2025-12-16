import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, List, Grid } from 'lucide-react';
import type { EventDataProp } from '@/components/Interfaces/EventDataProp';
import type { FilterDropdownProp } from '@/components/Interfaces/FilterDropdownProp';
import { EventCard } from '@/components/Cards/EventCard';
import { isWithinRange } from '@/lib/utils';
import { RegisteredEventCard } from '@/components/Cards/RegisteredEventCard';
import axios from 'axios';

// ============= Dummy Data =================
const categories = [
    'Arts & Science', 'Engineering', 'Agriculture', 'Pharmacy', 'Physiotherapy',
    'Allied Health Sciences', 'Hotel Management', 'Business'
];
const upcomingFilters = ['Upcoming', 'Today', 'Tomorrow', 'This Week', 'This Month'];
const typeFilters = ['Free', 'Paid'];

const eventList: EventDataProp[] = [
    { _id: '1', category: 'Allied Health Sciences', title: 'Annual Spring Concert', description: 'Join us...', date: '12/15/2025', time: '19:00', location: 'University Auditorium', attendees: 120, expectedAttendees: 200, price: 0, status: 'approved' },
    { _id: '2', category: 'Business', title: 'Career Fair', description: 'Connect with employers...', date: '12/15/2025', time: '10:00', location: 'Student Center', attendees: 300, expectedAttendees: 500, price: 0, status: 'approved' },
    { _id: '3', category: 'Hotel Management', title: 'Tech Workshop: AI Fundamentals', description: 'Learn AI basics', date: '12/15/2025', time: '14:00', location: 'Engineering Building', attendees: 80, expectedAttendees: 150, price: 50, status: 'approved' },
    { _id: '4', category: 'Engineering', title: 'Basketball Tournament', description: 'Inter-department competition', date: '12/15/2025', time: '09:00', location: 'Sports Complex', attendees: 500, expectedAttendees: 800, price: 0, status: 'approved' },
    { _id: '5', category: 'Engineering', title: 'Student Club Fair', description: 'Explore clubs', date: '12/15/2025', time: '11:00', location: 'Main Quad', attendees: 200, expectedAttendees: 300, price: 0, status: 'approved' },
    { _id: '6', category: 'Pharmacy', title: 'Research Symposium', description: 'Student research showcase', date: '12/15/2025', time: '13:00', location: 'Science Center', attendees: 150, expectedAttendees: 250, price: 0, status: 'approved' },
];
    
// ============= Dropdown Component ===============
const FilterDropdown: React.FC<FilterDropdownProp> = ({ options, selectedValue, onSelect}) => (
    <div className="relative w-full">
        <select
            className="w-full appearance-none block bg-white border border-gray-300 py-3 pl-4 pr-10 text-base rounded-lg 
            focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            value={selectedValue}
            onChange={(e) => onSelect(e.target.value)}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
);

// ============= Main Component =================
const Events: React.FC = () => {
    const [search, setSearch] = React.useState('');
    const [categoryFilter, setCategoryFilter] = React.useState('All Categories');
    const [upcomingFilter, setUpcomingFilter] = React.useState('Upcoming');
    const [typeFilter, setTypeFilter] = React.useState('All Types');
    const [viewType, setViewType] = React.useState<'grid' | 'list'>('grid');

    // Pagination
    const [currentPage, setCurrentPage] = React.useState(1);
    const eventsPerPage = 6;

    const [events, setEvents] = useState<EventDataProp[]>([]);
    const [loading, setLoading] = useState(true);

    // Reset page when filters/search change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [search, categoryFilter, upcomingFilter, typeFilter]);

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/user/allEvents/approved', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEvents(res.data.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // 🔍 FILTER EVENTS
    const filteredEvents = events.filter(event => {
        const dateObj = new Date(event.date);

        const matchesSearch =
            event.title.toLowerCase().includes(search.toLowerCase()) ||
            event.description.toLowerCase().includes(search.toLowerCase()) ||
            event.location.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            categoryFilter === 'All Categories' || event.category === categoryFilter;

        const matchesType =
            typeFilter === 'All Types' ||
            (typeFilter === 'Free' && event.price === 0) ||
            (typeFilter === 'Paid' && event.price > 0);

        const matchesUpcoming = isWithinRange(dateObj, upcomingFilter);

        return matchesSearch && matchesCategory && matchesType && matchesUpcoming;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const paginatedEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                {/* Search + View Toggle */}
                <div className="flex justify-between items-center mb-6">
                    <div className="grow mr-4">
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 py-3 pl-10 pr-4 rounded-lg 
                                focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3 items-center">
                        <button
                            className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setViewType('grid')}
                        >
                            <Grid className="w-5 h-5" />
                        </button>

                        <button
                            className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setViewType('list')}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <FilterDropdown
                        label="Categories"
                        options={['All Categories', ...categories]}
                        selectedValue={categoryFilter}
                        onSelect={setCategoryFilter}
                    />
                    <FilterDropdown
                        label="Upcoming"
                        options={upcomingFilters}
                        selectedValue={upcomingFilter}
                        onSelect={setUpcomingFilter}
                    />
                    <FilterDropdown
                        label="Types"
                        options={['All Types', ...typeFilters]}
                        selectedValue={typeFilter}
                        onSelect={setTypeFilter}
                    />
                </div>

                {/* Event List */}
                <section>
                    {filteredEvents.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">No events found...</p>
                    ) : viewType === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedEvents.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {paginatedEvents.map(event => (
                                <RegisteredEventCard key={event._id} event={event}/>
                            ))}
                        </div>
                    )}
                </section>

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center space-x-2">

                    {/* Prev */}
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        className={`px-4 py-2 rounded-lg border ${
                            currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
                        }`}
                    >
                        Prev
                    </button>

                    {/* Page numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-4 py-2 rounded-lg border ${
                                currentPage === index + 1
                                    ? "bg-orange-500 text-white border-orange-500"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className={`px-4 py-2 rounded-lg border ${
                            currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
                        }`}
                    >
                        Next
                    </button>

                </div>

            </main>
        </div>
    );
};

export default Events;
