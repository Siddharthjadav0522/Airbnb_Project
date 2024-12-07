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
            .then((response) => {
                setPlaces(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching places:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex gap-2 items-center bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                    <i className="fa-solid fa-plus"></i> Add new place
                </Link>
            </div>

            <div className="mt-4">
                {places.length > 0 ? (
                    places.map((place) => (
                        <Link key={place._id} to={'/account/places/' + place._id} className="flex flex-wrap 
                        md:flex-nowrap lg:flex-nowrap cursor-pointer gap-4 bg-gray-100 bg-opacity-80 p-3 rounded-2xl mb-5">
                            <div className="flex w-36 h-36 bg-gray-300 grow shrink-0">
                                <PlaceImg place={place} />
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className=" mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-500 mt-4">No places found.</p>
                )}
            </div>
        </div>
    );
}

export default PlacesPage;
