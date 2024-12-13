import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get('/places')
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  return (
    <div className='mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {places.length > 0 ? (
        places.map((place) => (
          <Link key={place._id} to={`/place/${place._id}`}>

            <div className='bg-gray-300 rounded-xl mb-2 hover:brightness-90'>
              {place.photos?.[0] && (
                <img
                  src={`${place.photos[0]}`}
                  alt={place.title}
                  className="rounded-xl w-full h-64 lg:h-72" />
              )}
            </div>

            <h2 className='text-base'>{place.address}</h2>
            <h3 className='text-sm text-gray-500 truncate'>{place.title}</h3>
            <div className='mt-2'>
              <span className='font-medium'><i class="fa-solid fa-indian-rupee-sign fa-sm"></i>&nbsp;{place.price.toLocaleString("en-IN")}</span>
              <span className='text-sm ml-1'>nigth</span>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center mt-4 text-gray-500">
          No places found. Check back later!
        </p>
      )}
    </div>
  );
}

export default IndexPage;
