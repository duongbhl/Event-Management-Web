import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import type { PastEventData } from "./PastEventCard";

// --- 1. Registered Event Card ---
export const RegisteredEventCard: React.FC<{ event: PastEventData }> = ({ event }) => {
    const navigate = useNavigate();
    const viewDetailsHandle = () => {
        navigate(`/view-details/${event._id}`, { state: { ...event } })

    }
    return (
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
                        <p className="text-lg font-semibold text-gray-900">KHI MUA VE SE SINH MA TICKET O DAY</p>
                    </div>
                    {/* Actions */}
                    <div className="flex space-x-3">
                        <Button onClick={() => viewDetailsHandle()} className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition cursor-pointer">View Details</Button>
                        <button className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer">Add to Calendar</button>
                        <button className="px-5 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition cursor-pointer">Cancel Registration</button>
                    </div>
                </div>
            </div>
        </div>
    )
};
