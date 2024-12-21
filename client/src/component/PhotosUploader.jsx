import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        try {
            if (!photoLink) {
                return handleError("Please enter a photo link");
            }
            const { data } = await axios.post('/upload-by-link', { link: photoLink });
            onChange([...addedPhotos, data.filename]);
            setPhotoLink('');
        } catch (error) {
            console.error('Error adding photo:', error.message);
        }
    };

    const uploadPhoto = (e) => {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }
        axios
            .post('/upload', data)
            .then((response) => {
                const filenames = response.data.fileUrls;
                // console.log(response.data.fileUrls);
                onChange([...addedPhotos, ...filenames]);
            })
            .catch((error) => {
                console.error('Upload failed:', error);
            });
    };

    const removePhoto = (filename) => {
        onChange([...addedPhotos.filter((photo) => photo !== filename)]);
    };
    const selectAsMainPhoto = (filename) => {
        onChange([filename, ...addedPhotos.filter((photo) => photo !== filename)]);
    };

    return (
        <>
            <div className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                <input
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    className="w-full border border-gray-400 rounded-lg py-2 px-3 my-1 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    placeholder="Add using a link ....jpg"
                />
                <button onClick={addPhotoByLink} className="bg-rose-500 h-11 text-white hover:bg-rose-600 grow px-4 rounded-lg py-2">
                    Add&nbsp;photo
                </button>
            </div>

            <div className="mt-3 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((link, index) => (
                        <div key={index} className="h-32 flex relative">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={`${link}`}
                                // src={`http://localhost:4000/uploads/${link}`}
                                alt="Uploaded" />
                            <button type='button'
                                onClick={() => removePhoto(link)}
                                className="cursor-pointer absolute bottom-1 right-1 rounded-2xl text-white bg-black bg-opacity-50 text-md md:text-lg ">
                                <i className="fa-regular fa-trash-can py-2 px-3"></i>
                            </button>
                            <button type='button'
                                onClick={() => selectAsMainPhoto(link)}
                                className="cursor-pointer absolute bottom-1 left-1 rounded-2xl text-white bg-black bg-opacity-50 text-md md:text-lg">
                                {link === addedPhotos[0] && (
                                    <i className="fa-solid fa-star py-2 px-3"></i>
                                )}
                                {link !== addedPhotos[0] && (
                                    <i className="fa-regular fa-star py-2 px-3"></i>
                                )}
                            </button>
                        </div>
                    ))}

                <label className="border flex items-center flex-col justify-center bg-transparent rounded-2xl h-32 py-2 px-2 text-2xl text-gray-600">
                    <input type="file" className="hidden" onChange={uploadPhoto} />
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    <span className=''>Upload</span>
                </label>
            </div>
            <ToastContainer/>
        </>
    );
}

export default PhotosUploader;
