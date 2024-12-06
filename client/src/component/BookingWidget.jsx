import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { UserContext } from "./UserContext.jsx";
import { useNavigate } from 'react-router-dom';


function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const { user } = useContext(UserContext);
    const naviget = useNavigate();
    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    };

    const bookThisPlace = async () => {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        });
        naviget(`/account/bookings/${response.data._id}`)
        // console.log(response.data._id);
    }

    return (
        <div className="bg-white shadow p-6 rounded-2xl">
            <div >
                <span className="text-xl">${place.price} </span> night
            </div>

            <div className="border border-gray-400 rounded-xl mt-4 overflow-hidden">

                <div className="flex">
                    <div className="p-3 border border-r-gray-400">
                        <label className='font-semibold text-xs block'>CHECK-IN</label>
                        <input onChange={(e) => { setCheckIn(e.target.value) }} className='text-sm' type="date" value={checkIn} />
                    </div>
                    <div className="p-3 ">
                        <label className='block text-xs font-semibold'>CHECKOUT</label>
                        <input onChange={(e) => { setCheckOut(e.target.value) }} className='text-sm' type="date" value={checkOut} />
                    </div>
                </div>

                <div className="p-3 border-t border-t-gray-400">
                    <label className='block text-xs font-semibold'>GUESTS</label>
                    <input onChange={(e) => { setNumberOfGuests(e.target.value) }} value={numberOfGuests}
                        className='w-full px-3 py-1 border mt-1' type="number" />
                </div>

                {numberOfNights > 0 && (
                    <>
                        <div className="p-3">
                            <label className='block text-xs font-semibold'>Your full name:</label>
                            <input type="text" className='w-full px-3 py-1 border mt-1'
                                value={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="p-3">
                            <label className='block text-xs font-semibold'>Phone number:</label>
                            <input type="tel" className='w-full px-3 py-1 border mt-1'
                                value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </>

                )}

            </div>

            <button onClick={bookThisPlace} className="bg-primary text-white py-2 px-3 rounded mt-4 w-full">
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>

        </div>
    )
}

export default BookingWidget;
