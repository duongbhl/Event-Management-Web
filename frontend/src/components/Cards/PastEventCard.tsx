import { Link, useNavigate } from "react-router";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import type { EventDataProp } from "../Interfaces/EventDataProp";
import { Button } from "../ui/button";





// --- 2. Past Event Card ---
export const PastEventCard: React.FC<{ event: EventDataProp}> = ({ event }) => {
   //dieu huong
   const navigate = useNavigate();
    const viewDetailsHandle = () => {
         navigate(`/view-details/${event._id}`, { state: { ...event } })
    }

    return (
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
                                to={`/feedback-view/${event._id}`} // Dẫn đến trang xem Feedback đã tạo
                                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                View Feedback
                            </Link>
                        ) : (
                            <Link to={`/feedback`} className="px-5 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition">
                                Submit Feedback
                            </Link>
                        )}
                        <Button onClick={()=>viewDetailsHandle()} className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
