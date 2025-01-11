'use client'
import React from 'react';
import MenuOne from '@/components/Header/Menu/MenuOne';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import Footer from '@/components/Footer/Footer';
import FetchProducts from '@/context/FetchProducts';

export default function DefaultGrid() {
    return (
        <>

            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
            </div>

            {/* Fetch products and pass them to ShopBreadCrumb1 */}
            <FetchProducts render={(products) => (

                <ShopBreadCrumb1 data={products} productPerPage={9} dataType={undefined} gender={null} category={null} />
            )} />

            <Footer />
        </>
    );
}
