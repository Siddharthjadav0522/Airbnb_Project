import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from '../component/AddressLink';
import PlaceGallery from '../component/PlaceGallery';
import BookingDates from '../component/BookingDates';


function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null); // Initialize with null to avoid errors
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios.get('/place/bookings')
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
          } else {
            setError('Booking not found.');
          }
        })
        .catch(() => {
          setError('Failed to fetch booking details. Please try again later.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500">Loading booking...</p>;
  }

  if (error) {
    return <div className='mt-8'>
      <p className="text-center text-lg">{error}</p>
    </div>;
  }

  if (!booking) {
    return <div>
      <p className="text-center text-lg text-gray-500">No booking details available.</p>;
    </div>
  }

  return (
    <div className=' flex justify-center items-center'>
      <div className="mt-8 px-4 md:px-8 lg:px-14 xl:px-16 max-w-7xl">
        <h1 className="text-2xl font-semibold">{booking.place.title}</h1>
        <AddressLink place={booking.place} />

        <div className='bg-slate-100 rounded-xl p-5 mt-5 flex flex-wrap justify-between items-center'>
          <div>
            <h2 className='mb-4 text-lg'>Your booking information : </h2>
            <BookingDates booking={booking} />
          </div>

          <div className='bg-primary px-4 py-2 text-lg text-white rounded-lg flex items-center justify-center'>
            Totle price : {booking.price.toLocaleString("en-IN")}
          </div>

        </div>
        <PlaceGallery place={booking.place} />

      </div>
    </div>
  );
}

export default BookingPage;
