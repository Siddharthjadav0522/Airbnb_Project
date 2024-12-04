import React, { useEffect, useState } from 'react'
import PhotosUploader from '../component/PhotosUploader';
import Perks from '../component/Perks';
import AccountNav from '../component/AccountNav';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function PlacesFormPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then((response) => {
            const { data } = response;
            // console.log(data);

            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            // setPrice(data.price);
        });
    }, [id]);
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

    const savePlace = async (e) => {
        e.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests
        }
        if (id) {
            //update
            await axios.put('/places', { id, ...placeData })
            navigate('/account/places');

        } else {
            //new place
            await axios.post('/places', placeData)
            navigate('/account/places');
        }
    }

    return (
        <>
            <AccountNav />
            <form action="" onSubmit={savePlace}>
                {preInput('Title', 'Title for your place.should be short and catchy as in advertisement')}
                <input value={title} onChange={(e) => { setTitle(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='title, for example: My lovely apt' />

                {preInput('Address', 'Address to this place')}
                <input value={address} onChange={(e) => { setAddress(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='address' />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} rows={5} className='w-full my-1 py-2 px-4 border rounded-2xl'></textarea>

                {preInput('Perks', 'select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} rows={2} className='w-full my-1 py-2 px-4 border rounded-2xl'></textarea>

                {preInput('chack in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className='grid gap-2 sm:grid-cols-3'>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check in time</h3>
                        <input value={checkIn} type="text"
                            onChange={(e) => { setCheckIn(e.target.value) }} placeholder='14' className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Check out time</h3>
                        <input value={checkOut} type="text"
                            onChange={(e) => { setCheckOut(e.target.value) }} placeholder='11' className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                    </div>
                    <div>
                        <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                        <input value={maxGuests} type="number"
                            onChange={(e) => { setMaxGuests(e.target.value) }} className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
                    </div>
                </div>

                <button className="bg-primary text-white w-full p-2 rounded-2xl mt-5">save</button>

            </form>
        </>
    )
}

export default PlacesFormPage
