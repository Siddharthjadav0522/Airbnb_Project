import React from 'react'

function Perks({selected,onChange}) {
    return (
        <>
            <div className=' grid  mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-wifi"></i>
                    <span>wifi</span>
                </label>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-car-side"></i>
                    <span>Free parking spot</span>
                </label>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-tv"></i>
                    <span>TV</span>
                </label>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-radio"></i>
                    <span>Radio</span>
                </label>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-paw"></i>
                    <span>Pets</span>
                </label>
                <label className='border p-3 flex rounded-2xl gap-2 items-center cursor-pointer'>
                    <input type="checkbox" />
                    <i className="fa-solid fa-shield-halved"></i>
                    <span>Private entrance</span>
                </label>
            </div>
        </>
    )
}

export default Perks
