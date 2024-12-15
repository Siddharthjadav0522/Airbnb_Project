import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AccountNav from '../component/AccountNav';
import PlaceImg from '../component/PlaceImg';
import { Link, useNavigate } from 'react-router-dom';
import BookingDates from '../component/BookingDates';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // console.log(bookings);
  useEffect(() => {
    axios.get('/place/bookings')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        console.error('Failed to fetch bookings:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const bookingDelete = async (id) => {
    try {
      const response = await axios.delete(`/place/bookings/${id}`);
      const { message, success, error } = response.data;
      if (success) {
        handleSuccess(message);
        setBookings((prev) => prev.filter((i) => i._id !== id));
      } else if (error) {
        const details = error?.details?.[0]?.message || "An error occurred.";
        handleError(details);
      }
    } catch {
      handleError("Failed to delete the booking.");
    }
  }

  return (
    <>
      <AccountNav />
      <div className="flex flex-col items-center md:px-4 ">
        {loading && <p className="text-lg text-gray-500">Loading bookings...</p>}
        {!loading && bookings.length === 0 && <p className="text-lg text-gray-500">No bookings found.</p>}

        {bookings?.length > 0 && bookings.map((booking) => (
          <div
            key={booking._id}
            className="w-full max-w-5xl flex flex-col md:flex-row gap-5 bg-slate-100 rounded-xl p-4 mb-4 shadow-md"
          >

            <Link to={`/account/bookings/${booking._id}`} className="w-full md:w-48 h-40 md:h-auto">
              <PlaceImg place={booking.place} />
            </Link>

            <Link className="flex-1" to={`/account/bookings/${booking._id}`} >

              <h2 className="font-semibold text-lg mb-2">{booking.place.title}</h2>
              <BookingDates booking={booking} />

              <div className="text-sm text-gray-600">
                <p>
                  <i className="fa-regular fa-credit-card mr-1"></i>
                  <span className="font-medium mr-2">Total price :</span >
                  <i className="fa-solid fa-indian-rupee-sign fa-sm mr-1"></i>
                  {booking.price.toLocaleString("en-IN")}
                </p>
              </div>

            </Link>

            <div className='flex md:justify-center items-end'>
              <button
                onClick={() => bookingDelete(booking._id)}
                className='px-4 py-1 w-full rounded bg-primary font-semibold text-md text-white hover:bg-rose-600'>
                <i className="fa-solid fa-xmark fa-md mr-1"></i>Cancel</button>
            </div>

          </div>
        ))}
      </div>
      <ToastContainer />
    </>
  );
}

export default BookingsPage;
