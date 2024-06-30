import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import {Swiper,SwiperSlide} from "swiper/react";
import SwiperCore from "swiper";
import {Navigation} from "swiper/modules"
import 'swiper/css/bundle'
import {
    // eslint-disable-next-line no-unused-vars
    FaBath,FaBed,FaChair,FaMapMarkedAlt,FaMapMarkerAlt,FaParking,FaShare,
  } from 'react-icons/fa';
const Listing = () => {
    SwiperCore.use([Navigation])
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [listing, setListing] = useState({});
    const [formData, setFormData] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchListing(id);
      }, [id]);
      const fetchListing = async (id) => {
        try {
          const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
          const response = await axios.get(`http://localhost:5019/api/list/fech/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data)
          setListing(response.data.listing);
          setFormData(response.data.listing);
          setLoading(false); // Update loading state
        } catch (error) {
          console.error('Fetch listing error:', error);
          // Handle error scenario
        }
      };
      {console.log(formData)}
      const renderSwiper = () => {
        if (formData.imageUrls && formData.imageUrls.length > 0) {
            return (
                <Swiper navigation>
                    {formData.imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="h-[550px] "
                                style={{
                                    background: `url(${url}) center no-repeat`,
                                    
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            );
        } else {
            return <div>Loading images...</div>; // or handle loading state
        }
    };

    return (
        <div>
            {renderSwiper()}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {formData.name} - ${' '}
              {formData.offer
                ? formData.discountPrice.toLocaleString('en-US')
                : formData.regularPrice.toLocaleString('en-US')}
              {formData.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {formData.address}
            </p>
            <div className="flex gap-4">
                <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md"
                >
               
                    {formData.type === "Rent"?"For Rent":"For sell"}
                </p>
                {
                    formData.Offer &&(
                        <p className="bg-green-900 w-full max-w-[200px] text-white text-center 
                        p-1 rounded-md">
                            ${+formData.regularPrice - formData.discountPrice}
                        </p>
                    )
                }
                
            </div>
            <p className="text-slate-800"
                >
                    <span className="font-semibold text-black">
                       Description -
                    </span>
                     {formData.description}</p>

                     <ul className="flex gap-6">
                        <li className="flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm">
                            <FaBed className="text-lg"/>
                            {formData.bedrooms} bed
                        </li>
                        <li className="flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm">
                            <FaBath className="text-lg"/>
                            {formData.bathrooms} bath room</li>

                        <li className="flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm">
                            <FaParking className="text-lg"/> 
                            {formData.Parking?"Has Parking":"No parking"}</li>
                        <li className="flex items-center gap-1 whitespace-nowrap text-green-900 font-semibold text-sm">
                             <FaChair className="text-lg"/>
                            {formData.Furnished?"Furnished":"Not Furnished"}</li>
                     </ul>
            
            </div>
        </div>
    );
}


export default Listing