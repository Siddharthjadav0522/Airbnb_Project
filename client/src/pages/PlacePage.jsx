import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BookingWidget from '../component/BookingWidget';
import PlaceGallery from '../component/PlaceGallery';
import AddressLink from '../component/AddressLink';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    useEffect(() => {
        if (!id) {
            return;
        };
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        })
            .catch((error) => {
                console.error('Error fetching place details:', error);
            });
    }, [id]);
    // console.log(place);
    if (!place) {
        return (
            <div className="mt-8 text-center">
                <p className="text-gray-500">Loading place details...</p>
            </div>
        );
    };



    return (
        <div className='mt-8 py-4 lg:px-20 bg-gray-100 bg-opacity-80'>
            <h1 className='text-2xl font-medium '>{place.title}</h1>

            <AddressLink place={place} />

            <PlaceGallery place={place} />

            <div className='my-8 md:gap-10 gap-3 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
                <div>
                    <div className='mb-3'>
                        <h2 className='text-xl font-semibold'>Description</h2>
                        {place.description}
                    </div>
                    Chack-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests} <br />
                </div>
                <BookingWidget place={place} />
            </div>

            <div className='mb-3 p-4 bg-white border-t '>
                <h2 className='text-xl font-semibold'>Extra Info</h2>
                <p className='text-gray-700'>{place.extraInfo}</p>
            </div>

        </div>
    )
}

export default PlacePage