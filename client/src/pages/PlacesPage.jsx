import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../component/AccountNav';
import axios from 'axios';
import PlaceImg from '../component/PlaceImg';

function PlacesPage() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/user-places')
            .then((response) => setPlaces(response.data))
            .catch((error) => {
                console.error("Error fetching places:", error);
                alert("Failed to load places. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link
                    className="inline-flex mb-5  gap-2 items-center bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark"
                    to={'/account/places/new'}
                >
                    <i className="fa-solid fa-plus"></i> Add new place
                </Link>
            </div>

            {loading ? (<p className="text-md text-gray-500 text-center">Loading places...</p>) : (
                <>
                    {places.length === 0 && (
                        <p className="text-lg text-gray-500 text-center my-20">No places found.</p>
                    )}
                    <div className="mt-4 flex flex-col justify-center items-center ">
                        {places.map((place) => (
                            <Link
                                key={place._id}
                                to={'/account/places/' + place._id}
                                className="w-full max-w-5xl flex flex-wrap gap-4 bg-gray-100 bg-opacity-80 p-3 rounded-2xl mb-5 hover:bg-gray-200"
                            >
                                <div className="w-full md:w-48 h-40 md:h-32 bg-gray-300 hover:brightness-90 overflow-hidden">
                                    <PlaceImg place={place} />
                                </div>
                                <div className="md:flex-1">
                                    <h2 className="text-md md:text-lg font-medium">{place.title}</h2>
                                    <p className="mt-2 md:text-md line-clamp-2">{place.description}</p>
                                </div>
                                <div className='flex w-full md:w-auto md:justify-center items-end'>
                                    <button
                                        onClick={() => placeDelete(place._id)}
                                        className='px-4 py-1 w-full rounded bg-primary font-semibold text-md text-white hover:bg-rose-600'>
                                        <i className="fa-solid fa-trash fa-sm mr-1"></i>Delete</button>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default PlacesPage;
