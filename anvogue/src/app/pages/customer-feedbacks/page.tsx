'use client'
import React, { useEffect, useState } from 'react';
import TestimonialItem from '@/components/Testimonial/TestimonialItem';
import { TestimonialType } from '@/type/TestimonialType';
import axios from 'axios';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const CustomerFeedbacks: React.FC = () => {
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
    }, []);

    if (loading) return <div>Loading feedbacks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <><div id="header" className='relative w-full'>
            <MenuOne props="bg-transparent" />
            <Breadcrumb heading='Customer Feedbacks' subHeading='Customer Feedbacks' />
        </div>
            <div className="customer-feedbacks md:py-20 py-10">
                <div className="container">
                    <div className="list-review grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-[30px] gap-5">
                        {feedbacks.map((feedback) => (
                            <TestimonialItem key={feedback.id} data={feedback} type="style-one" />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerFeedbacks;
