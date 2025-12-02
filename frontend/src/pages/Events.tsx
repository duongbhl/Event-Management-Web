import { Search, ChevronDown, List, Grid} from 'lucide-react';

import React from 'react';
import type { FilterDropdownProp } from '@/components/Interfaces/FilterDropdownProp';
import type { EventDataProp } from '@/components/Interfaces/EventDataProp';
import { EventCard } from '@/components/Cards/EventCard';


// --- DỮ LIỆU GIẢ ĐỊNH ---
const categories = ['Arts & Science', 'Engineering', 'Agriculture', 'Pharmacy', 'Physiotherapy', 'Allied Health Sciences', 'Hotel Management', 'Business'];
const upcomingFilters = ['Upcoming', 'Today', 'Tomorrow', 'This Week', 'This Month'];
const organizers = ['Academic Departments', 'Student Organizations', 'Administration'];

const eventList: EventDataProp[] = [
    { _id: '1', category: 'Arts & Culture', title: 'Annual Spring Concert', description: 'Join us for a night of music featuring the university orchestra and choir.', date: 'Tuesday, April 15', time: '7:00 PM', location: 'University Auditorium', attendees: 120, expectedAttendees: 200, price: 0, status: 'approved' },
    { _id: '2', category: 'Career', title: 'Career Fair', description: 'Connect with potential employers and explore career opportunities.', date: 'Tuesday, April 25', time: '10:00 AM', location: 'Student Center', attendees: 300, expectedAttendees: 500, price: 0, status: 'approved' },
    { _id: '3', category: 'Academic', title: 'Tech Workshop: AI Fundamentals', description: 'Learn the basics of artificial intelligence and machine learning.', date: 'Friday, April 28', time: '2:00 PM', location: 'Engineering Building, Room 305', attendees: 80, expectedAttendees: 150, price: 50, status: 'approved' },
    { _id: '4', category: 'Sports', title: 'Basketball Tournament', description: 'Annual inter-department basketball competition.', date: 'Wednesday, May 2', time: '9:00 AM', location: 'University Sports Complex', attendees: 500, expectedAttendees: 800, price: 0, status: 'approved' },
    { _id: '5', category: 'Social', title: 'Student Club Fair', description: 'Explore the various student clubs and organizations on campus.', date: 'Saturday, May 5', time: '11:00 AM', location: 'Main Quad', attendees: 200, expectedAttendees: 300, price: 0, status: 'approved' },
    { _id: '6', category: 'Academic', title: 'Research Symposium', description: 'Undergraduate and graduate students present their research projects.', date: 'Thursday, May 10', time: '1:00 PM', location: 'Science Center', attendees: 150, expectedAttendees: 250, price: 0, status: 'approved' },
];


const FilterDropdown: React.FC<FilterDropdownProp> = ({ options, selectedValue, onSelect }) => (
    <div className="relative w-full">
        <select
            className="w-full appearance-none block bg-white border border-gray-300 py-3 pl-4 pr-10 text-base rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            value={selectedValue}
            onChange={(e) => onSelect(e.target.value)}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
);



const Events: React.FC = () => { // Đã đổi tên thành Events
    const [categoryFilter, setCategoryFilter] = React.useState('All Categories');
    const [upcomingFilter, setUpcomingFilter] = React.useState('Upcoming');
    const [organizerFilter, setOrganizerFilter] = React.useState('All Organizers');



    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                {/* --- 1. Search Bar and Global Actions --- */}
                <div className="flex justify-between items-center mb-6">
                    <div className="grow mr-4">
                        <div className="relative">
                            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="w-full border border-gray-300 py-3 pl-10 pr-4 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                            />
                        </div>
                    </div>

                    {/* Filter and View Toggles */}
                    <div className="flex space-x-3 items-center">
                        <button className="px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center">
                            <ChevronDown className="w-4 h-4 mr-1" /> Filter
                        </button>
                        {/* Grid/List Toggle */}
                        <button className="p-2 text-gray-700 rounded-lg bg-gray-200">
                            <Grid className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-700 rounded-lg hover:bg-gray-100">
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* --- 2. Filter Dropdowns --- */}
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
                        label="Organizers"
                        options={['All Organizers', ...organizers]}
                        selectedValue={organizerFilter}
                        onSelect={setOrganizerFilter}
                    />
                </div>

                {/* --- 3. Event Listing --- */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventList.map(event => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                </section>

                {/* --- Pagination Placeholder --- */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500">Showing 1-6 of {eventList.length} events...</p>
                </div>

            </main>
        </div>
    );
}

export default Events;