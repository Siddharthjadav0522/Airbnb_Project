// import React, { useEffect, useState } from 'react';
// import PhotosUploader from '../component/PhotosUploader';
// import Perks from '../component/Perks';
// import AccountNav from '../component/AccountNav';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer } from "react-toastify";
// import { handleError, handleSuccess } from "../utils";

// function PlacesFormPage() {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [title, setTitle] = useState('');
//     const [address, setAddress] = useState('');
//     const [addedPhotos, setAddedPhotos] = useState([]);
//     const [description, setDescription] = useState('');
//     const [perks, setPerks] = useState([]);
//     const [extraInfo, setExtraInfo] = useState('');
//     const [checkIn, setCheckIn] = useState('');
//     const [checkOut, setCheckOut] = useState('');
//     const [maxGuests, setMaxGuests] = useState(1);
//     const [price, setPrice] = useState(100);

//     useEffect(() => {
//         if (!id) return;
//         axios.get(`/places/${id}`).then(({ data }) => {
//             setTitle(data.title);
//             setAddress(data.address);
//             setAddedPhotos(data.photos);
//             setDescription(data.description);
//             setPerks(data.perks);
//             setExtraInfo(data.extraInfo);
//             setCheckIn(data.checkIn);
//             setCheckOut(data.checkOut);
//             setMaxGuests(data.maxGuests);
//             setPrice(data.price)
//         });
//     }, [id]);

//     const inputHeader = (text) => <h2 className="text-xl inline-block mt-4">{text}</h2>;

//     const inputDescription = (text) => <p className="text-gray-500 text-sm">{text}</p>;

//     const preInput = (header, description) => (
//         <>
//             {inputHeader(header)}
//             {inputDescription(description)}
//         </>
//     );

//     const savePlace = async (e) => {
//         e.preventDefault();
//         if (!title || !address || !addedPhotos || !description || !extraInfo || !checkIn || !checkOut || !price) {
//             return handleError("Please fill in all fields");
//         }
//         const placeData = {
//             title,
//             address,
//             addedPhotos,
//             description,
//             perks,
//             extraInfo,
//             checkIn,
//             checkOut,
//             maxGuests,
//             price
//         };

//         try {
//             if (id) {
//                 const response = await axios.put('/places', { id, ...placeData });
//                 const { message, success } = response.data;
//                 if (success) {
//                     handleSuccess(message);
//                 }
//             } else {
//                 const response = await axios.post('/places', placeData);
//                 // console.log(response);
//                 const { message, success, error } = response.data;
//                 if (success) {
//                     handleSuccess(message);
//                 } else if (error) {
//                     const details = error?.details?.[0]?.message || "An error occurred.";
//                     handleError(details);
//                 } else {
//                     handleError(message);
//                 }
//             }
//             setTimeout(() => {
//                 navigate("/account/places");
//             }, 1000);
//         } catch (error) {
//             console.error('Failed to save place:', error.message);
//         }
//     };

//     return (
//         <>
//             <AccountNav />
//             <form onSubmit={savePlace}>
//                 {preInput('Title', 'Title for your place. Should be short and catchy like in an advertisement.')}
//                 <input
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
//                     type="text"
//                     placeholder="Title, e.g., My lovely apartment"

//                 />

//                 {preInput('Address', 'Address of the place.')}
//                 <input
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
//                     type="text"
//                     placeholder="Address"
//                 />

//                 {preInput('Photos', 'Add photos (more is better).')}
//                 <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

//                 {preInput('Description', 'Description of the place.')}
//                 <textarea
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     rows={5}
//                     className="w-full my-1 py-2 px-4 border rounded-2xl" ></textarea>

//                 {preInput('Perks', 'Select all the perks of your place.')}
//                 <Perks selected={perks} onChange={setPerks} />

//                 {preInput('Extra Info', 'House rules, etc.')}
//                 <textarea
//                     value={extraInfo}
//                     onChange={(e) => setExtraInfo(e.target.value)}
//                     rows={2}
//                     className="w-full my-1 py-2 px-4 border rounded-2xl"></textarea>

//                 {preInput('Check-in & Check-out Times', 'Add times and allow a cleaning window between guests.')}
//                 <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
//                     <div>
//                         <h3 className="mt-2 -mb-1">Check-in Time</h3>
//                         <input
//                             value={checkIn}
//                             onChange={(e) => setCheckIn(e.target.value)}
//                             type="text"
//                             placeholder="14"
//                             className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
//                     </div>
//                     <div>
//                         <h3 className="mt-2 -mb-1">Check-out Time</h3>
//                         <input
//                             value={checkOut}
//                             onChange={(e) => setCheckOut(e.target.value)}
//                             type="text"
//                             placeholder="11"
//                             className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
//                     </div>
//                     <div>
//                         <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
//                         <input
//                             value={maxGuests}
//                             onChange={(e) => setMaxGuests(e.target.value)}
//                             type="number"
//                             className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
//                     </div>
//                     <div>
//                         <h3 className="mt-2 -mb-1">price per nigth</h3>
//                         <input
//                             value={price}
//                             onChange={(e) => setPrice(e.target.value)}
//                             type="number"
//                             className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" />
//                     </div>
//                 </div>

//                 <button className="bg-primary text-white w-full p-2 rounded-2xl mt-5">Save</button>
//             </form>
//             <ToastContainer />
//         </>
//     );
// }

// export default PlacesFormPage;

import React, { useEffect, useState } from 'react';
import PhotosUploader from '../component/PhotosUploader';
import Perks from '../component/Perks';
import AccountNav from '../component/AccountNav';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

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
    const [price, setPrice] = useState(100);

    useEffect(() => {
        if (!id) return;
        axios.get(`/places/${id}`).then(({ data }) => {
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);

    const inputHeader = (text) => <h2 className="text-xl mt-4 font-medium">{text}</h2>;

    const inputDescription = (text) => <p className="text-gray-500 text-sm">{text}</p>;

    const preInput = (header, description) => (
        <>
            {inputHeader(header)}
            {inputDescription(description)}
        </>
    );

    const savePlace = async (e) => {
        e.preventDefault();
        if (!title || !address || !addedPhotos || !description || !extraInfo || !checkIn || !checkOut || !price) {
            return handleError("Please fill in all fields");
        }
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };

        try {
            if (id) {
                const response = await axios.put('/places', { id, ...placeData });
                const { message, success } = response.data;
                if (success) {
                    handleSuccess(message);
                }
            } else {
                const response = await axios.post('/places', placeData);
                const { message, success, error } = response.data;
                if (success) {
                    handleSuccess(message);
                } else if (error) {
                    const details = error?.details?.[0]?.message || "An error occurred.";
                    handleError(details);
                } else {
                    handleError(message);
                }
            }
            setTimeout(() => {
                navigate("/account/places");
            }, 1000);
        } catch (error) {
            console.error('Failed to save place:', error.message);
        }
    };

    return (
        <>
            <AccountNav />
            <form onSubmit={savePlace} className="max-w-4xl mx-auto px-2 md:px-8 py-8 bg-white shadow-lg rounded-lg">
                {preInput('Title', 'Title for your place. Should be short and catchy like in an advertisement.')}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    placeholder="Title, e.g., My lovely apartment"
                />

                {preInput('Address', 'Address of the place.')}
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    placeholder="Address"
                />

                {preInput('Photos', 'Add photos (more is better).')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of the place.')}
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder='Description of the place'
                    className="w-full my-1 py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>

                {preInput('Perks', 'Select all the perks of your place.')}
                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra Info', 'House rules, etc.')}
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                    rows={3}
                    className="w-full my-1 py-2 px-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>

                {preInput('Check-in & Check-out Times', 'Add times and allow a cleaning window between guests.')}
                <div className="grid md:gap-3 gap-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Check-in Time</h3>
                        <input
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="text"
                            placeholder="14"
                            className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-out Time</h3>
                        <input
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="text"
                            placeholder="11"
                            className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                        <input
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                            className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price Per Night</h3>
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                <button className="bg-primary text-white w-full p-3 rounded-lg mt-5 hover:bg-primary-dark transition-all">
                    Save
                </button>
            </form>
            <ToastContainer />
        </>
    );
}

export default PlacesFormPage;
