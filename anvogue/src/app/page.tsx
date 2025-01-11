'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import MenuOne from '@/components/Header/Menu/MenuOne';
import WhatNewOne from '@/components/Home1/WhatNewOne';
import Collection from '@/components/Home1/Collection';
import TabFeatures from '@/components/Home1/TabFeatures';
import Benefit from '@/components/Home1/Benefit';
import Testimonial from '@/components/Home1/Testimonial';
import Instagram from '@/components/Home1/Instagram';
import Footer from '@/components/Footer/Footer';
import { ProductType } from '@/type/ProductType';
import { useSearchParams } from 'next/navigation';
import { TestimonialType } from '@/type/TestimonialType';
import SliderOne from '@/components/Home1/SliderOne';

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<TestimonialType[]>([]);



  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);  // Set fetched products
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;  // Display loading state
  if (error) return <p>{error}</p>;  // Display error message if something goes wrong

  return (
    <>

      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <SliderOne />
      </div>

      {/* Conditional rendering if products are fetched successfully */}
      {products.length > 0 ? (
        <>
          <WhatNewOne data={products} start={0} limit={4} />
          <Collection />
          <TabFeatures data={products} start={0} limit={6} />
        </>
      ) : (
        <p>No products available at the moment.</p>  // Display if no products are fetched
      )}

      <Benefit props="md:py-20 py-10" />
      <Testimonial limit={6} />
      <Instagram />
      <Footer />
    </>
  );
}
