'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import TestimonialItem from '../Testimonial/TestimonialItem';
import { TestimonialType } from '@/type/TestimonialType';

interface Props {
    limit: number;
}

const Testimonial: React.FC<Props> = ({ limit }) => {
    const [feedbacks, setFeedbacks] = useState<TestimonialType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews/');
                const data = response.data.map((item: any) => ({
                    id: item.id, // Use the existing `id` field
                    category: item.category || 'General',
                    title: item.title || 'Customer Feedback', // Adjusted title
                    name: item.customerName,
                    avatar: item.thumbImage?.[0] || '/default-avatar.png', // Use the first image or a default
                    date: item.date, // Replace with actual date if available
                    address: item.address, // Add address if available in your data
                    description: item.comment || 'No00 description provided',
                    images: item.images || [],
                    star: item.rating || 4, // Use `rate` for the rating
                }));
                setFeedbacks(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch feedbacks');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);// Empty dependency array ensures this runs only once when the component mounts

    if (loading) {
        return <div>Loading...</div>;  // Display a loading message while fetching data
    }

    if (error) {
        return <div>Error: {error}</div>;  // Display an error message if the fetch fails
    }

    return (
        <div className="testimonial-block md:py-20 py-10 bg-surface">
            <div className="container">
                <div className="heading3 text-center">
                    What People Are Saying
                </div>

                <div className="list-testimonial pagination-mt40 md:mt-10 mt-6">
                    <Swiper
                        spaceBetween={12}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop={true}
                        modules={[Pagination, Autoplay]}
                        breakpoints={{
                            680: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {feedbacks.slice(0, limit).map((item) => (
                            <SwiperSlide key={item.id}>
                                <TestimonialItem data={item} type="style-one" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
