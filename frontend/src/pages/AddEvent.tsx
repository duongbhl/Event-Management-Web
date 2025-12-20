import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Calendar,
    ChevronLeft,
    DollarSign,
    FileText,
    MapPin,
    Users,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import type { EventDataProp } from "@/components/Interfaces/EventDataProp";


interface EditEventState extends EventDataProp {
    isEdit?: boolean;
}

const AddEvent: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editState = location.state as EditEventState | null;
    const isEditMode = Boolean(editState?.isEdit);

    // ================= FORM STATE =================
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [locationName, setLocationName] = useState("");
    const [expectedAttendees, setExpectedAttendees] = useState<number | "">("");
    const [price, setPrice] = useState<number | "">("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    // ================= IMAGE =================
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // ================= UI STATE =================
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // ================= INIT EDIT DATA =================
    useEffect(() => {
        if (isEditMode && editState) {
            setTitle(editState.title || "");
            setDate(
                editState.date
                    ? new Date(editState.date).toISOString().split("T")[0]
                    : ""
            );
            setTime(editState.time || "");
            setLocationName(editState.location || "");
            setExpectedAttendees(editState.expectedAttendees || "");
            setPrice(editState.price || "");
            setCategory(editState.category || "");
            setDescription(editState.description || "");

            if (editState.image) {
                setImagePreview(editState.image); // 👈 HIỂN THỊ ẢNH CŨ
            }
        }
    }, [isEditMode, editState]);

    // ================= IMAGE HANDLER =================
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError("Image size must be less than 10MB");
            return;
        }

        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // ================= SUBMIT =================
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!title || !date || !time || !locationName || !expectedAttendees || !price) {
            setError("All required fields must be filled");
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("title", title);
            formData.append("date", date);
            formData.append("time", time);
            formData.append("location", locationName);
            formData.append("expectedAttendees", expectedAttendees.toString());
            formData.append("price", price.toString());
            formData.append("description", description);
            if (category) formData.append("category", category);
            if (selectedImage) formData.append("image", selectedImage);

            const url = isEditMode
                ? `http://localhost:5000/api/user/event/${editState?._id}`
                : "http://localhost:5000/api/user/event";

            const method = isEditMode ? "put" : "post";

            await axios({
                method,
                url,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(
                isEditMode ? "Event updated successfully!" : "Event created successfully!"
            );

            setTimeout(() => {
                navigate("/myevent");
            }, 800);
        } catch (err) {
            console.error(err);
            setError(isEditMode ? "Failed to update event" : "Failed to create event");
        } finally {
            setLoading(false);
        }
    };

    // ================= UI =================
    return (
        <div className="min-h-screen flex flex-col items-center pt-24 pb-20 px-4">
            <div className="w-full max-w-2xl mb-4">
                <Link
                    to="/myevent"
                    className="text-orange-600 hover:text-orange-800 flex items-center text-sm font-medium"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to My Events
                </Link>
            </div>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-lg p-8"
            >
                <h1 className="text-3xl font-bold text-center mb-6">
                    {isEditMode ? "Edit Event" : "Create New Event"}
                </h1>

                {/* TITLE */}
                <Input label="Event Title" icon={<FileText size={16} />} value={title} onChange={setTitle} />

                {/* DATE */}
                <Input label="Date" type="date" icon={<Calendar size={16} />} value={date} onChange={setDate} />

                {/* TIME */}
                <Input label="Time" type="time" icon={<Calendar size={16} />} value={time} onChange={setTime} />

                {/* LOCATION */}
                <Input label="Location" icon={<MapPin size={16} />} value={locationName} onChange={setLocationName} />

                {/* ATTENDEES */}
                <Input
                    label="Expected Attendees"
                    type="number"
                    icon={<Users size={16} />}
                    value={expectedAttendees}
                    onChange={(v: string) => setExpectedAttendees(v === "" ? "" : Number(v))}
                />

                {/* PRICE */}
                <Input
                    label="Price"
                    type="number"
                    icon={<DollarSign size={16} />}
                    value={price}
                    onChange={(v: string) => setPrice(v === "" ? "" : Number(v))}
                />

                {/* CATEGORY */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mb-4 p-2 border rounded-lg"
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

                {/* DESCRIPTION */}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    placeholder="Event description..."
                    className="w-full mb-4 p-2 border rounded-lg"
                />

                {/* IMAGE */}
                {imagePreview && (
                    <img src={imagePreview} className="w-full h-64 object-cover rounded-lg mb-3" />
                )}

                <input type="file" accept="image/*" onChange={handleImageChange} />

                {/* MESSAGE */}
                {error && <p className="text-red-500 mt-3">{error}</p>}
                {message && <p className="text-green-600 mt-3">{message}</p>}

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-3 font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700"
                >
                    {loading
                        ? isEditMode
                            ? "Updating..."
                            : "Creating..."
                        : isEditMode
                            ? "Edit Event"
                            : "Create Event"}
                </button>
            </form>
        </div>
    );
};

export default AddEvent;

// ================= HELPER INPUT =================
const Input = ({
    label,
    icon,
    value,
    onChange,
    type = "text",
}: any) => (
    <label className="block mb-4">
        <div className="flex items-center gap-2 mb-1 text-sm font-medium">
            {icon} {label}
        </div>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-2 border rounded-lg"
        />
    </label>
);
