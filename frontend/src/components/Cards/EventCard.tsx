import { CalendarIcon, Clock, MapPin } from "lucide-react";

import { formatDate} from "@/lib/utils";
import { useNavigate } from "react-router";
import type { EventDataProp } from "../Interfaces/EventDataProp";
import { Button } from "../ui/button";



// --- Component Event Card (Grid View) ---
export const EventCard: React.FC<{ event: EventDataProp, variant?:String }> = ({ event, variant }) => {
    const navigate = useNavigate();
    const viewDetailsHandle = () => {
        navigate(`/view-details/${event._id}`, { state: { ...event } })

    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Image Placeholder */}
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {event.image ? (
                    <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-gray-400 text-sm">No Image</div>
                )}
                {/* Calendar Icon & Date Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-white/70 backdrop-blur-sm">
                    <div className="flex justify-between items-end">
                        {/* Cột Chi tiết */}
                        <div>
                            <span className="inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-1">
                                {event.category}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">{event.title}</h3>
                        </div>
                        {/* Cột Ngày */}
                        <div className="text-center">
                            <CalendarIcon className="w-5 h-5 text-gray-700 mx-auto mb-0.5" />
                            <div className="text-xs font-semibold text-gray-700 leading-none">{formatDate(event.date).month}</div>
                            <div className="text-lg font-bold text-orange-600 leading-none">{formatDate(event.date).day}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details and Actions */}
            <div className="p-4 flex flex-col grow">
                <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                {/* Time and Location */}
                <div className="space-y-1 text-xs text-gray-700 mt-auto pt-2 border-t border-gray-100">
                    <p className="flex items-center"><Clock className="w-3 h-3 mr-2 text-gray-500" />{event.time}</p>
                    <p className="flex items-center"><MapPin className="w-3 h-3 mr-2 text-gray-500" />{event.location}</p>
                </div>

                {/* Action Button */}
                <div className="pt-4 mt-2">
                    <Button onClick={()=>viewDetailsHandle()} className="block w-full text-center py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition cursor-pointer">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );

}

