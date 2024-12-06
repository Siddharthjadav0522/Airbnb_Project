import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AccountNav from '../component/AccountNav';

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <>
      <AccountNav />
      <div>
        {
          bookings?.length > 0 && bookings.map((booking) => (
            <div key={booking._id}>{booking.checkIn}</div>
          ))
        }
      </div>
    </>
  )
}

export default BookingsPage
