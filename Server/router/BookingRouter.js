import { Router } from "express";
import { displayBookings, insertBooking, updateBooking, removeBooking, fetchData } from "../controller/BookingController.js";

const bookingRouter = Router();

bookingRouter.get("/display", displayBookings);
bookingRouter.get("/fetch", fetchData);
bookingRouter.post("/insert", insertBooking);
bookingRouter.put("/update", updateBooking);
bookingRouter.delete("/remove", removeBooking);

export default bookingRouter;