import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Perks from '../component/Perks';

function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const inputHeader = (text) => {
        return (
            <h2 className='text-xl inline-block mt-4'>{text}</h2>
        );
    }
    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }
    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }


    return (
        <div>
            {action !== 'new' && (
                <div className='text-center'>
                    <Link className='inline-flex gap-2 items-center  bg-primary text-white py-2 px-4 rounded-full' to={'/account/places/new'}>
                        <i className="fa-solid fa-plus"></i>Add new place
                    </Link>
                </div>
            )}

            {action === 'new' && (
                <div>
                    <form action="">
                        {preInput('Title', 'Title for your place.should be short and catchy as in advertisement')}
                        <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='title, for example: My lovely apt' />

                        {preInput('Address', 'Address to this place')}
                        <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='address' />

                        {preInput('Photos', 'more = better')}
                        <div className='flex gap-2'>
                            <input value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='Add using a link ....jpg' />
                            <button className='bg-gray-200 grow p-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>

                        <div className=' mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            <button className='border bg-transparent rounded-2xl p-7 text-2xl text-gray-600'>
                                <i className="fa-solid fa-cloud-arrow-up"></i> Upload
                            </button>
                        </div>
                        {preInput('Description', 'description of the place')}
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} rows={4} className='w-full my-1 py-2 px-4 border rounded-2xl'></textarea>

                        {preInput('Perks', 'select all the perks of your place')}
                        <Perks selected={perks} onChange={setPerks} />

                        {preInput('Extra info', 'house rules, etc')}
                        <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} rows={2} className='w-full my-1 py-2 px-4 border rounded-2xl'></textarea>

                        {preInput('chack in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input value={checkIn} type="text"
                                    onChange={(e) => { checkIn(e.target.value) }} placeholder='14' className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Check in time</h3>
                                <input value={checkOut} type="text"
                                    onChange={(e) => { checkOut(e.target.value) }} placeholder='11' className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                            </div>
                            <div>
                                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                                <input value={maxGuests} type="number"
                                    onChange={(e) => { setMaxGuests(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                            </div>
                        </div>

                        <button className="bg-primary text-white w-full p-2 rounded-2xl mt-5">save</button>

                    </form>
                </div>
            )}


        </div>
    )
}

export default PlacesPage