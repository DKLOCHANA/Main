'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';

const Checkout = () => {
    const { openModalCart } = useModalCartContext();
    const { cartState } = useCart();
    const [totalCart, setTotalCart] = useState<number>(0);

    // Calculate total price whenever the cart changes
    useEffect(() => {
        const total = cartState.cartArray.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalCart(total);
    }, [cartState.cartArray]);

    return (
        <>
            <div id="header" className="relative w-full">
                <div className={`header-menu style-one fixed top-0 left-0 right-0 w-full md:h-[74px] h-[56px]`}>
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full">
                            <Link href={'/'} className="flex items-center">
                                <div className="heading4">Anvogue</div>
                            </Link>
                            <button
                                className="max-md:hidden cart-icon flex items-center relative h-fit cursor-pointer"
                                onClick={openModalCart}
                            >
                                <Icon.Handbag size={24} color="black" />
                                <span className="quantity cart-quantity absolute -right-1.5 -top-1.5 text-xs text-white bg-black w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartState.cartArray.length}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="checkout-block relative md:pt-[74px] pt-[56px]">
                <div className="content-main flex max-lg:flex-col-reverse justify-between">
                    <div className="left flex lg:justify-end w-full">
                        <div className="lg:max-w-[716px] flex-shrink-0 w-full lg:pt-20 pt-12 lg:pr-[70px] pl-[16px] max-lg:pr-[16px]">
                            {/* Form content */}
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault(); // Prevent form submission
                                    alert("Order placed successfully"); // Show alert

                                    // Clear all input fields
                                    const inputs = document.querySelectorAll("input");
                                    inputs.forEach((input) => (input.value = ""));
                                    window.location.href = "/";
                                }}
                            >
                                <div className="login flex justify-between gap-4">
                                    <h4 className="heading4">Contact</h4>
                                    <Link href={"/login"} className="text-button underline">
                                        Login here
                                    </Link>
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="border-line mt-5 px-4 py-3 w-full rounded-lg"
                                        placeholder="Email or mobile phone number"
                                        required
                                    />
                                    <div className="flex items-center mt-5"></div>
                                </div>
                                <div className="information md:mt-10 mt-6">
                                    <div className="heading5">Delivery</div>
                                    <div className="form-checkout mt-5">
                                        <div className="grid sm:grid-cols-2 gap-4 gap-y-5 flex-wrap">
                                            <div>
                                                <input
                                                    className="border-line px-4 py-3 w-full rounded-lg"
                                                    id="firstName"
                                                    type="text"
                                                    placeholder="First Name (optional)"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="border-line px-4 py-3 w-full rounded-lg"
                                                    id="lastName"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-full relative">
                                                <input
                                                    className="border-line pl-4 pr-12 py-3 w-full rounded-lg"
                                                    id="address"
                                                    type="text"
                                                    placeholder="Address"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="border-line px-4 py-3 w-full rounded-lg"
                                                    id="apartment"
                                                    type="text"
                                                    placeholder="Apartment, suite,etc.(optional)"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="border-line px-4 py-3 w-full rounded-lg"
                                                    id="city"
                                                    type="text"
                                                    placeholder="City"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    className="border-line px-4 py-3 w-full rounded-lg"
                                                    id="zipcode"
                                                    type="text"
                                                    placeholder="Zip Code"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="payment-block md:mt-10 mt-6">
                                            <h4 className="heading4">Payment</h4>
                                            <p className="body1 text-secondary2 mt-3">
                                                All transactions are secure and encrypted.
                                            </p>
                                            <div className="list-payment mt-5">
                                                <div className="item">
                                                    <div className="type flex items-center justify-between bg-linear p-5 border border-black rounded-t-lg">
                                                        <strong className="text-title">Credit Card</strong>
                                                        <Icon.CreditCard className="text-2xl" />
                                                    </div>
                                                    <div className="form_payment grid grid-cols-2 gap-4 gap-y-5 p-5 rounded-b-lg bg-surface">
                                                        <div className="col-span-full relative">
                                                            <input
                                                                className="border-line pl-4 pr-12 py-3 w-full rounded-lg"
                                                                id="cardNumbers"
                                                                type="text"
                                                                placeholder="Card Numbers"
                                                                required
                                                            />
                                                            <Icon.LockSimple className="text-xl text-secondary absolute top-1/2 -translate-y-1/2 right-5" />
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                className="border-line px-4 py-3 w-full rounded-lg"
                                                                id="expirationDate"
                                                                type="text"
                                                                placeholder="Expiration date (MM /YY)"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="relative">
                                                            <input
                                                                className="border-line pl-4 pr-12 py-3 w-full rounded-lg"
                                                                id="securityCode"
                                                                type="text"
                                                                placeholder="Security code"
                                                                required
                                                            />
                                                            <Icon.Question className="text-xl text-secondary absolute top-1/2 -translate-y-1/2 right-5" />
                                                        </div>
                                                        <div className="col-span-full relative">
                                                            <input
                                                                className="border-line px-4 py-3 w-full rounded-lg"
                                                                id="cardName"
                                                                type="text"
                                                                placeholder="Name On Card"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block-button md:mt-10 mt-6 flex justify-center">
                                            <button
                                                type="submit"
                                                className="bg-black text-white px-6 py-3 rounded-lg"
                                            >
                                                Pay Now
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </form>;

                        </div>
                    </div>
                    <div className="right justify-start flex-shrink-0 lg:w-[47%] bg-surface lg:py-20 py-12">
                        <div className="lg:sticky lg:top-24 h-fit lg:max-w-[606px] w-full flex-shrink-0 lg:pl-[80px] pr-[16px] max-lg:pl-[16px]">
                            <div className="list_prd flex flex-col gap-7">
                                {cartState.cartArray.length > 0 ? (
                                    cartState.cartArray.map((item, index) => (
                                        <div className="item flex items-center justify-between w-full pb-2 border-b border-line gap-6 mt-1" key={index}>
                                            <div className="flex items-center gap-6">
                                                <div className="bg_img relative flex-shrink-0 w-[100px] h-[100px]">
                                                    <Image
                                                        src={item.images[0]}
                                                        width={80}
                                                        height={80}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                    <span className="quantity flex items-center justify-center absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black text-white">
                                                        {item.quantity}
                                                    </span>


                                                </div>

                                                {
                                                    <div>
                                                        <strong className="name text-title">{item.name}</strong>

                                                    </div>
                                                }

                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <del className="caption1 text-secondary text-end org_price">${item.originPrice}.00</del>
                                                <strong className="text-title price">${item.price}.00</strong>
                                            </div>

                                        </div>

                                    )
                                    )

                                ) : (
                                    <div className="empty-cart-message text-center text-secondary">
                                        Your cart is empty.
                                    </div>
                                )}
                            </div>

                            <div className="ship-block py-5 flex justify-between border-b border-line">
                                <strong className="heading6">Subtotal</strong>
                                <strong className="heading6">${totalCart.toFixed(2)}</strong>
                            </div>
                            <div className="total-cart-block flex items-center justify-between mt-4">
                                <strong className="heading4">Total</strong>
                                <div className="flex items-end gap-2">
                                    <span className="body1 text-secondary">USD</span>
                                    <strong className="heading4">${totalCart.toFixed(2)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;