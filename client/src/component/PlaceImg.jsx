import React from 'react'

function PlaceImg({place}) {
    return (
        <>
            <img
                className='object-cover w-full h-full rounded-lg'
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt={place.title || "Place image"}
            />
        </>
    )
}

export default PlaceImg
