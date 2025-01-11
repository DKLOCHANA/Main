'use client'
import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'

import MenuOne from '@/components/Header/Menu/MenuOne'

import Default from '@/components/Product/Detail/Default';
import Footer from '@/components/Footer/Footer'
import { ProductType } from '@/type/ProductType'
import FetchProducts from '@/context/FetchProducts';

const ProductDefault = () => {
    const searchParams = useSearchParams();
    const [productData] = useState<ProductType[]>([]);
    let productId = searchParams.get('id')

    if (productId === null) {
        productId = '1'
    }

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-white" />
            </div>

            <Suspense fallback={<div>Loading product...</div>}>
                <Default data={productData} productId={productId} />
            </Suspense>

            <Footer />
        </>
    )
}
const ProductDefaultPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        < ProductDefault />
        <Footer />
    </Suspense>
);

export default ProductDefaultPage;
