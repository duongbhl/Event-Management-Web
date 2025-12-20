import type { EventDataProp } from "@/components/Interfaces/EventDataProp";



const DateDate = new Date();

export const eventList: EventDataProp[] = [
    { _id: '1', category: 'Allied Health Sciences', title: 'Annual Spring Concert', description: 'Join us...', date: DateDate, time: '19:00', location: 'University Auditorium', attendees: 120, expectedAttendees: 200, price: 0, status: 'approved' },
    { _id: '2', category: 'Business', title: 'Career Fair', description: 'Connect with employers...', date: DateDate, time: '10:00', location: 'Student Center', attendees: 300, expectedAttendees: 500, price: 0, status: 'approved' },
    { _id: '3', category: 'Hotel Management', title: 'Tech Workshop: AI Fundamentals', description: 'Learn AI basics', date: DateDate, time: '14:00', location: 'Engineering Building', attendees: 80, expectedAttendees: 150, price: 50, status:'approved' },
    { _id: '4', category: 'Engineering', title: 'Basketball Tournament', description: 'Inter-department competition', date: DateDate, time: '09:00', location: 'Sports Complex', attendees: 500, expectedAttendees: 800, price: 0, status: 'approved' },
    { _id: '5', category: 'Engineering', title: 'Student Club Fair', description: 'Explore clubs', date: DateDate, time: '11:00', location: 'Main Quad', attendees: 200, expectedAttendees: 300, price: 0, status: 'approved' },
    { _id: '6', category: 'Pharmacy', title: 'Research Symposium', description: 'Student research showcase', date: DateDate, time: '13:00', location: 'Science Center', attendees: 150, expectedAttendees: 250, price: 0, status:'approved' },
];