'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';

const Instagram = () => {
    return (
        <>
            <div className="instagram-block md:pt-25 pt-10">
                <div className="container">
                    <div className="heading">
                        <div className="heading3 text-center">Anvogue On Instagram</div>
                        <div className="text-center mt-3">#Anvougetheme</div>
                    </div>
                    <div className="list-instagram md:mt-10 mt-6 mb-6 md:mb-10">
                        <Swiper
                            spaceBetween={12}
                            slidesPerView={2}
                            loop={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 4000,
                            }}
                            breakpoints={{
                                500: {
                                    slidesPerView: 2,
                                    spaceBetween: 16,
                                },
                                680: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 16,
                                },
                                1200: {
                                    slidesPerView: 5,
                                    spaceBetween: 16,
                                },
                            }}
                        >



                            <SwiperSlide>
                                <Link href={'https://www.instagram.com/veirdo.in/'} target='_blank' className="item relative block rounded-[32px] overflow-hidden">
                                    <Image
                                        src={'https://veirdo.in/cdn/shop/files/Artboard_3.jpg?v=1726318080&width=360'}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-full duration-500 relative'
                                    />
                                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                                        <div className="icon-instagram text-2xl text-black"></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={'https://www.instagram.com/veirdo.in/'} target='_blank' className="item relative block rounded-[32px] overflow-hidden">
                                    <Image
                                        src={'https://veirdo.in/cdn/shop/files/imgpsh_fullsize_anim_1_b22f59f0-c48c-4c86-80c7-d128ec22fd27.png?v=1727529624&width=360'}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-full duration-500 relative'
                                    />
                                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                                        <div className="icon-instagram text-2xl text-black"></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={'https://www.instagram.com/veirdo.in/'} target='_blank' className="item relative block rounded-[32px] overflow-hidden">
                                    <Image
                                        src={'https://veirdo.in/cdn/shop/files/Artboard_49.png?v=1727525673&width=360'}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-full duration-500 relative'
                                    />
                                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                                        <div className="icon-instagram text-2xl text-black"></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={'https://www.instagram.com/veirdo.in/'} target='_blank' className="item relative block rounded-[32px] overflow-hidden">
                                    <Image
                                        src={'https://veirdo.in/cdn/shop/files/Artboard_37.jpg?v=1727412535&width=360'}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-full duration-500 relative'
                                    />
                                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                                        <div className="icon-instagram text-2xl text-black"></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                            <SwiperSlide>
                                <Link href={'https://www.instagram.com/veirdo.in/'} target='_blank' className="item relative block rounded-[32px] overflow-hidden">
                                    <Image
                                        src={'https://veirdo.in/cdn/shop/files/imgpsh_fullsize_anim_1e90004b-e4c6-4fbe-bbdd-d0f43b333728.png?v=1727529563&width=360'}
                                        width={300}
                                        height={300}
                                        alt='1'
                                        className='h-full w-full duration-500 relative'
                                    />
                                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                                        <div className="icon-instagram text-2xl text-black"></div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Instagram