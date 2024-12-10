import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AccountNav from '../component/AccountNav';
import PlaceImg from '../component/PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../component/BookingDates';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <AccountNav />
      <div className="flex flex-col items-center px-4">
        {loading && <p className="text-lg text-gray-500">Loading bookings...</p>}
        {!loading && bookings.length === 0 && <p className="text-lg text-gray-500">No bookings found.</p>}

        {bookings?.length > 0 && bookings.map((booking) => (
          <Link to={`/account/bookings/${booking._id}`}
            key={booking._id}
            className="w-full max-w-4xl flex flex-col md:flex-row gap-5 bg-slate-100 rounded-xl p-4 mb-4 shadow-md"
          >
          
            <div className="w-full md:w-48 h-32 md:h-auto">
              <PlaceImg place={booking.place} />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold text-lg mb-2">{booking.place.title}</h2>
             <BookingDates booking={booking}/>

              <div className="text-sm text-gray-600">
                <p>
                  <i className="fa-regular fa-credit-card mr-2"></i>
                  <span className="font-medium">Total price: </span> ${booking.price}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default BookingsPage;
