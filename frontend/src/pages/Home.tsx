import React from 'react';
import { Search, Calendar, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// QuickAccessCard
interface QuickAccessCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    buttonText: string;
    to: string;
}

// CategoryFilter
interface CategoryFilterProps {
    categories: string[];
}
const QuickAccessCard: React.FC<QuickAccessCardProps> = ({
    icon: Icon,
    title,
    description,
    buttonText,
    to
}) => (
    <Link
        to={to}
        className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-md transition hover:shadow-lg hover:border-orange-400"
    >
        <Icon className="w-10 h-10 text-orange-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 text-center mb-6 grow">{description}</p>
        <div
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
            {buttonText}
        </div>
    </Link>
);

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => (
    <div className="flex space-x-2 p-2 bg-gray-50 border-y border-gray-200 overflow-x-auto">
        {categories.map((cat: string, index: number) => (
            <button
                key={index}
                className={`px-4 py-1.5 text-sm rounded-lg whitespace-nowrap transition 
                    ${cat === 'All' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'}`}
            >
                {cat}
            </button>
        ))}
    </div>
);

const Home: React.FC = () => {
    const categories = ['All', 'Arts & Science', 'Engineering', 'Agriculture', 'Pharmacy', 'Physiotherapy', 'Allied Health Sciences', 'Hotel Management', 'Business'];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                {/* Tiêu đề Trang: Discover Campus Events */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-2">
                    Discover Campus Events
                </h1>



                {/* --- Phần 2: Upcoming Events Section (Link đến trang Events mới) --- */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800">Upcoming Events</h2>
                        <Link to="/events" className="text-sm font-medium text-orange-600 hover:text-orange-800">
                            View All Events
                        </Link>
                    </div>

                    {/* Category Filters */}
                    <CategoryFilter categories={categories} />

                    {/* Placeholder cho danh sách sự kiện trên Home */}
                    <div className="flex flex-col items-center justify-center p-12 mt-4 bg-white border border-gray-200 rounded-lg">
                        <Calendar className="w-12 h-12 text-gray-400 mb-4" />
                        <p className="text-xl font-medium text-gray-600 mb-1">Upcoming events loading soon...</p>
                        <p className="text-gray-500">Please navigate to the "Events" page for the full listing and search features.</p>
                    </div>
                </section>

                {/* --- Phần 1: Quick Access Section --- */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 1. Event Calendar -> /calendar (Cần tạo file calendar.tsx) */}
                        <QuickAccessCard
                            icon={Calendar}
                            title="Event Calendar"
                            description="View all upcoming events in a calendar format."
                            buttonText="Open Calendar"
                            to="/calendar"
                        />
                        {/* 2. My Registrations -> /registrations (Đã làm file my_regis.tsx) */}
                        <QuickAccessCard
                            icon={Users}
                            title="My Registrations"
                            description="Manage your event registrations and tickets."
                            buttonText="View Registrations"
                            to="/registrations"
                        />
                        {/* 3. Find Events -> /events (Đã làm file Events.tsx) */}
                        <QuickAccessCard
                            icon={Search}
                            title="Find Events"
                            description="Search for events by category, date, or keyword"
                            buttonText="Search Events"
                            to="/events"
                        />
                    </div>
                </section>
            </main>


        </div>
    );
}

export default Home;