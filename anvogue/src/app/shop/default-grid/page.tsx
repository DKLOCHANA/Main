'use client'
import React from 'react';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import MenuOne from '@/components/Header/Menu/MenuOne';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb1';
import Footer from '@/components/Footer/Footer';
import FetchProducts from '@/context/FetchProducts';

export default function DefaultGrid() {
    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
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
