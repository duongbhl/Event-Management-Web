import axios from 'axios'
import { Calendar, DollarSign, FileText, MapPin, PlusCircle, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router'

const AddEvent = () => {

    //form
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('')
    const [expectedAttendees, setAttendees] = useState<number | ''>('')
    const [price, setPrice] = useState<number | ''>('');
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')

    //thong bao
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    //nhan tham so tu url
    const {...event} = useLocation().state || {};
    useEffect(() => {
        if (event) {
            setTitle(event.title || '');
            setDate(event.date ? new Date(event.date).toISOString().split('T')[0] : '');
            setTime(event.date ? new Date(event.date).toISOString().split('T')[1].substring(0, 5) : '');
            setLocation(event.location || '');
            setAttendees(event.expectedAttendees || '');
            setPrice(event.price || '');
            setDescription(event.description || '');
        }
    }, [event]);

    function isValidDateDMY(dateStr: string) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null);
        setError(null);
        if (!title || !date || !location || !expectedAttendees || !price) {
            setError("All fields must be typed");
        }
        const eventDate = new Date(date);
        const now = new Date()

        if (eventDate.getDay() <= now.getDay() && eventDate.getMonth() <= now.getMonth() && eventDate.getFullYear() <= now.getFullYear()) {
            setError("Choose another Day");

        } else {
            try {
                setLoading(true);
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const res = await axios.post("http://localhost:5000/api/user/event/", {
                    title, date, location, expectedAttendees, price, description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })

                if (res.status === 201) {
                    setMessage(res.data.message)
                }
                else setError(res.data.message)

            } catch (error) {
                console.log("ERROR");
                setError("ERROR")
            } finally {
                setLoading(false)
            }
        }

    }
    return (
        <>
            <div>
                <div className="min-h-screen w-full relative bg-linear-to-b flex flex-col items-center pt-24 pb-20 px-4">


                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg p-8 sm:p-10"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl font-bold">Create New Event</h1>
                        </div>
                        <div className="space-y-5">
                            <label className="block">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1 ">Event Title</span>
                                </div>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter event title"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>

                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1">Date</span>
                                </div>
                                <input
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    type="date"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>

                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar size={16} />
                                    <span className="block text-sm font-medium text-gray-700 mb-1">Time</span>
                                </div>
                                <input
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    type="time"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>


                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1">Location</span>
                                </div>
                                <input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Event location"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>

                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1">Expected Attendees</span>
                                </div>
                                <input
                                    value={expectedAttendees}
                                    onChange={(e) => setAttendees(e.target.value === '' ? '' : Number(e.target.value))}
                                    type="number"
                                    min={0}
                                    placeholder="e.g. 120"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>

                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <DollarSign size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1">Price</span>
                                </div>
                                <input
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                                    type="number"
                                    min={0}
                                    placeholder="e.g. 120"
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                            </label>

                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText size={16} />
                                    <span className="block text-sm font-medium text-gray-700 mb-1">Category</span>
                                </div>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Arts & Science">Arts & Science</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Agriculture">Agriculture</option>
                                    <option value="Pharmacy">Pharmacy</option>
                                    <option value="Physiotherapy">Physiotherapy</option>
                                    <option value="Allied Health Sciences">Allied Health Sciences</option>
                                    <option value="Hotel Management">Hotel Management</option>
                                    <option value="Business">Business</option>
                                </select>
                            </label>


                            <label className="block ">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText size={16} /> <span className="block text-sm font-medium text-gray-700 mb-1">Description</span>
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                    placeholder="Write a short description..."
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 resize-none"
                                />
                            </label>

                            {/* Messages */}
                            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                            {message && <p className="text-green-400 text-sm text-center">{message}</p>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 text-lg font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Creating Event...</span>
                                    </>
                                ) : (
                                    <>
                                        <PlusCircle size={16} />
                                        <span>Create Event</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default AddEvent