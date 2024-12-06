import React from 'react'


function BookingWidget({ place }) {
    return (
        <div className="bg-white shadow p-6 rounded-2xl">
            <div >
                <span className="text-xl">${place.price} </span> night
            </div>

            <div className="border border-gray-400 rounded-xl mt-4 overflow-hidden">
                <div className="flex">
                    <div className="p-3 border border-r-gray-400">
                        <label className='font-semibold text-xs block'>CHECK-IN</label>
                        <input className='text-sm' type="date" />
                    </div>
                    <div className="p-3 ">
                        <label className='block text-xs font-semibold'>CHECKOUT</label>
                        <input className='text-sm' type="date" />
                    </div>
                </div>
                <div className="p-3 border border-t-gray-400">
                    <label className='block text-xs font-semibold'>GUESTS</label>
                    <input className='w-full px-3 py-1 border mt-1' type="number" value={1}
                    />
                </div>

            </div>
            <button className="bg-primary text-white py-2 px-3 rounded mt-4 w-full">
                Book this place
            </button>
        </div>
    )
}

export default BookingWidget
