import { Router } from "express";

import {
  createEvent,
  getAllEvent,
  getAllPendingEvent,
  getAllApprovalEvent,
  bookTicket,
  cancelTicket,
  getTicketById,
  getEvents,
  getApprovedEventsLast5Months,
  getApprovedEventsNext3Months,
  getTotalAttendeesLastMonth,
  getTotalRevenueLastMonth,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

export const userRouter = Router();

/* ===============================
      📦 EVENT ROUTES (USER)
   =============================== */

// 👉 Tạo mới sự kiện (chờ admin duyệt)
userRouter.post("/event", protect, createEvent);//xong

// 👉 Xem tất cả sự kiện do user hiện tại tổ chức
userRouter.get("/events", protect, getAllEvent);//xong

// 👉 Xem danh sách sự kiện chưa được duyệt (chỉ organizer thấy)
userRouter.get("/events/pending",protect, getAllPendingEvent);//xong

// 👉 Xem danh sách sự kiện đã được duyệt (tất cả user đều thấy)
userRouter.get("/events/approved",protect,getAllApprovalEvent);//xong

userRouter.get("/stats/approved-last-5-months", protect, getApprovedEventsLast5Months);
userRouter.get("/stats/approved-next-3-months", protect, getApprovedEventsNext3Months);
userRouter.get("/stats/attendees-last-month", protect, getTotalAttendeesLastMonth);
userRouter.get("/stats/revenue-last-month", protect, getTotalRevenueLastMonth);

//su kien cua ng khac da dc approved
userRouter.get("/allEvents/approved",protect,getEvents);

/* ===============================
      🎟️ TICKET ROUTES (USER)
   =============================== */

// 👉 Đặt vé cho 1 sự kiện
userRouter.post("/tickets", protect, bookTicket);//xong

// 👉 Hủy vé đã đặt
userRouter.put("/tickets/:id/cancel", protect, cancelTicket);//xong

// Xem chi tiết vé theo ID
userRouter.get("/tickets/:id", protect, getTicketById);//xong


export default userRouter;
