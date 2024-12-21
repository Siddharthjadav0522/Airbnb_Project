import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../component/UserContext';

function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [limit, setLimit] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/places?limit=${limit}`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePlaceClick = (placeId) => {
    if (!user) {
      navigate('/login');
      alert(' Please login to view places');
    } else {
      navigate(`/place/${placeId}`);
    }
  };

  const showMoreListing = () => {
    let newLimit = limit + 4;
    setLimit(newLimit);

    axios
      .get(`/places?limit=${newLimit}`)
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      })
  }
  // console.log(`place = ${places.length}`);
  // console.log(`limit:${limit}`);


  return (
    <div className="mt-8 mb-4 px-4 md:px-9 xl:px-20">
      {loading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <p className="text-lg text-gray-500">Loading places...</p>
        </div>
      ) : (
        <>
          <div className="grid md:gap-6 gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!loading && places.length === 0 && (
              <p className="text-lg text-gray-500 text-center col-span-full">
                No places found.
              </p>
            )}

            {places.map((place) => (
              <div
                key={place._id}
                onClick={() => handlePlaceClick(place._id)}
                className="cursor-pointer"
              >
                <div className="h-64 lg:h-64 bg-gray-200 rounded-xl mb-2 hover:brightness-90">
                  {place.photos?.[0] && (
                    <img
                      src={`${place.photos[0]}`}
                      alt={place.title}
                      className="rounded-xl w-full h-full" />
                  )}
                </div>
                <div className="ml-1">
                  <h2 className="text-base">{place.address}</h2>
                  <h3 className="text-sm text-gray-500 truncate">{place.title}</h3>
                  <div className="mt-2">
                    <span className="font-medium">
                      <i className="fa-solid fa-indian-rupee-sign fa-sm"></i>&nbsp;
                      {place.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm ml-1">night</span>
                  </div>
                </div>
              </div>
            ))}

          </div>
          {limit > places.length || limit === places.length &&
            <div className='flex justify-center flex-col items-center mt-10'>
              <p className='mb-4 font-medium text-lg'>Continue exploring castles</p>
              <button
                onClick={showMoreListing}
                className="py-3 px-4 bg-black text-white rounded-md transition-all"
              >
                Show more
              </button>

            </div>}
        </>
      )}
    </div>
  );
}

export default IndexPage;