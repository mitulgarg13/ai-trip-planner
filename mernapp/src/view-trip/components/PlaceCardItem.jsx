import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place?.place };
      const resp = await GetPlaceDetails(data);
      const photo = resp?.data?.places?.[0]?.photos?.[3];
      if (photo?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photo.name);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.place)}`;

  return (
    <Link to={mapsUrl} target="_blank" rel="noopener noreferrer">
      <div className="shadow-sm border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <img
          src={photoUrl || '/placeholder.jpg'}
          alt={place?.place || 'place image'}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.place}</h2>
          <p className="text-sm text-gray-500">{place?.details}</p>
          <h2 className="text-xs font-medium mt-2 mb-2">🏷️ Ticket: {place?.ticket_pricing}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
