import axios from 'axios'
import { Calendar, ChevronLeft, DollarSign, FileText,MapPin, PlusCircle,Users, FileImage } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation} from 'react-router'

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

    //state
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    //nhan tham so tu url
    const locationState = useLocation().state;
    
    useEffect(() => {
        // Chỉ set giá trị 1 lần khi component mount và có event
        if (locationState?.title) {
            setTitle(locationState.title || '');
            setDate(locationState.date ? new Date(locationState.date).toISOString().split('T')[0] : '');
            setTime(locationState.time || '');
            setLocation(locationState.location || '');
            setAttendees(locationState.expectedAttendees || '');
            setPrice(locationState.price || '');
            setCategory(locationState.category || '');
            setDescription(locationState.description || '');
        }
    }, []);

    //Hàm handle image
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('Image size must be less than 10MB');
            return;
        }

        setSelectedImage(file);
        
        // Preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null);
        setError(null);
        if (!title || !date || !time || !location || !expectedAttendees || !price) {
            setError("All required fields must be filled");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            
            const formData = new FormData();
            formData.append('title', title);
            formData.append('date', date);
            formData.append('time', time);
            formData.append('location', location);
            formData.append('expectedAttendees', expectedAttendees.toString());
            formData.append('price', price.toString());
            formData.append('description', description);
            if (category) formData.append('category', category);
            if (selectedImage) formData.append('image', selectedImage);

            const res = await axios.post(
                "http://localhost:5000/api/user/event",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (res.status === 201) {
                setMessage(res.data.message);
                // Reset form
                setTitle('');
                setDate('');
                setTime('');
                setLocation('');
                setAttendees('');
                setPrice('');
                setCategory('');
                setDescription('');
                setSelectedImage(null);
                setImagePreview(null);
            } else {
                setError(res.data.message);
            }
        } catch (error) {
            console.log("ERROR", error);
            setError("Failed to create event");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            <div>
                <div className="min-h-screen w-full relative bg-linear-to-b flex flex-col items-center pt-24 pb-20 px-4">
                    <div className="flex justify-between items-center mb-6">
                        {locationState && (
                            <Link to="/myevent" className="text-orange-600 hover:text-orange-800 flex items-center text-sm font-medium">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Back to MyEvents
                            </Link>
                        )}
                    </div>

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
                                    name="title"
                                    id="title"
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
                                    name="date"
                                    id="date"
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
                                    name="time"
                                    id="time"
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
                                    name="location"
                                    id="location"
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
                                    name="expectedAttendees"
                                    id="expectedAttendees"
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
                                    name="price"
                                    id="price"
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
                                    name="category"
                                    id="category"
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
                                    name="description"
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={6}
                                    placeholder="Write a short description..."
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 resize-none"
                                />
                            </label>

                            {/* Event Image Upload */}
                            <label className="block">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileImage size={16} />
                                    <span className="block text-sm font-medium text-gray-700">Event Image</span>
                                </div>
                                
                                {imagePreview && (
                                    <div className="mb-3">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="w-full h-64 object-cover rounded-lg border border-gray-300" 
                                        />
                                    </div>
                                )}
                                
                                <input
                                    name="image"
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Recommended: 1200x630px, Max size: 10MB (JPG, PNG, GIF)
                                </p>
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