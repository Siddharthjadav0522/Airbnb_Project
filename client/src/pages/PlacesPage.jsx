import React, { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from '../component/Perks';
import axios from 'axios';
import PhotosUploader from '../component/PhotosUploader';
import PlacesFormPage from './PlacesFormPage';

function PlacesPage() {
    const { action } = useParams();
   

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
               <PlacesFormPage/>
            )}


        </div>
    )
}

export default PlacesPage