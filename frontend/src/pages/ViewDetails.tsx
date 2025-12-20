import React, { useEffect, useState } from 'react';
import { Clock, MapPin, Calendar as CalendarIcon, User, Tag, Share2, Heart, ChevronLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { EventDataProp } from '@/components/Interfaces/EventDataProp';
import { toast } from "react-toastify";
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';



const ViewDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventDataProp | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasTicket, setHasTicket] = useState(false);
    const [ticketId, setTicketId] = useState<string | null>(null);
    const [confirmRegister, setConfirmRegister] = useState(false);
    const [confirmCancel, setConfirmCancel] = useState(false);




    // Fetch event details and ticket status
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                // 1. Fetch event
                const eventRes = await axios.get(
                    `http://localhost:5000/api/user/event/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setEvent(eventRes.data.data);

                // 2. Check ticket
                const ticketRes = await axios.get(
                    "http://localhost:5000/api/user/my-tickets",
                    {
                        params: { eventId: id },
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const tickets = ticketRes.data.data;

                if (Array.isArray(tickets) && tickets.length > 0) {
                    setHasTicket(true);
                    setTicketId(tickets[0]._id);
                } else {
                    setHasTicket(false);
                    setTicketId(null);
                }

            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading event details...</p>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Event not found</p>
            </div>
        );
    }


    //dki ve tham gia su kien
    const handleRegister = async () => {
        if (!event) return;



        try {
            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/api/user/tickets",
                { eventId: event._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setHasTicket(true);
            setTicketId(res.data.data._id);

            toast.success("🎉 Registration successful!");
            navigate(`/ticket/${res.data.data._id}`);
        } catch (error: any) {
            console.error("Register error:", error);
            toast.error(
                error.response?.data?.message || "Registration failed"
            );
        }
    };

    //neu su kien mien phi thi dang ki luon, con khong thi chuyen den trang checkout
    const handleBuyTicket = () => {
        if (!event) return;

        if (event.price === 0) {
            setConfirmRegister(true);
        } else {
            navigate(`/checkout/${event._id}`);
        }
    };




    //huy dang ki su kien
    const handleCancelTicket = async () => {
        if (!ticketId) return;
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/user/tickets/${ticketId}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setHasTicket(false);
            setTicketId(null);

            toast.success("❌ Registration cancelled");
        } catch (err: any) {
            console.error("Cancel ticket error:", err);
            toast.error(
                err.response?.data?.message || "Cancellation failed"
            );
        }
    };





    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 grow">

                {/* --- HEADER: Back Button & Actions --- */}
                <div className="flex justify-between items-center mb-6">
                    <a onClick={() => navigate(-1)} className="text-orange-600 hover:text-orange-800 flex items-center text-sm font-medium cursor-pointer">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Events
                    </a>
                    <div className="flex space-x-3">
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><Share2 className="w-5 h-5" /></button>
                        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><Heart className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* --- EVENT MAIN CONTENT --- */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">

                    {/* Event Banner/Image */}
                    <div className="w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
                        {event.image ? (
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-gray-400 text-lg">No Image Available</div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">

                        {/* Cột 1 & 2: Mô tả và Chi tiết (Chiếm 2/3) */}
                        <div className="lg:col-span-2">
                            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-gray-800 rounded-full mb-3">
                                {event.category}
                            </span>

                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{event.title}</h1>

                            {/* Thông tin cơ bản (Thời gian, Địa điểm) */}
                            <div className="space-y-3 text-lg mb-6 border-b pb-4">
                                <p className="flex items-center text-gray-700">
                                    <CalendarIcon className="w-5 h-5 mr-3 text-orange-500" />
                                    <span className="font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <Clock className="w-5 h-5 mr-3 text-orange-500" />
                                    <span>{event.time}</span>
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                                    <span>{event.location}</span>
                                </p>
                            </div>

                            {/* Mô tả chi tiết */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">About the Event</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {event.description}
                            </p>

                            {/* Thông tin thêm */}
                            <div className="mt-8 pt-4 border-t border-gray-100 space-y-3">
                                <p className="flex items-center text-sm text-gray-600">
                                    <User className="w-4 h-4 mr-3" />
                                    Organizer: <span className="font-medium ml-1 text-gray-800">{(event as any).organizerId?.username || 'Unknown'}</span>
                                </p>
                                <p className="flex items-center text-sm text-gray-600">
                                    <Tag className="w-4 h-4 mr-3" />
                                    Fee: <span className="font-medium ml-1 text-gray-800">{event.price === 0 ? 'Free' : `$${event.price}`}</span>
                                </p>
                                <p className="flex items-center text-sm text-gray-600">
                                    <User className="w-4 h-4 mr-3" />
                                    Attendees: <span className="font-medium ml-1 text-gray-800">{event.attendees} / {event.expectedAttendees}</span>
                                </p>
                            </div>

                        </div>

                        {/* Cột 3: Hành động (Chiếm 1/3) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Get Your Ticket</h3>

                                {hasTicket ? (
                                    <>
                                        <p className="text-green-600 font-semibold mb-3">
                                            You are already registered!
                                        </p>
                                        <button
                                            onClick={() => navigate(`/ticket/${ticketId}`)}
                                            className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                                        >
                                            View Ticket
                                        </button>

                                        <button
                                            onClick={() => setConfirmCancel(true)}
                                            className="w-full mt-3 py-3 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                                        >
                                            Cancel Registration
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-gray-700 mb-4">
                                            Click below to register for this event.
                                        </p>
                                        <button
                                            onClick={handleBuyTicket}
                                            className="w-full py-3 text-lg font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition"
                                        >
                                            {event.price === 0 ? "Register Now" : "Buy Ticket"}
                                        </button>

                                    </>
                                )}
                                <ConfirmDialog
                                    open={confirmRegister}
                                    title="Register for this event?"
                                    description="Are you sure you want to register for this event?"
                                    confirmText="Register"
                                    onCancel={() => setConfirmRegister(false)}
                                    onConfirm={async () => {
                                        setConfirmRegister(false);
                                        await handleRegister();
                                    }}
                                />

                                <ConfirmDialog
                                    open={confirmCancel}
                                    title="Cancel registration?"
                                    description="This action cannot be undone."
                                    confirmText="Cancel Registration"
                                    onCancel={() => setConfirmCancel(false)}
                                    onConfirm={async () => {
                                        setConfirmCancel(false);
                                        await handleCancelTicket();
                                    }}
                                />



                            </div>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}

export default ViewDetails;