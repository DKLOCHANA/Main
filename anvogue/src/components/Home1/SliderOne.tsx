

import React, { Component } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';


const SliderOne = () => {
    return (
        <>
            <div className="slider-block style-one bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
                <div className="slider-main h-full w-full">


                    <div className="slider-item h-full w-full relative">
                        <div className="container w-full h-full flex items-center relative">
                            <div className="text-content basis-1/2">
                                <div className="text-sub-display">Sale! Up To 50% Off!</div>
                                <div className="text-display md:mt-5 mt-2">Summer Sale Collections</div>
                                <Link href='/shop/default-grid' className="button-main md:mt-8 mt-3">Shop Now</Link>
                            </div>
                            <div className="sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0">
                                <Image
                                    src={'https://veirdo.in/cdn/shop/files/15_01.jpg?v=1728649504&width=360'}
                                    width={670}
                                    height={600

                                    }
                                    alt='bg1-1'
                                    priority={true}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SliderOne