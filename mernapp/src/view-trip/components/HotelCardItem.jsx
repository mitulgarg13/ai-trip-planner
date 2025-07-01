/* eslint-disable no-unused-vars */
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel&&GetPlacePhoto();
    }, [hotel])

   const GetPlacePhoto = async () => {
    try {
        const data = {
            textQuery: hotel?.name
        }
        const resp = await GetPlaceDetails(data);
        const places = resp.data.places;
        if (
            places &&
            places[0] &&
            places[0].photos &&
            places[0].photos.length > 0
        ) {
            // Use the 4th photo if available, otherwise the first
            const photoIdx = places[0].photos[3] ? 3 : 0;
            const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', places[0].photos[photoIdx].name);
            setPhotoUrl(PhotoUrl);
        } else {
            setPhotoUrl(null); // fallback to placeholder
        }
    } catch (error) {
        setPhotoUrl(null); // fallback to placeholder
        // Optionally log error: console.error(error);
    }
}
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.name + "," + hotel?.address} target='_blank'>

            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8'>
                <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                <div className='my-2'>
                    <h2 className='font-medium'>{hotel?.name}</h2>
                    <h2 className='text-xs text-gray-500'>📍{hotel?.address}</h2>
                    <h2 className='text-sm'>💰{hotel?.price}</h2>
                    <h2 className='text-sm'>⭐{hotel?.rating}</h2>

                </div>
            </div></Link>
    )
}

export default HotelCardItem