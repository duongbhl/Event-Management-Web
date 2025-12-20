import { Request, Response } from "express";
import Event from "../models/event.model";
import Ticket from "../models/ticket.model";
import { uploadToCloudinary } from '../middleware/upload.middleware';

// --- EVENT CRUD ---


// --- CREATE EVENT ---
export const createEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { title, date, time, location, expectedAttendees, price, description, category } = req.body;

    let imageUrl: string | undefined = undefined;

    // Nếu có file upload, upload lên Cloudinary
    if (req.file) {
      imageUrl = await uploadToCloudinary(
        req.file.buffer,
        'event-management/events',
        [{ width: 1200, height: 630, crop: 'fill' }]
      );
    }

    const newEvent = await Event.create({
      title,
      date,
      time,
      location,
      expectedAttendees,
      price,
      description,
      category,
      image: imageUrl,
      organizerId: userId,
      attendees: 0,
      status: "pending"
    });

    res.status(201).json({ message: "Event created, pending approval", data: newEvent });
  } catch (error) {
    console.error("Error in createEvent:", error);
    res.status(500).json({ message: "Event creation failed", error });
  }
};

// --- UPDATE EVENT ---
export const updateEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const eventId = req.params.id;

    const {
      title,
      date,
      time,
      location,
      expectedAttendees,
      price,
      description,
      category,
    } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ❌ Không cho sửa event không phải của mình
    if (event.organizerId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to edit this event" });
    }

    // ❌ Không cho sửa event đã được duyệt
    if (event.status === "approved") {
      return res.status(400).json({ message: "Approved event cannot be edited" });
    }

    let imageUrl = event.image;

    // 👉 Nếu có ảnh mới → upload
    if (req.file) {
      imageUrl = await uploadToCloudinary(
        req.file.buffer,
        "event-management/events",
        [{ width: 1200, height: 630, crop: "fill" }]
      );
    }

    // 👉 Update fields
    event.title = title ?? event.title;
    event.date = date ?? event.date;
    event.time = time ?? event.time;
    event.location = location ?? event.location;
    event.expectedAttendees = expectedAttendees ?? event.expectedAttendees;
    event.price = price ?? event.price;
    event.description = description ?? event.description;
    event.category = category ?? event.category;
    event.image = imageUrl;

    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    console.error("Error in updateEvent:", error);
    res.status(500).json({ message: "Event update failed", error });
  }
};



//lay tat ca event cua minh
export const getAllEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId: userId });
    res.status(200).json({ data: events });
  } catch (error) {
    console.error("Error in getAllEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//lay event pending cua minh
export const getAllPendingEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId:userId,status: "pending" });
    res.status(200).json({ message: "Pending events fetched", data: events });
  } catch (error) {
    console.error("Error in getAllApprovalEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};  

//lay event da approve cua minh
export const getAllApprovalEvent = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({ organizerId:userId,status: "approved" });
    res.status(200).json({ message: "Approved events fetched", data: events });
  } catch (error) {
    console.error("Error in getAllApprovalEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// --- THỐNG KÊ ---
// 1️⃣ Tổng số sự kiện đã được approved trong 5 tháng trước
export const getApprovedEventsLast5Months = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(now.getMonth() - 5);

    const count = await Event.countDocuments({
      organizerId: userId,
      status: "approved",
      date: { $gte: fiveMonthsAgo, $lte: now },
    });

    res.status(200).json({ message: "Approved events in last 5 months", total: count });
  } catch (error) {
    console.error("Error in getApprovedEventsLast5Months:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// 2️⃣ Tổng số sự kiện đã được approved trong 3 tháng tới
export const getApprovedEventsNext3Months = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(now.getMonth() + 3);

    const count = await Event.countDocuments({
      organizerId: userId,
      status: "approved",
      date: { $gte: now, $lte: threeMonthsLater },
    });

    res.status(200).json({ message: "Approved events in next 3 months", total: count });
  } catch (error) {
    console.error("Error in getApprovedEventsNext3Months:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// 3️⃣ Tổng attendees của các sự kiện trong 3 tháng trước
export const getTotalAttendeesLastMonth = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 3);

    const events = await Event.find({
      organizerId: userId,
      status: "approved",
      date: { $gte: oneMonthAgo, $lte: now },
    });

    const totalAttendees = events.reduce((sum, e) => sum + (e.attendees || 0), 0);

    res.status(200).json({ message: "Total attendees in last month", totalAttendees });
  } catch (error) {
    console.error("Error in getTotalAttendeesLastMonth:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// 4️⃣ Tổng thu nhập của các sự kiện trong 3 tháng trước
export const getTotalRevenueLastMonth = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 3);

    const events = await Event.find({
      organizerId: userId,
      status: "approved",
      date: { $gte: oneMonthAgo, $lte: now },
    });

    const totalRevenue = events.reduce((sum, e) => sum + (e.attendees || 0) * (e.price || 0), 0);

    res.status(200).json({ message: "Total revenue in last month", totalRevenue });
  } catch (error) {
    console.error("Error in getTotalRevenueLastMonth:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


//lay event cua tat ca moi nguoi tru cua minh (approved)
export const getEvents = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const events = await Event.find({status:"approved",organizerId:{ $ne: userId }});
    res.status(200).json({ data: events });
  } catch (error) {
    console.error("Error in getAllEvent:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//lay chi tiet event theo id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizerId', 'username email'); // Lấy thông tin organizer
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// --- TICKET CRUD ---
export const bookTicket = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { eventId, quantity } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const remaining = (event.expectedAttendees || 0) - (event.attendees || 0);
    if (quantity > remaining) return res.status(400).json({ message: "Not enough tickets" });

    const ticket = await Ticket.create({
      userId,
      eventId,
      quantity,
      totalPrice: quantity * event.price,
      status: "booked",
    });

    event.attendees += quantity;
    await event.save();

    res.status(200).json({ message: "Booked successfully", data: ticket });
  } catch (error) {
    console.error("Error in bookTicket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const cancelTicket = async (req: any, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user.id });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    if (ticket.status !== "booked") return res.status(400).json({ message: "Cannot cancel" });

    const event = await Event.findById(ticket.eventId);
    if (event) {
      event.attendees -= ticket.quantity;
      await event.save();
    }

    ticket.status = "cancelled";
    await ticket.save();

    res.status(200).json({ message: "Ticket cancelled", data: ticket });
  } catch (error) {
    console.error("Error in cancelTicket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTicketById = async (req: any, res: Response) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, userId: req.user.id })
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json({ data: ticket });
  } catch (error) {
    console.error("Error in getTicketById:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMyTickets = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const tickets = await Ticket.find({ userId, status: "booked" })
      .populate('eventId'); // Populate để lấy thông tin event
    res.status(200).json({ data: tickets });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};




