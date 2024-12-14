import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from "date-fns";
import axios from 'axios';
import { UserContext } from "./UserContext.jsx";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils.js";

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
        if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
            return handleError("Please fill in all fields");
        }
        const response = await axios.post('/place/bookings', {
            checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        });

        const { message, success, error } = response.data;
        console.log(message, success);
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                naviget(`/account/bookings/${response.data.bookingDoc._id}`);
            }, 1300);
        } else if (error) {
            const details = error?.details?.[0]?.message;
            handleError(details);
        } else {
            handleError(message);
        }
        // console.log(response.data.bookingDoc._id);
    }

    return (
        <div className="bg-white shadow p-6 rounded-2xl">
            <div>
                <span className="text-xl">
                    <i className="fa-solid fa-indian-rupee-sign fa-sm mr-1"></i>
                    {place.price.toLocaleString("en-IN")}
                </span> night
            </div>

            <div className="border border-gray-400 rounded-xl mt-4 overflow-hidden">

                <div className="flex flex-col md:flex-row">
                    <div className="p-3 border-b md:border-b-0 md:border-r md:border-r-gray-400 md:w-1/2">
                        <label className="font-semibold text-xs block">CHECK-IN</label>
                        <input
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="text-sm w-full"
                            type="date"
                            value={checkIn}
                        />
                    </div>
                    <div className="p-3 md:w-1/2">
                        <label className="block text-xs font-semibold">CHECKOUT</label>
                        <input
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="text-sm w-full"
                            type="date"
                            value={checkOut}
                        />
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
                <span>Book this place</span>
                {numberOfNights > 0 && (
                    <span className='ml-2'>
                        <i className="fa-solid fa-indian-rupee-sign fa-sm mr-1"></i>{numberOfNights * place.price}
                    </span>
                )}
            </button>
            <ToastContainer />
        </div>
    )
}

export default BookingWidget;
