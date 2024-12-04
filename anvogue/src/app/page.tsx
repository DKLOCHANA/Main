'use client';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TopNavOne from '@/components/Header/TopNav/TopNavOne'
import MenuOne from '@/components/Header/Menu/MenuOne'
import SliderOne from '@/components/Slider/SliderOne'
import WhatNewOne from '@/components/Home1/WhatNewOne'
//import productData from '@/data/Product.json'
import Collection from '@/components/Home1/Collection'
import TabFeatures from '@/components/Home1/TabFeatures'
import Benefit from '@/components/Home1/Benefit'
import testimonialData from '@/data/Testimonial.json'
import Testimonial from '@/components/Home1/Testimonial'
import Instagram from '@/components/Home1/Instagram'
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType';
import { useSearchParams } from 'next/navigation';



export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const gender = searchParams.get('gender');
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        console.log(data);  // Ensure the API returns data in the correct format
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <TopNavOne props="style-one bg-black" slogan="Free Shipping For Today orders" />
      <div id="header" className='relative w-full'>
        <MenuOne props="bg-transparent" />
        <SliderOne />
      </div>
      <WhatNewOne data={products} start={0} limit={4} />
      <Collection />
      <TabFeatures data={products} start={0} limit={6} />
      <Benefit props="md:py-20 py-10" />
      <Testimonial data={testimonialData} limit={6} />
      <Instagram />

      <Footer />

    </>
  )
}
