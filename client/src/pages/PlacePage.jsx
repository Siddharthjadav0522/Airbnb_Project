import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BookingWidget from '../component/BookingWidget';
import PlaceGallery from '../component/PlaceGallery';
import AddressLink from '../component/AddressLink';
import Review from '../component/Review';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    const [reviews, setReviews] = useState('');
    const navigat = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        };
        axios.get(`/places/${id}`)
            .then((response) => {
                setPlace(response.data);
            })
            .catch((error) => {
                console.error('Error fetching place details:', error);
            });
    }, [id]);

    if (!place) {
        return (
            <div className="mt-8 text-center">
                <p className="text-gray-500">Loading place details...</p>
            </div>
        );
    };

    return (
        <div className=' flex justify-center items-center'>
            <div className='max-w-6xl mt-8 px-4 py-4 md:px-10'>
                <h1 className='text-2xl font-medium'>{place.title}</h1>

                <AddressLink place={place} />

                <PlaceGallery place={place} />

                <div className='my-8 grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-[2fr_1fr]'>
                    <div>
                        <div className='mb-3'>
                            <h2 className='text-xl font-semibold mb-1'>Description</h2>
                            <p>{place.description}</p>
                        </div>
                        <p>Check-in: {place.checkIn}</p>
                        <p>Check-out: {place.checkOut}</p>
                        <p>Max number of guests: {place.maxGuests}</p>
                    </div>
                    <BookingWidget place={place} />
                </div>

                <div className='mb-3 p-2 md:p-4 bg-white border-t'>
                    <h2 className='text-xl font-semibold'>Extra Info</h2>
                    <p className='text-gray-700'>{place.extraInfo}</p>
                </div>

                <Review place={place} />
            </div>
        </div>
    );
}

export default PlacePage;
