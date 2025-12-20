import { Link, useNavigate } from "react-router";
import { CalendarIcon, Clock, MapPin, CheckCircle } from "lucide-react";
import type { EventDataProp } from "../Interfaces/EventDataProp";
import { Button } from "../ui/button";
import { dateToString } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
    event: EventDataProp;
}

export const PastEventCard: React.FC<Props> = ({ event }) => {
    const navigate = useNavigate();

    const [hasTicket, setHasTicket] = useState(false);

    const viewDetailsHandle = () => {
        navigate(`/view-details/${event._id}`);
    };

    // ================= CHECK TICKET (ATTENDED) =================
    useEffect(() => {
        const checkTicket = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/user/tickets",
                    {
                        params: { eventId: event._id },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setHasTicket(Boolean(res.data.data));
            } catch (err) {
                console.error("Check ticket error:", err);
                setHasTicket(false);
            }
        };

        checkTicket();
    }, [event._id]);

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md mb-6 overflow-hidden relative">
            <div className="flex">
                {/* IMAGE + ATTENDED */}
                <div className="w-1/4 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    {event.image ? (
                        <img
                            src={event.image}
                            alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400 text-sm">No Image</div>
                    )}

                    {hasTicket && (
                        <div className="relative z-10 bg-white/90 px-3 py-1 rounded-full flex items-center text-green-600 font-semibold text-sm shadow">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Attended
                        </div>
                    )}
                </div>

                {/* DETAILS */}
                <div className="w-3/4 p-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-3">
                        {event.category}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.description}
                    </p>

                    {/* DATE / TIME / LOCATION */}
                    <div className="space-y-2 text-sm mb-4 text-gray-700">
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
                            {dateToString(event.date)}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {event.time}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                            {event.location}
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex space-x-3 mt-4">
                        {hasTicket && event.hasSubmittedFeedback ? (
                            <Link
                                to={`/feedback-view/${event._id}`}
                                className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                View Feedback
                            </Link>
                        ) : hasTicket ? (
                            <Link
                                to={`/feedback/${event._id}`}
                                className="px-5 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
                            >
                                Submit Feedback
                            </Link>
                        ) : null}

                        <Button
                            onClick={viewDetailsHandle}
                            className="px-5 py-2 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
