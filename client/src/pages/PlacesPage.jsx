import React from 'react'
import { Link, useParams } from 'react-router-dom'

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
                <div>
                    <form action="">
                        <label className='text-xl inline-block mt-4'>Title</label>
                        <p className='text-gray-500 text-sm'>Title for your place.should be short and catchy as in advertisement</p>
                        <input className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='title, for example: My lovely apt' />

                        <label className='text-xl inline-block mt-4'>Address</label>
                        <p className='text-gray-500 text-sm'>Address to this place</p>
                        <input className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='address' />

                        <label className='text-xl inline-block mt-4'>Photos</label>
                        <p className='text-gray-500 text-sm'>more = better</p>
                        <div className='flex gap-2'>
                            <input className="w-full border border-gray-400 rounded-2xl py-2 px-3 my-1" type="text" placeholder='Add using a link ....jpg' />
                            <button className='bg-gray-200 grow p-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>

                        <div className=' mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                            <button className='border bg-transparent rounded-2xl p-7 text-2xl text-gray-600'>
                                <i className="fa-solid fa-cloud-arrow-up"></i> Upload
                            </button>
                        </div>

                        <label className='text-xl inline-block mt-4'>Description</label>
                        <p className='text-gray-500 text-sm'>description of the place</p>
                        <textarea rows={4} className='w-full my-1 py-2 px-4 border rounded-2xl '></textarea>

                        <label className='text-xl inline-block mt-4'>Perks</label>
                        <p className='text-gray-500 text-sm'>select all the perks of your place</p>
                        <div>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-wifi"></i>
                                <span>wifi</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-car-side"></i>
                                <span>Free parking spot</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-tv"></i>
                                <span>TV</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-radio"></i>
                                <span>Radio</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-paw"></i>
                                <span>Pets</span>
                            </label>
                            <label>
                                <input type="checkbox" />
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Private entrance</span>
                            </label>
                        </div>

                    </form>
                </div>
            )}


        </div>
    )
}

export default PlacesPage