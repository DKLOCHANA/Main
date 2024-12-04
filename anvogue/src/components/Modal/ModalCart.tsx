'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from '@/type/ProductType';
import { useModalCartContext } from '@/context/ModalCartContext'
import { useCart } from '@/context/CartContext'
import { countdownTime } from '@/store/countdownTime'
import CountdownTimeType from '@/type/CountdownType';
import FetchProducts from '@/context/FetchProducts';

const ModalCart = ({ serverTimeLeft }: { serverTimeLeft: CountdownTimeType }) => {
    const [timeLeft, setTimeLeft] = useState(serverTimeLeft);
    const [products, setProducts] = useState<ProductType[]>([]); // State for fetched products



    const [activeTab, setActiveTab] = useState<string | undefined>('');
    const { isModalOpen, closeModalCart } = useModalCartContext();
    const { cartState, addToCart, removeFromCart, updateCart } = useCart();

    const handleAddToCart = (productItem: ProductType) => {
        if (!cartState.cartArray.find(item => item.id === productItem.id)) {
            addToCart({ ...productItem });
            updateCart(productItem.id, productItem.quantityPurchase, '', '');
        } else {
            updateCart(productItem.id, productItem.quantityPurchase, '', '');
        }
    };

    const handleActiveTab = (tab: string) => {
        setActiveTab(tab);
    };

    let moneyForFreeship = 150;
    let [totalCart, setTotalCart] = useState<number>(0);

    cartState.cartArray.map(item => totalCart += item.price * item.quantity);

    return (
        <div className={`modal-cart-block`} onClick={closeModalCart}>
            <div
                className={`modal-cart-main flex ${isModalOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="left w-1/2 border-r border-line py-6 max-md:hidden">
                    <div className="heading5 px-6 pb-3">You May Also Like</div>
                    <div className="list px-6">
                        {products.slice(0, 4).map((product) => (
                            <div key={product.id} className='item py-5 flex items-center justify-between gap-3 border-b border-line'>
                                <div className="infor flex items-center gap-5">
                                    <div className="bg-img">
                                        <Image
                                            src={product.images[0]}
                                            width={300}
                                            height={300}
                                            alt={product.name}
                                            className='w-[100px] aspect-square flex-shrink-0 rounded-lg'
                                        />
                                    </div>
                                    <div>
                                        <div className="name text-button">{product.name}</div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="product-price text-title">${product.price}.00</div>
                                            <div className="product-origin-price text-title text-secondary2"><del>${product.originPrice}.00</del></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="text-xl bg-white w-10 h-10 rounded-xl border border-black flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                >
                                    <Icon.Handbag />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Remaining cart details and checkout UI */}
            </div>
        </div>
    );
};

export default ModalCart;
