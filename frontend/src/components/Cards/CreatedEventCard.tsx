import { useNavigate } from "react-router";
import { CalendarIcon, Clock, Edit, MapPin, Settings } from "lucide-react";
import type { EventDataProp } from "../Interfaces/EventDataProp";
import { Button } from "../ui/button";


export interface CreatedEventData extends EventDataProp { }

// --- 3. Created Event Card ---
export const CreatedEventCard: React.FC<{ event: CreatedEventData }> = ({ event }) => {
    //dieu huong
    const navigate = useNavigate();
    const editEventHandle = () => {
        navigate(`/addevent/${event._id}`, { state: { ...event } })

    }


    //hien so luong dang ky va ti le dang ky
    const progress = Math.round((event.attendees / event.expectedAttendees) * 100);
    const isFull = event.attendees === event.expectedAttendees;

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden relative">
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full ${event.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
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
                            <span className="text-sm text-gray-600 whitespace-nowrap">{event.attendees} / {event.expectedAttendees} registered</span>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className={`text-xs font-medium whitespace-nowrap ${isFull ? 'text-red-500' : 'text-gray-600'}`}>{progress}% full</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                        <button className="px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center cursor-pointer"><Settings className="w-4 h-4 mr-1" /> Manage Event</button>

                        <Button onClick={() => editEventHandle()} className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition flex items-center cursor-pointer"><Edit className="w-4 h-4 mr-1" /> Edit Event</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};