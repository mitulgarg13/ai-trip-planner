import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const resp = await GetPlaceDetails(data);
      const photo = resp?.data?.places?.[0]?.photos?.[3];
      if (photo?.name) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photo.name);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || '/placeholder.jpg'}
        alt={trip?.userSelection?.location?.label || 'destination image'}
        className='h-[340px] w-full object-cover rounded-xl'
      />
      <div>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5 flex-wrap'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              📅 {trip.userSelection?.noOfDays} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              💰 {trip.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>
              👥 No. of traveler/s: {trip.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
