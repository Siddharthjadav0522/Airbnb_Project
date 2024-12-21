import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.js';

function Review({ place }) {
    const [rating, setRating] = useState('1');
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const placeId = place._id;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/place/${place._id}/reviews`);
                setReviews(response.data.reviews);
                // console.log(response.data.reviews);
            } catch (error) {
                console.error(error);
                handleError('Failed to fetch reviews. Please try again later.');
            }
        };
        fetchReviews();
    }, [place._id])

    const handleReview = async () => {
        if (!comment) {
            return handleError('Please fill in all fields.');
        }
        try {
            const response = await axios.post(`/place/${placeId}/reviews`, { rating, comment });
            const { message, success, error } = response.data;
            if (success) {
                handleSuccess(message);
                setComment('');
                setRating('1');
                const updatedReviews = await axios.get(`/place/${place._id}/reviews`);
                setReviews(updatedReviews.data.reviews);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.error(error);
            handleError('Failed to submit review. Please try again.');
        }
    };

    const reviewDelete = async (reviewId) => {
        // console.log(reviewId);
        try {
            const response = await axios.delete(`/place/${placeId}/reviews/${reviewId}`);
            const { message, success, error } = response.data;
            if (success) {
                handleSuccess(message);
                const updatedReviews = await axios.get(`/place/${place._id}/reviews`);
                setReviews(updatedReviews.data.reviews);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (error) {
            console.error(error);
            handleError('Failed to submit review. Please try again.');
        }
    }

    return (
        <div className="bg-white md:p-3 p-2 border-t">
            <div className="mt-1">
                <label htmlFor="customRange" className="form-label text-lg font-medium">Rating</label>
                <fieldset className="starability-slot">
                    <input
                        type="radio"
                        id="no-rate"
                        className="input-no-rate"
                        value=""
                        checked={rating === ''}
                        onChange={() => setRating('')}
                        aria-label="No rating."
                    />
                    <input
                        type="radio"
                        id="first-rate1"
                        value="1"
                        checked={rating === '1'}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate1" title="Terrible">1 star</label>
                    <input
                        type="radio"
                        id="first-rate2"
                        value="2"
                        checked={rating === '2'}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate2" title="Not good">2 stars</label>
                    <input
                        type="radio"
                        id="first-rate3"
                        value="3"
                        checked={rating === '3'}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate3" title="Average">3 stars</label>
                    <input
                        type="radio"
                        id="first-rate4"
                        value="4"
                        checked={rating === '4'}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate4" title="Very good">4 stars</label>
                    <input
                        type="radio"
                        id="first-rate5"
                        value="5"
                        checked={rating === '5'}
                        onChange={(e) => setRating(e.target.value)}
                    />
                    <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                </fieldset>
            </div>
            <div>
                <h2 className="mb-2">Comment</h2>
                <textarea
                    rows={4}
                    className="border-2 w-full lg:w-2/4 px-4 py-2"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    placeholder="Write your comment here..."
                />
            </div>
            <button
                onClick={handleReview}
                className="bg-rose-500 px-6 py-2 mt-4 rounded-xl text-white hover:bg-rose-600"
            >
                Submit
            </button>

            {
                reviews.length > 0 && (
                    <div className='mt-8'>
                        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {reviews.length > 0 &&
                                reviews.map((review) => (
                                    <div key={review._id} className='shadow-md flex flex-col justify-between py-2 px-3'>
                                        <div>
                                            <h2 className='text-lg'>{review.author.name}</h2>
                                            <p>{new Date(review.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"},)}</p>
                                            <p className="starability-result my-1" data-rating={review.rating}></p>
                                            <p className='h-20 overflow-hidden text-ellipsis mt-3 mb-1 text-sm'>{review.comment}</p>
                                        </div>
                                        <div className='flex justify-end items-center mt-1 md:mt-2'>
                                            <button onClick={() => reviewDelete(review._id)} className='bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-md'>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }



            <ToastContainer />
        </div>
    );
}

export default Review;
