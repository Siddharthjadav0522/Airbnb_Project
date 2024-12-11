import React from 'react'
import { differenceInCalendarDays, format } from 'date-fns';


function BookingDates({ booking }) {
    return (
        <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2 md:gap-4 mb-2">

            <p className="flex items-center">
                <i className="fa-regular fa-moon mr-2"></i>
                {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
            </p>

            <p className="flex items-center">
                <i className="fa-regular fa-calendar-days mr-1"></i>
                <span className="font-medium">Check-in: </span> {format(new Date(booking.checkIn), 'dd-MM-yyyy')}
            </p>
            <i className="fa-solid fa-arrow-right-long hidden md:block"></i>

            <p className="flex items-center">
                <i className="fa-regular fa-calendar-days mr-1"></i>
                <span className="font-medium">Check-out: </span> {format(new Date(booking.checkOut), 'dd-MM-yyyy')}
            </p>

        </div>
    )
}

export default BookingDates
