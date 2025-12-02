import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { EventDataProp } from "@/components/Interfaces/EventDataProp";
import { useNavigate } from "react-router";


/* ============================================================
    2. Bộ chọn tháng/năm (Dropdown)
============================================================ */
interface MonthYearPickerProps {
    currentMonth: number;
    currentYear: number;
    onChange: (month: number, year: number) => void;
}

export const MonthYearPicker: React.FC<MonthYearPickerProps> = ({
    currentMonth,
    currentYear,
    onChange,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const years = Array.from({ length: 15 }, (_, i) => 2020 + i);

    const handleSelectMonth = (m: number) => {
        onChange(m, currentYear);
        setOpen(false);
    };

    const handleSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(currentMonth, Number(e.target.value));
    };

    // Click outside → đóng menu
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", listener);
        return () => document.removeEventListener("mousedown", listener);
    }, []);

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 border rounded-md bg-white shadow-sm hover:bg-gray-50"
            >
                {months[currentMonth]} {currentYear}
            </button>

            {open && (
                <div className="absolute z-30 bg-white shadow-xl border rounded-lg p-4 mt-2 w-64">

                    {/* Năm */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-gray-600">Year</span>
                        <select
                            value={currentYear}
                            onChange={handleSelectYear}
                            className="border px-2 py-1 rounded-md"
                        >
                            {years.map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <hr className="my-3" />

                    {/* Lưới tháng */}
                    <div className="grid grid-cols-3 gap-2">
                        {months.map((m, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelectMonth(i)}
                                className={`py-2 rounded-md border text-sm hover:bg-gray-100 transition
                                    ${i === currentMonth ? "bg-orange-600 text-white border-orange-600" : "border-gray-300"}
                                `}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/* ============================================================
    3. Lịch chính (Calendar Grid)
============================================================ */
export const CalendarGrid: React.FC<{ events: EventDataProp[] }> = ({ events }) => {
    

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Ngày trong tháng
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    // Lấp ô trống + ngày thực
    const calendarDays = [
        ...Array(firstDayIndex).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
    ];

    // Chuyển tháng
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else setCurrentMonth(currentMonth + 1);
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else setCurrentMonth(currentMonth - 1);
    };

    // Gom event theo ngày
    const eventByDay: Record<number, EventDataProp[]> = {};
    events.forEach(ev => {
        const d = new Date(ev.date);
        if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
            const day = d.getDate();
            if (!eventByDay[day]) eventByDay[day] = [];
            eventByDay[day].push(ev);
        }
    });

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    //dieu huong
    const navigate = useNavigate();
    const viewDetailsHandle = (event:EventDataProp) => {
        navigate(`/view-details/${event._id}}`, { state: { ...event } })

    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">

                <MonthYearPicker
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    onChange={(m, y) => {
                        setCurrentMonth(m);
                        setCurrentYear(y);
                    }}
                />

                <div className="flex items-center space-x-2">
                    <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <span className="text-xl font-semibold">
                        {monthNames[currentMonth]} {currentYear}
                    </span>

                    <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 border-t border-gray-200">
                {daysOfWeek.map((d) => (
                    <div key={d} className="text-sm font-medium text-center text-gray-500 p-2 border-r border-b last:border-r-0">
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
                {calendarDays.map((day, idx) => (
                    <div
                        key={idx}
                        
                        className={`min-h-[120px] border-r border-b p-2 text-sm
                          ${day ? "bg-white" : "bg-gray-50 text-gray-300"}
                        `}
                    >
                        {day}

                        {/* HIỂN THỊ SỰ KIỆN */}
                        {day && eventByDay[day] && (
                            <div className="mt-2 space-y-1">

                                {eventByDay[day].map(ev => (
                                    <div
                                        key={ev._id}
                                        onClick={()=>viewDetailsHandle(ev)}
                                        className="text-xs bg-gray-100 border border-gray-300 px-2 py-1 rounded-md
                                                   hover:bg-gray-200 cursor-pointer whitespace-nowrap overflow-hidden"
                                    >
                                        <span className="font-medium">{ev.time}</span>{" "}
                                        {ev.title}
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ============================================================
    4. Màn hình Calendar chính + DỮ LIỆU MẪU
============================================================ */

const Calendar: React.FC = () => {

    // 🔥 DỮ LIỆU MẪU GIỐNG SCHOOLER
    const sampleEvents: EventDataProp[] = [
        { _id: '11', title: "日本語7", date: "2025-12-02", time: "08:25 - 10:05", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '22', title: "ITSS in Japanese(1)", date: "2025-12-04", time: "10:15 - 14:00", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '32', title: "日本語7", date: "2025-12-09", time: "08:25 - 10:05", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '43', title: "日本語7", date: "2025-12-16", time: "08:25 - 10:05", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '53', title: "ITSS in Japanese(1)", date: "2025-12-12", time: "10:15 - 14:00", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '63', title: "日本語7", date: "2025-12-23", time: "08:25 - 10:05", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },
        { _id: '72', title: "日本語7", date: "2025-12-23", time: "08:25 - 10:05", location: 'hanoi', attendees: 10, expectedAttendees: 10, price: 10, description: ' ', status: 'approved', category: ' ' },

    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <CalendarGrid events={sampleEvents} />
        </div>
    );
};

export default Calendar;
