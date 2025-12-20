import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feedback: React.FC = () => {
    // Dữ liệu giả định
    const eventTitle = "Winter Music Festival";
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                <Link to="/myevent" className="text-gray-600 hover:text-gray-800 flex items-center mb-6 text-sm font-medium">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to My Events
                </Link>

                <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Feedback</h1>
                    <h2 className="text-xl text-orange-600 mb-6">Event: {eventTitle}</h2>

                    <form>
                        {/* 1. Đánh giá (Rating) */}
                        <div className="mb-6">
                            <label className="block text-lg font-medium text-gray-700 mb-2">1. How would you rate your overall experience?</label>
                            <div className="flex space-x-3">
                                {/* Dùng component rating placeholder hoặc input radio */}
                                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                            </div>
                        </div>

                        {/* 2. Điểm mạnh */}
                        <div className="mb-6">
                            <label htmlFor="likes" className="block text-lg font-medium text-gray-700 mb-2">2. What did you like most about the event?</label>
                            <textarea
                                id="likes"
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                placeholder="E.g., The performances were amazing, the venue was perfect."
                            />
                        </div>

                        {/* 3. Điểm cần cải thiện */}
                        <div className="mb-6">
                            <label htmlFor="improvements" className="block text-lg font-medium text-gray-700 mb-2">3. What could be improved?</label>
                            <textarea
                                id="improvements"
                                rows={4}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                placeholder="E.g., The seating arrangement, the sound system."
                            />
                        </div>

                        {/* 4. Đề xuất thêm */}
                        <div className="mb-8">
                            <label htmlFor="suggestions" className="block text-lg font-medium text-gray-700 mb-2">4. Any other suggestions?</label>
                            <textarea
                                id="suggestions"
                                rows={3}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Any additional comments..."
                            />
                        </div>

                        {/* Nút Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
                        >
                            Submit Feedback
                        </button>
                    </form>
                </div>

            </main>
        </div>
    );
}

export default Feedback;