import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import BookingWidget from '../component/BookingWidget';

function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-white min-w-full min-h-screen'>
                <div className='px-10 py-10 lg:px-32 lg:py-10 grid gap-4 bg-black'>
                    <div>
                        <button onClick={() => { setShowAllPhotos(false) }} className='flex gap-2 px-3 py-1 rounded items-center fixed
                         top-7 left-7  bg-white'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Close photos</button>
                    </div>
                    <h2 className='text-2xl'>Photos of {place.title}</h2>
                    {
                        place?.photos?.length > 0 && place.photos.map((photo, index) => (
                            <div className='w-full'>
                                <img className='w-full' src={`http://localhost:4000/uploads/${photo}`} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='mt-8 py-4 lg:px-20 bg-gray-100 bg-opacity-80'>
            <h1 className='text-2xl font-medium '>{place.title}</h1>
            <a target='_blank' className='underline font-semibold block'
                href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>

            <div  className='grid gap-2 grid-cols-[2fr_2fr] pt-6 relative'>
                <div className='h-[370px] cursor-pointer' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[0] && (
                            <img className='w-full rounded-l-xl h-full object-cover' src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />)
                    }
                </div>

                <div className='grid grid-cols-2 gap-2' >
                    <div className='h-[181px] cursor-pointer' onClick={() => { setShowAllPhotos(true) }}>
                        {
                            place.photos?.[1] && (
                                <img className='w-full h-full  object-cover' src={`http://localhost:4000/uploads/${place.photos[1]}`} alt="" />)
                        }
                    </div>
                    <div className='h-[181px] cursor-pointer' onClick={() => { setShowAllPhotos(true) }}>
                        {
                            place.photos?.[2] && (
                                <img className='w-full h-full object-cover rounded-tr-xl' src={`http://localhost:4000/uploads/${place.photos[2]}`} alt="" />)
                        }
                    </div>
                    <div className='h-[181px] cursor-pointer' onClick={() => { setShowAllPhotos(true) }}>
                        {
                            place.photos?.[3] && (
                                <img className='w-full h-full object-cover' src={`http://localhost:4000/uploads/${place.photos[3]}`} alt="" />)
                        }</div>
                    <div className='h-[181px] cursor-pointer' onClick={() => { setShowAllPhotos(true) }}>
                        {
                            place.photos?.[4] && (
                                <img className='w-full h-full object-cover rounded-br-xl' src={`http://localhost:4000/uploads/${place.photos[4]}`} alt="" />)
                        }
                    </div>

                </div>

                <button onClick={() => { setShowAllPhotos(true) }}   className='bg-white text-sm px-3 py-1 flex gap-1 items-center absolute bottom-6 right-6 rounded'>
                    <i className="fa-regular fa-image"></i>Show all photos
                </button>
            </div>


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
