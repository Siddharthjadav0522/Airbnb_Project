import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AccountNav from '../component/AccountNav';
import axios from 'axios';

function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces([data]);
        })
    }, []);
    // console.log(places);

    return (
        <div>
            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex gap-2 items-center  bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                    <i className="fa-solid fa-plus"></i>Add new place
                </Link>
            </div>

            {/* <div className='mt-4'>
                {places.length > 0 && places.map((place, index) => (
                    <div key={index} >
                        {place.title}
                    </div>
                ))}
            </div> */}

            <div className="mt-4">
                {places.length > 0 && places.map((place) => (
                    <Link to={'/account/places/'+ place._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                            <img src={place.photos[0]} alt="" />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>





        </div>
    )
}

export default PlacesPage