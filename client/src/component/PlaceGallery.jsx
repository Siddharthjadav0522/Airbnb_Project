import React, { useState } from 'react'

function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className='absolute inset-0 bg-white min-w-full min-h-max overflow-auto flex justify-center'>
                <div className='md:px-6 px-3 py-10 lg:max-w-7xl h-full w-full lg:py-10 grid gap-4'>
                    <div>
                        <button onClick={() => { setShowAllPhotos(false) }} className='flex gap-2 px-3 py-1 rounded items-center fixed
                         top-7 left-7  bg-primary text-white'>
                            <i className="fa-solid fa-arrow-left"></i>
                            Close photos</button>
                    </div>
                    <h2 className='lg:text-2xl md:text-xl text-xl font-medium mb-4 mt-5'>Photos of {place.title}</h2>
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                    {
                        place?.photos?.length > 0 && place.photos.map((photo, index) => (
                            <div className='w-full lg:h-96 md:h-72 h-64 bg-gray-300' key={index}>
                                <img className='w-full h-full object-cover' src={`${photo}`} alt="" />
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='grid md:gap-2 gap-1 grid-cols-1 sm:grid-cols-[2fr_1fr] md:grid-cols-[2fr_2fr] lg:grid-cols-[2fr_2fr] mt-6 relative rounded-xl overflow-hidden'>
            <div className='md:h-[370px] h-[250px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                {
                    place.photos?.[0] && (
                        <img className='w-full h-full object-cover' src={`${place.photos[0]}`} alt="" />)
                }
            </div>

            <div className='grid grid-cols-2 md:gap-2 gap-1' >
                <div className='md:h-[181px] h-[140px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[1] && (
                            <img className='w-full h-full object-cover' src={`${place.photos[1]}`} alt="" />)
                    }
                </div>
                <div className='md:h-[181px] h-[140px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[2] && (
                            <img className='w-full h-full object-cover' src={`${place.photos[2]}`} alt="" />)
                    }
                </div>
                <div className='md:h-[181px] h-[140px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[3] && (
                            <img className='w-full h-full object-cover' src={`${place.photos[3]}`} alt="" />)
                    }</div>
                <div className='md:h-[181px] h-[140px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[4] && (
                            <img className='w-full h-full object-cover' src={`${place.photos[4]}`} alt="" />)
                    }
                </div>

            </div>

            <button onClick={() => { setShowAllPhotos(true) }} className='bg-white text-sm px-3 py-1 flex gap-1 items-center absolute md:bottom-6 md:right-6 bottom-3 right-3 rounded'>
                <i className="fa-regular fa-image"></i>Show all photos
            </button>
        </div>
    )
}

export default PlaceGallery
