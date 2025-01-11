'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname } from 'next/navigation';
import Product from '@/components/Product/Product';
import FetchProducts from '@/context/FetchProducts';
import useLoginPopup from '@/store/useLoginPopup';
import useMenuMobile from '@/store/useMenuMobile';
import { useModalCartContext } from '@/context/ModalCartContext';
import { useModalWishlistContext } from '@/context/ModalWishlistContext';
import { useModalSearchContext } from '@/context/ModalSearchContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { ProductType } from '@/type/ProductType';

interface Props {
    props: string;
}

const MenuOne: React.FC<Props> = ({ props }) => {
    const router = useRouter()
    const pathname = usePathname()
    let [selectedType, setSelectedType] = useState<string | null>()
    const { openLoginPopup, handleLoginPopup } = useLoginPopup()
    const { openMenuMobile, handleMenuMobile } = useMenuMobile()
    const [openSubNavMobile, setOpenSubNavMobile] = useState<number | null>(null)
    const { openModalCart } = useModalCartContext()
    const { cartState } = useCart()
    const { openModalWishlist } = useModalWishlistContext()
    const { openModalSearch } = useModalSearchContext()
    const [productData] = useState<ProductType[]>([]);

    const handleOpenSubNavMobile = (index: number) => {
        setOpenSubNavMobile(openSubNavMobile === index ? null : index)
    }

    const [fixedHeader, setFixedHeader] = useState(false)
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setFixedHeader(scrollPosition > 0 && scrollPosition < lastScrollPosition);
            setLastScrollPosition(scrollPosition);
        };

        // Gắn sự kiện cuộn khi component được mount
        window.addEventListener('scroll', handleScroll);

        // Hủy sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);



    return (
        <>
            <div className={`header-menu style-one ${fixedHeader ? 'fixed' : 'absolute'} top-0 left-0 right-0 w-full md:h-[74px] h-[56px] ${props}`}>
                <div className="container mx-auto h-full">
                    <div className="header-main flex justify-between h-full">
                        <div className="menu-mobile-icon lg:hidden flex items-center" onClick={handleMenuMobile}>
                            <i className="icon-category text-2xl"></i>
                        </div>
                        <div className="left flex items-center gap-6">
                            <Link href={'/'} className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                <div className="heading4">Anvogue</div>
                            </Link>
                            <div className="menu-main h-full max-lg:hidden">
                                <ul className='flex items-center gap-8 h-full'>


                                    <li className='h-full'>
                                        <Link
                                            href="#!"
                                            className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/shop/')}`}
                                        >
                                            Shop
                                        </Link>
                                        <div className="mega-menu absolute top-[74px] left-0 bg-white w-full">
                                            <div className="container">
                                                <div className="flex justify-between py-8">
                                                    <div className="nav-link basis-2/3 grid grid-cols-4 gap-y-8">
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Shop Layout</div>
                                                            <ul>

                                                                <li>
                                                                    <Link
                                                                        href={'/shop/default-grid'}
                                                                        className={`link text-secondary duration-300 cursor-pointer ${pathname === '/shop/default-grid'}`}
                                                                    >
                                                                        Shop Default Grid
                                                                    </Link>
                                                                </li>




                                                                <li>
                                                                    <Link
                                                                        href={'/checkout2'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/checkout2'}`}
                                                                    >
                                                                        Checkout Style 2
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="nav-item">
                                                            <div className="text-button-uppercase pb-2">Products Pages</div>
                                                            <ul>
                                                                <li>
                                                                    <Link
                                                                        href={'/wishlist'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/wishlist'}`}
                                                                    >
                                                                        Wish List
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/search-result'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/search-result'}`}
                                                                    >
                                                                        Search Result
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/cart'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/cart'}`}
                                                                    >
                                                                        Shopping Cart
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/login'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/login'}`}
                                                                    >
                                                                        Login/Register
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link
                                                                        href={'/forgot-password'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/forgot-password'}`}
                                                                    >
                                                                        Forgot Password
                                                                    </Link>
                                                                </li>

                                                                <li>
                                                                    <Link
                                                                        href={'/my-account'}
                                                                        className={`link text-secondary duration-300 ${pathname === '/my-account'}`}
                                                                    >
                                                                        My Account
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                    <li className='h-full relative'>
                                        <Link href="#!" className={`text-button-uppercase duration-300 h-full flex items-center justify-center ${pathname.includes('/pages')}`}>
                                            Pages
                                        </Link>
                                        <div className="sub-menu py-3 px-5 -left-10 absolute bg-white rounded-b-xl">
                                            <ul className='w-full'>
                                                <li>
                                                    <Link href="/pages/about" className={`link text-secondary duration-300 ${pathname === '/pages/about'}`}>
                                                        About Us
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/pages/contact" className={`link text-secondary duration-300 ${pathname === '/pages/contact'}`}>
                                                        Contact Us
                                                    </Link>
                                                </li>


                                                <li>
                                                    <Link href="/pages/faqs" className={`link text-secondary duration-300 ${pathname === '/pages/faqs'}`}>
                                                        FAQs
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/pages/customer-feedbacks" className={`link text-secondary duration-300 ${pathname === '/pages/customer-feedbacks'}`}>
                                                        Customer Feedbacks
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right flex gap-12">
                            <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                <Icon.MagnifyingGlass size={24} color='black' onClick={openModalSearch} />
                                <div className="line absolute bg-line w-px h-6 -right-6"></div>
                            </div>
                            <div className="list-action flex items-center gap-4">
                                <div className="user-icon flex items-center justify-center cursor-pointer">
                                    <Icon.User size={24} color='black' onClick={handleLoginPopup} />
                                    <div
                                        className={`login-popup absolute top-[74px] w-[320px] p-7 rounded-xl bg-white box-shadow-sm 
                                            ${openLoginPopup ? 'open' : ''}`}
                                    >
                                        <Link href={'/login'} className="button-main w-full text-center">Login</Link>
                                        <div className="text-secondary text-center mt-3 pb-4">Don’t have an account?
                                            <Link href={'/register'} className='text-black pl-1 hover:underline'>Register</Link>
                                        </div>

                                    </div>
                                </div>
                                <div className="max-md:hidden wishlist-icon flex items-center cursor-pointer" onClick={openModalWishlist}>
                                    <Icon.Heart size={24} color='black' />
                                </div>
                                <div className="cart-icon flex items-center relative cursor-pointer" onClick={openModalCart}>
                                    <Icon.Handbag size={24} color='black' />
                                    <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">{cartState.cartArray.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="menu-mobile" className={`${openMenuMobile ? 'open' : ''}`}>
                <div className="menu-container bg-white h-full">
                    <div className="container h-full">
                        <div className="menu-main h-full overflow-hidden">
                            <div className="heading py-2 relative flex items-center justify-center">
                                <div
                                    className="close-menu-mobile-btn absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                                    onClick={handleMenuMobile}
                                >
                                    <Icon.X size={14} />
                                </div>
                                <Link href={'/'} className="logo text-3xl font-semibold text-center">
                                    Anvogue
                                </Link>
                            </div>

                            <div className="list-nav mt-6">
                                <ul>
                                    <li>
                                        <Link
                                            href={'/shop/default-grid'}
                                            className={`link text-secondary duration-300 ${pathname === '/shop/default-grid'}`}
                                        >
                                            Shop Default Grid
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href="/checkout2"
                                            className={`link text-secondary duration-300 ${pathname === '/checkout2'}`}
                                        >
                                            Checkout Style 2
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/wishlist"
                                            className={`link text-secondary duration-300 ${pathname === '/wishlist'}`}
                                        >
                                            Wish List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/search-result"
                                            className={`link text-secondary duration-300 ${pathname === '/search-result'}`}
                                        >
                                            Search Result
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/cart"
                                            className={`link text-secondary duration-300 ${pathname === '/cart'}`}
                                        >
                                            Shopping Cart
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/login"
                                            className={`link text-secondary duration-300 ${pathname === '/login'}`}
                                        >
                                            Login/Register
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/forgot-password"
                                            className={`link text-secondary duration-300 ${pathname === '/forgot-password'}`}
                                        >
                                            Forgot Password
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/my-account"
                                            className={`link text-secondary duration-300 ${pathname === '/my-account'}`}
                                        >
                                            My Account
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pages/about"
                                            className={`link text-secondary duration-300 ${pathname === '/pages/about'}`}
                                        >
                                            About Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pages/contact"
                                            className={`link text-secondary duration-300 ${pathname === '/pages/contact'}`}
                                        >
                                            Contact Us
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pages/faqs"
                                            className={`link text-secondary duration-300 ${pathname === '/pages/faqs'}`}
                                        >
                                            FAQs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/pages/customer-feedbacks"
                                            className={`link text-secondary duration-300 ${pathname === '/pages/customer-feedbacks'}`}
                                        >
                                            Customer Feedbacks
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default MenuOne