import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const eventTitle = "Winter Music Festival";
const feedbackData = {
    rating: 5,
    likes: "The performances were incredible, and the atmosphere was vibrant and festive.",
    improvements: "The lines for refreshments were a bit long.",
    suggestions: "Keep up the great work! Maybe add more seating areas next time."
};

const FeedbackView: React.FC = () => {
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                <Link to="/myevent" className="text-gray-600 hover:text-gray-800 flex items-center mb-6 text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to My Events
                </Link>

                <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Submitted</h1>
                    <h2 className="text-xl text-orange-600 mb-6">Event: {eventTitle}</h2>

                    {/* 1. Đánh giá (Rating) */}
                    <div className="mb-6 pb-4 border-b">
                        <p className="block text-lg font-medium text-gray-700 mb-2">Overall Rating:</p>
                        <span className="text-3xl text-yellow-500">
                            {'⭐'.repeat(feedbackData.rating)}
                        </span>
                    </div>

                    {/* 2. Điểm mạnh */}
                    <div className="mb-6 pb-4 border-b">
                        <p className="block text-lg font-medium text-gray-700 mb-2">What you liked most:</p>
                        <div className="p-3 bg-gray-100 rounded-lg text-gray-800">
                            {feedbackData.likes}
                        </div>
                    </div>

                    {/* 3. Điểm cần cải thiện */}
                    <div className="mb-6 pb-4 border-b">
                        <p className="block text-lg font-medium text-gray-700 mb-2">What could be improved:</p>
                        <div className="p-3 bg-gray-100 rounded-lg text-gray-800">
                            {feedbackData.improvements}
                        </div>
                    </div>

                    {/* 4. Đề xuất thêm */}
                    <div className="mb-8">
                        <p className="block text-lg font-medium text-gray-700 mb-2">Other suggestions:</p>
                        <div className="p-3 bg-gray-100 rounded-lg text-gray-800">
                            {feedbackData.suggestions}
                        </div>
                    </div>
                    
                    <Link to="/myevent" className="w-full inline-block text-center py-3 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition">
                        Close View
                    </Link>
                </div>

            </main>
            <Footer />
        </div>
    );
}

export default FeedbackView;