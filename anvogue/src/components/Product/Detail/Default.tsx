'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Link from 'next/link'
import { ProductType } from '@/type/ProductType'
import Product from '../Product'
import Rate from '@/components/Other/Rate'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Scrollbar } from 'swiper/modules';
import 'swiper/css/bundle';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import SwiperCore from 'swiper/core';
import { useCart } from '@/context/CartContext'
import { useModalCartContext } from '@/context/ModalCartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useModalWishlistContext } from '@/context/ModalWishlistContext'
import ModalSizeguide from '@/components/Modal/ModalSizeguide'
import { useRouter } from 'next/navigation';
import { TestimonialType } from '@/type/TestimonialType'

SwiperCore.use([Navigation, Thumbs]);

interface Props {
    data: Array<ProductType>
    productId: string | number | null
}

const Default: React.FC<Props> = ({ data, productId }) => {
    const swiperRef: any = useRef();
    const [photoIndex, setPhotoIndex] = useState(0)
    const [openPopupImg, setOpenPopupImg] = useState(false)
    const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [activeColor, setActiveColor] = useState<string>('')
    const [activeSize, setActiveSize] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string | undefined>('description')
    const { addToCart, updateCart, cartState } = useCart()
    const { openModalCart } = useModalCartContext()
    const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist()
    const { openModalWishlist } = useModalWishlistContext()
    const router = useRouter();
    const [productMain, setProductMain] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // let productMain = data.find(product => product.id === productId) as ProductType
    // if (productMain === undefined) {
    //     productMain = data[0]
    // }
    const [feedbacks, setFeedbacks] = useState<TestimonialType[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const product = await response.json();
                setProductMain(product); // Update state with fetched product
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductById();
    }, [productId]); // Add productId as a dependency

    useEffect(() => {
        if (productMain) {
            console.log(productMain); // Log the updated productMain
        }
    }, [productMain]);

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
                    description: item.comment || 'No description provided',
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

    if (loading) {
        return <p>Loading product...</p>;
    }

    if (!productMain) {
        return <p>Product not found.</p>;
    }

    const percentSale = Math.floor(100 - ((productMain!.price / productMain!.originPrice) * 100))

    const handleOpenSizeGuide = () => {
        setOpenSizeGuide(true);
    };

    const handleCloseSizeGuide = () => {
        setOpenSizeGuide(false);
    };

    const handleSwiper = (swiper: SwiperCore) => {
        // Do something with the thumbsSwiper instance
        setThumbsSwiper(swiper);
    };

    const handleActiveColor = (item: string) => {
        setActiveColor(item)

        // Find variation with selected color
        const foundColor = productMain.variation.find((variation) => variation.color === item);
        // If found, slide next to img
        if (foundColor) {
            const index = productMain.images.indexOf(foundColor.image);

            if (index !== -1) {
                swiperRef.current?.slideTo(index);
            }
        }
    }

    const handleActiveSize = (item: string) => {
        setActiveSize(item)
    }

    const handleIncreaseQuantity = () => {
        productMain!.quantityPurchase += 1
        updateCart(productMain!.id, productMain!.quantityPurchase + 1, activeSize, activeColor);
    };

    const handleDecreaseQuantity = () => {
        if (productMain!.quantityPurchase > 1) {
            productMain!.quantityPurchase -= 1
            updateCart(productMain!.id, productMain!.quantityPurchase - 1, activeSize, activeColor);
        }
    };

    const handleAddToCart = () => {
        if (!cartState.cartArray.find(item => item.id === productMain!.id)) {
            addToCart({ ...productMain! });
            updateCart(productMain!.id, productMain!.quantityPurchase, activeSize, activeColor)
        } else {
            updateCart(productMain!.id, productMain!.quantityPurchase, activeSize, activeColor)
        }
        openModalCart()
    };

    const handleAddToWishlist = () => {
        // if product existed in wishlit, remove from wishlist and set state to false
        if (wishlistState.wishlistArray.some(item => item.id === productMain!.id)) {
            removeFromWishlist(productMain!.id);
        } else {
            // else, add to wishlist and set state to true
            addToWishlist(productMain!);
        }
        openModalWishlist();
    };
    const handleBuyNow = () => {
        if (!cartState.cartArray.find(item => item.id === productMain!.id)) {
            addToCart({ ...productMain! });
            updateCart(productMain!.id, productMain!.quantityPurchase, activeSize, activeColor)
        } else {
            updateCart(productMain!.id, productMain!.quantityPurchase, activeSize, activeColor)
        }
        router.push('/checkout2');
    };






    return (
        <>
            <div className="product-detail default">
                <div className="featured-product underwear md:py-20 py-10">
                    <div className="container flex justify-between gap-y-6 flex-wrap">
                        <div className="list-img md:w-1/2 md:pr-[45px] w-full">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={0}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Thumbs]}
                                className="mySwiper2 rounded-2xl overflow-hidden"
                            >
                                {productMain.images.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                        onClick={() => {
                                            swiperRef.current?.slideTo(index);
                                            setOpenPopupImg(true)
                                        }}
                                    >
                                        <Image
                                            src={item}
                                            width={1000}
                                            height={1000}
                                            alt='prd-img'
                                            className='w-full aspect-[3/4] object-cover'
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={(swiper) => {
                                    handleSwiper(swiper)
                                }}
                                spaceBetween={0}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                {productMain.images.map((item, index) => (
                                    <SwiperSlide
                                        key={index}
                                    >
                                        <Image
                                            src={item}
                                            width={1000}
                                            height={1000}
                                            alt='prd-img'
                                            className='w-full aspect-[3/4] object-cover rounded-xl'
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className={`popup-img ${openPopupImg ? 'open' : ''}`}>
                                <span
                                    className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
                                    onClick={() => {
                                        setOpenPopupImg(false)
                                    }}
                                >
                                    <Icon.X className="text-3xl text-white" />
                                </span>
                                <Swiper
                                    spaceBetween={0}
                                    slidesPerView={1}
                                    modules={[Navigation, Thumbs]}
                                    navigation={true}
                                    loop={true}
                                    className="popupSwiper"
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper
                                    }}
                                >
                                    {productMain.images.map((item, index) => (
                                        <SwiperSlide
                                            key={index}
                                            onClick={() => {
                                                setOpenPopupImg(false)
                                            }}
                                        >
                                            <Image
                                                src={item}
                                                width={1000}
                                                height={1000}
                                                alt='prd-img'
                                                className='w-full aspect-[3/4] object-cover rounded-xl'
                                                onClick={(e) => {
                                                    e.stopPropagation(); // prevent
                                                }}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                            <div className="flex justify-between">
                                <div>
                                    <div className="caption2 text-secondary font-semibold uppercase">{productMain.type}</div>
                                    <div className="heading4 mt-1">{productMain.name}</div>
                                </div>
                                <div
                                    className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ${wishlistState.wishlistArray.some(item => item.id === productMain.id) ? 'active' : ''}`}
                                    onClick={handleAddToWishlist}
                                >
                                    {wishlistState.wishlistArray.some(item => item.id === productMain.id) ? (
                                        <>
                                            <Icon.Heart size={24} weight='fill' className='text-white' />
                                        </>
                                    ) : (
                                        <>
                                            <Icon.Heart size={24} />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center mt-3">
                                <Rate currentRate={productMain.rate} size={14} />
                                <span className='caption1 text-secondary'>(5294 reviews)</span>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                                <div className="product-price heading5">${productMain.price}.00</div>
                                <div className='w-px h-4 bg-line'></div>
                                <div className="product-origin-price font-normal text-secondary2"><del>${productMain.originPrice}.00</del></div>
                                {productMain.originPrice && (
                                    <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                                        -{percentSale}%
                                    </div>
                                )}
                                <div className='desc text-secondary mt-3'>{productMain.description}</div>
                            </div>
                            <div className="list-action mt-6">
                                <div className="choose-color">
                                    <div className="text-title">Colors: <span className='text-title color'>{activeColor}</span></div>
                                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                                        {productMain.variation.map((item, index) => (
                                            <div
                                                className={`color-item w-12 h-12 rounded-xl duration-300 relative ${activeColor === item.color ? 'active' : ''}`}
                                                key={index}
                                                datatype={item.image}
                                                onClick={() => {
                                                    handleActiveColor(item.color)
                                                }}
                                            >
                                                <Image
                                                    src={item.colorImage}
                                                    width={100}
                                                    height={100}
                                                    alt='color'
                                                    className='rounded-xl'
                                                />
                                                <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                                                    {item.color}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="choose-size mt-5">
                                    <div className="heading flex items-center justify-between">
                                        <div className="text-title">Size: <span className='text-title size'>{activeSize}</span></div>
                                        <div
                                            className="caption1 size-guide text-red underline cursor-pointer"
                                            onClick={handleOpenSizeGuide}
                                        >
                                            Size Guide
                                        </div>
                                        <ModalSizeguide data={productMain} isOpen={openSizeGuide} onClose={handleCloseSizeGuide} />
                                    </div>
                                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                                        {productMain.sizes.map((item, index) => (
                                            <div
                                                className={`size-item ${item === 'freesize' ? 'px-3 py-2' : 'w-12 h-12'} flex items-center justify-center text-button rounded-full bg-white border border-line ${activeSize === item ? 'active' : ''}`}
                                                key={index}
                                                onClick={() => handleActiveSize(item)}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-title mt-5">Quantity:</div>
                                <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                                    <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                                        <Icon.Minus
                                            size={20}
                                            onClick={handleDecreaseQuantity}
                                            className={`${productMain.quantityPurchase === 1 ? 'disabled' : ''} cursor-pointer`}
                                        />
                                        <div className="body1 font-semibold">{productMain.quantityPurchase}</div>
                                        <Icon.Plus
                                            size={20}
                                            onClick={handleIncreaseQuantity}
                                            className='cursor-pointer'
                                        />
                                    </div>
                                    <div onClick={handleAddToCart} className="button-main w-full text-center bg-white text-black border border-black">Add To Cart</div>
                                </div>
                                <div className="button-block mt-5">
                                    <div onClick={handleBuyNow} className="button-main w-full text-center">Buy It Now</div>
                                </div>

                                <div className="more-infor mt-6">

                                    <div className="flex items-center gap-1 mt-3">

                                        <div className="text-title">Estimated Delivery:</div>
                                        <div className="text-secondary">14 January - 18 January</div>
                                    </div>

                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Categories:</div>
                                        <div className="text-secondary">{productMain.category}, {productMain.gender}</div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-3">
                                        <div className="text-title">Tag:</div>
                                        <div className="text-secondary">{productMain.type}</div>
                                    </div>
                                </div>
                                <div className="list-payment mt-7">
                                    <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full">
                                        <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">Guranteed safe checkout</div>

                                        <div className="item flex items-center justify-center lg:px-3 px-3">
                                            <Image
                                                src={'/images/payment/payment.png'}
                                                width={500}
                                                height={450}
                                                alt='payment'
                                                className='w-full'
                                            />
                                        </div>


                                    </div>
                                </div>
                            </div>
                            <div className="get-it mt-6 pb-8 border-b border-line">
                                <div className="heading5">Get it today</div>
                                <div className="item flex items-center gap-3 mt-4">
                                    <div className="icon-delivery-truck text-4xl"></div>
                                    <div>
                                        <div className="text-title">Free shipping</div>
                                        <div className="caption1 text-secondary mt-1">Free shipping on orders over $75.</div>
                                    </div>
                                </div>
                                <div className="item flex items-center gap-3 mt-4">
                                    <div className="icon-phone-call text-4xl"></div>
                                    <div>
                                        <div className="text-title">Support everyday</div>
                                        <div className="caption1 text-secondary mt-1">Support from 8:30 AM to 10:00 PM everyday</div>
                                    </div>
                                </div>
                                <div className="item flex items-center gap-3 mt-4">
                                    <div className="icon-return text-4xl"></div>
                                    <div>
                                        <div className="text-title">100 Day Returns</div>
                                        <div className="caption1 text-secondary mt-1">Not impressed? Get a refund. You have 100 days to break our hearts.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center heading6 mt-4">About This Product</div>
                <br></br>
                <div className="text-center">{productMain.description}</div>
                <br></br>

                <div className="desc-tab md:pb-20 pb-10">

                    <div className="container">



                        <div className="desc-block mt-8">
                            <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-10 mt-6">
                                <div className="item">
                                    <div className="icon-delivery-truck text-4xl"></div>
                                    <div className="heading6 mt-4">Shipping Faster</div>
                                    <div className="text-secondary mt-2">Use on walls, furniture, doors and many more surfaces. The possibilities are endless.</div>
                                </div>
                                <div className="item">
                                    <div className="icon-cotton text-4xl"></div>
                                    <div className="heading6 mt-4">Cotton Material</div>
                                    <div className="text-secondary mt-2">Use on walls, furniture, doors and many more surfaces. The possibilities are endless.</div>
                                </div>
                                <div className="item">
                                    <div className="icon-guarantee text-4xl"></div>
                                    <div className="heading6 mt-4">High Quality</div>
                                    <div className="text-secondary mt-2">Use on walls, furniture, doors and many more surfaces. The possibilities are endless.</div>
                                </div>
                                <div className="item">
                                    <div className="icon-leaves-compatible text-4xl"></div>
                                    <div className="heading6 mt-4">highly compatible</div>
                                    <div className="text-secondary mt-2">Use on walls, furniture, doors and many more surfaces. The possibilities are endless.</div>
                                </div>
                            </div>


                        </div>




                    </div>
                </div>
                <div className="review-block md:py-20 py-10 bg-surface">
                    <div className="container">
                        <div className="heading flex items-center justify-between flex-wrap gap-4">
                            <div className="heading4">Customer Review</div>
                            <Link href={'#form-review'} className='button-main bg-white text-black border border-black'>Write Reviews</Link>
                        </div>
                        <div className="top-overview flex justify-between py-6 max-md:flex-col gap-y-6">
                            <div className="rating lg:w-1/4 md:w-[30%] lg:pr-[75px] md:pr-[35px]">
                                <div className="heading flex items-center justify-center flex-wrap gap-3 gap-y-4">
                                    <div className="text-display">4.6</div>
                                    <div className='flex flex-col items-center'>
                                        <Rate currentRate={5} size={18} />
                                        <div className='text-secondary text-center mt-1'>(1,968 Ratings)</div>
                                    </div>
                                </div>
                                <div className="list-rating mt-3">
                                    <div className="item flex items-center justify-between gap-1.5">
                                        <div className="flex items-center gap-1">
                                            <div className="caption1">5</div>
                                            <Icon.Star size={14} weight='fill' />
                                        </div>
                                        <div className="progress bg-line relative w-3/4 h-2">
                                            <div className="progress-percent absolute bg-yellow w-[50%] h-full left-0 top-0"></div>
                                        </div>
                                        <div className="caption1">50%</div>
                                    </div>
                                    <div className="item flex items-center justify-between gap-1.5 mt-1">
                                        <div className="flex items-center gap-1">
                                            <div className="caption1">4</div>
                                            <Icon.Star size={14} weight='fill' />
                                        </div>
                                        <div className="progress bg-line relative w-3/4 h-2">
                                            <div className="progress-percent absolute bg-yellow w-[20%] h-full left-0 top-0"></div>
                                        </div>
                                        <div className="caption1">20%</div>
                                    </div>
                                    <div className="item flex items-center justify-between gap-1.5 mt-1">
                                        <div className="flex items-center gap-1">
                                            <div className="caption1">3</div>
                                            <Icon.Star size={14} weight='fill' />
                                        </div>
                                        <div className="progress bg-line relative w-3/4 h-2">
                                            <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                                        </div>
                                        <div className="caption1">10%</div>
                                    </div>
                                    <div className="item flex items-center justify-between gap-1.5 mt-1">
                                        <div className="flex items-center gap-1">
                                            <div className="caption1">2</div>
                                            <Icon.Star size={14} weight='fill' />
                                        </div>
                                        <div className="progress bg-line relative w-3/4 h-2">
                                            <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                                        </div>
                                        <div className="caption1">10%</div>
                                    </div>
                                    <div className="item flex items-center justify-between gap-1.5 mt-1">
                                        <div className="flex items-center gap-2">
                                            <div className="caption1">1</div>
                                            <Icon.Star size={14} weight='fill' />
                                        </div>
                                        <div className="progress bg-line relative w-3/4 h-2">
                                            <div className="progress-percent absolute bg-yellow w-[10%] h-full left-0 top-0"></div>
                                        </div>
                                        <div className="caption1">10%</div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-img lg:w-3/4 md:w-[70%] lg:pl-[15px] md:pl-[15px]">
                                <div className="heading5">All Image (128)</div>
                                <div className="list md:mt-6 mt-3">
                                    <Swiper
                                        spaceBetween={16}
                                        slidesPerView={3}
                                        modules={[Navigation]}
                                        breakpoints={{
                                            576: {
                                                slidesPerView: 4,
                                                spaceBetween: 16,
                                            },
                                            640: {
                                                slidesPerView: 5,
                                                spaceBetween: 16,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 16,
                                            },
                                            992: {
                                                slidesPerView: 5,
                                                spaceBetween: 20,
                                            },
                                            1100: {
                                                slidesPerView: 5,
                                                spaceBetween: 20,
                                            },
                                            1290: {
                                                slidesPerView: 7,
                                                spaceBetween: 20,
                                            },
                                        }}
                                    >
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={'/images/product/1000x1000.png'}
                                                width={400}
                                                height={400}
                                                alt=''
                                                className='w-[120px] aspect-square object-cover rounded-lg'
                                            />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="list-review">
                            {feedbacks.map((item) => (
                                <div key={item.id} className="item flex max-lg:flex-col gap-y-4 w-full py-6 border-t border-line">
                                    <div className="left lg:w-1/4 w-full lg:pr-[15px]">
                                        <div className="user mt-3">
                                            {/* Use the dynamic feedback name */}
                                            <div className="text-title">{item.name}</div>
                                            <div className="flex items-center gap-2">
                                                {/* Display the date dynamically, you can format it if needed */}
                                                <div className="text-secondary2">{item.date || 'Unknown date'}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right lg:w-3/4 w-full lg:pl-[15px]">
                                        {/* Render the rating dynamically */}
                                        <Rate currentRate={item.star} size={16} />
                                        <div className="heading5 mt-3">{item.title}</div> {/* Title */}
                                        <div className="body1 mt-3">{item.description}</div> {/* Description */}
                                        <div className="action mt-3">
                                            {/* Optional actions */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="form-review" className='form-review pt-6'>
                            <div className="heading4">Leave A comment</div>
                            <form className="grid sm:grid-cols-2 gap-4 gap-y-5 mt-6">
                                <div className="name ">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="username" type="text" placeholder="Your Name *" required />
                                </div>
                                <div className="mail ">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="email" type="email" placeholder="Your Email *" required />
                                </div>
                                <div className="name ">
                                    <input className="border-line px-4 pt-3 pb-3 w-full rounded-lg" id="title" type="Title" placeholder="Message Title *" required />
                                </div>
                                <div className="col-span-full message">
                                    <textarea className="border border-line px-4 py-3 w-full rounded-lg" id="message" name="message" placeholder="Your message *" required></textarea>
                                </div>
                                <div className="col-span-full flex items-start -mt-2 gap-2">
                                    <input type="checkbox" id="saveAccount" name="saveAccount" className='mt-1.5' />
                                    <label className="" htmlFor="saveAccount">Save my name, email, and website in this browser for the next time I comment.</label>
                                </div>
                                <div className="col-span-full sm:pt-3">
                                    <button className='button-main bg-white text-black border border-black'>Submit Reviews</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <br></br>





            </div>
        </>
    )
}

export default Default