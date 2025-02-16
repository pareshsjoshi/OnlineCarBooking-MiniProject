import { createConnectionObject } from "../config/DbConfig.js";

const connection = createConnectionObject();

export function displayBookings(request, response) {
    try {
        const fetchQry = "select * from display_bookings;";
        connection.query(fetchQry, (error, result) => {
            if (error) {
                console.log(error);
                response.status(500).send({ message: "Something went wrong" });
            }
            else response.status(200).send(result);
        })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Something went wrong" });
    }
}

export function insertBooking(request, response) {
    try {
        const bookings = request.body;
        const insertQry = `
        insert into bookings(booking_no, first_name, last_name, location, city, state, pincode, booking_date, driver_option, agreement) values(?,?,?,?,?,?,?,?,?,?);
        `;
        connection.query(insertQry, [bookings.booking_no, bookings.first_name, bookings.last_name, bookings.location, bookings.city, bookings.state, bookings.pincode, bookings.booking_date, bookings.driver_option, bookings.agreement], (error, result) => {
            if (error) {
                console.log(error);
                response.status(500).send({ message: "Something went wrong" });
            }
            else response.status(201).send(result);
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}

export function fetchData(request, response) {
    try {
        const fetchQry = "select * from bookings;";
        connection.query(fetchQry, (error, result) => {
            if (error) {
                console.log(error);
                response.status(500).send({ message: "Something went wrong" });
            }
            else response.status(200).send(result);
        })
    } catch (error) {
        console.log(error)
        response.status(500).send({ message: "Something went wrong" });
    }
}

export function updateBooking(request, response) {
    try {
        const bookings = request.body;
        console.log(bookings);
        const updateQry = `
        update bookings set first_name=?, last_name=?, location=?, city=?, state=?, pincode=?, booking_date=?, driver_option=?, agreement=?
        where booking_no=?;
        `;
        connection.query(updateQry, [bookings.first_name, bookings.last_name, bookings.location, bookings.city, bookings.state, bookings.pincode, bookings.booking_date, bookings.driver_option, bookings.agreement, bookings.booking_no], (error, result) => {
            if (error) {
                console.log(error);
                response.status(500).send({ message: "Something went wrong" });
            }
            else response.status(201).send({ message: "Successful!" });
        });
    } catch (error) {
        console.log(error);
        response.status(503).send({ message: "Something went wrong" });
    }
}
export function removeBooking(request, response) {
    try {
        const bookings = request.body;
        const deleteQry = `
        delete from display_bookings
        where booking_no=?;
        `;
        connection.query(deleteQry, [bookings.booking_no], (error, result) => {
            if (error) {
                console.log(error);
                response.status(500).send({ message: "Something went wrong" });
            }
            else response.status(201).send({ message: "Booking cancelled successfully!" });
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Something went wrong" });
    }
}