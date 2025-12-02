export interface EventDataProp {
    _id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    attendees:number;
    expectedAttendees: number
    price:number;
    description: string;
    status: 'pending'|'approved'|'rejected';
    category: string;
}