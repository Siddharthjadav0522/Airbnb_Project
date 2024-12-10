import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PhotosUploader({ addedPhotos, onChange }) {
    const [photoLink, setPhotoLink] = useState('');

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        try {
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
                const filenames = response.data;
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
        onChange([filename,...addedPhotos.filter((photo) => photo !== filename)]);
    };

    return (
        <>
            <div className="flex gap-2">
                <input
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1"
                    type="text"
                    placeholder="Add using a link ....jpg"
                />
                <button onClick={addPhotoByLink} className="bg-gray-200 grow p-4 rounded-2xl">
                    Add&nbsp;photo
                </button>
            </div>

            <div className="mt-3 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((link, index) => (
                        <div key={index} className="h-32 flex relative">
                            <img
                                className="rounded-2xl w-full object-cover"
                                src={`http://localhost:4000/uploads/${link}`}
                                alt="Uploaded" />
                            <button type='button'
                                onClick={() => removePhoto(link)}
                                className="cursor-pointer absolute bottom-1 right-1 rounded-2xl text-white bg-black bg-opacity-50 py-2 px-3">
                                <i className="fa-regular fa-trash-can"></i>
                            </button>
                            <button type='button'
                                onClick={() => selectAsMainPhoto(link)}
                                className="cursor-pointer absolute bottom-1 left-1 rounded-2xl text-white bg-black bg-opacity-50 py-2 px-3">
                                {link === addedPhotos[0] && (
                                    <i className="fa-solid fa-star"></i>
                                )}
                                {link !== addedPhotos[0] && (
                                    <i className="fa-regular fa-star"></i>
                                )}
                            </button>
                        </div>
                    ))}

                <label className="border flex items-center justify-center bg-transparent rounded-2xl py-4 px-2 text-2xl text-gray-600">
                    <input type="file" className="hidden" onChange={uploadPhoto} />
                    <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp;Upload
                </label>
            </div>
        </>
    );
}

export default PhotosUploader;
