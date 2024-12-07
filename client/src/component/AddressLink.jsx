import React from 'react'

function AddressLink({place}) {
    return (
        <>
            <a target='_blank' className='underline font-semibold block'
                href={`https://maps.google.com/?q=${place.address}`}>{place.address}</a>
        </>
    )
}

export default AddressLink
