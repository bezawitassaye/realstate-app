import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import 'swiper/swiper-bundle.css';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchListing(id);
    }, [id]);

    const fetchListing = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:5019/api/list/fech/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setFormData(response.data.listing);
            setLoading(false); // Update loading state
        } catch (error) {
            console.error('Fetch listing error:', error);
            // Handle error scenario
        }
    };

    const renderSwiper = () => {
        if (formData.imageUrls && formData.imageUrls.length > 0) {
            return (
                <Swiper navigation>
                    {formData.imageUrls.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="h-[550px] bg-cover bg-center"
                                style={{ backgroundImage: `url(${url})` }}
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
            {loading ? (
                <div>Loading...</div>
            ) : (
                renderSwiper()
            )}
        </div>
    );
};

export default Listing;
