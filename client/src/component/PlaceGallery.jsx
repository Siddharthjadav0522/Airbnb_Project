import React, { useState } from 'react'

function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

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
                            <div className='w-full' key={index}>
                                <img className='w-full' src={`${photo}`} alt="" />
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
    return (
        <div className='grid gap-2 grid-cols-[2fr_2fr] pt-6 relative'>
            <div className='h-[370px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                {
                    place.photos?.[0] && (
                        <img className='w-full rounded-l-xl h-full object-cover' src={`${place.photos[0]}`} alt="" />)
                }
            </div>

            <div className='grid grid-cols-2 gap-2' >
                <div className='h-[181px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[1] && (
                            <img className='w-full h-full  object-cover' src={`${place.photos[1]}`} alt="" />)
                    }
                </div>
                <div className='h-[181px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[2] && (
                            <img className='w-full h-full object-cover rounded-tr-xl' src={`${place.photos[2]}`} alt="" />)
                    }
                </div>
                <div className='h-[181px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[3] && (
                            <img className='w-full h-full object-cover' src={`${place.photos[3]}`} alt="" />)
                    }</div>
                <div className='h-[181px] cursor-pointer hover:brightness-90' onClick={() => { setShowAllPhotos(true) }}>
                    {
                        place.photos?.[4] && (
                            <img className='w-full h-full object-cover rounded-br-xl' src={`${place.photos[4]}`} alt="" />)
                    }
                </div>

            </div>

            <button onClick={() => { setShowAllPhotos(true) }} className='bg-white text-sm px-3 py-1 flex gap-1 items-center absolute bottom-6 right-6 rounded'>
                <i className="fa-regular fa-image"></i>Show all photos
            </button>
        </div>
    )
}

export default PlaceGallery
