'use client';
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useModalCartContext } from '@/context/ModalCartContext';
import Image from 'next/image';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';
import CountdownTimeType from '@/type/CountdownType';

const ModalCart = ({ serverTimeLeft }: { serverTimeLeft: CountdownTimeType }) => {
    const { isModalOpen, closeModalCart } = useModalCartContext();
    const { cartState, removeFromCart } = useCart();
    const router = useRouter(); // Initialize useRouter

    // Calculate total cart price
    const totalPrice = cartState.cartArray.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = () => {
        closeModalCart(); // Close the modal
        router.push('/checkout2'); // Navigate to the checkout page
    };


    return (
        <div className={`modal-cart-block`} onClick={closeModalCart}>
            <div
                className={`modal-cart-main flex ${isModalOpen ? 'open' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Right - Cart Items */}
                <div className="right w-1/2 p-6">
                    <h2 className="heading5">Your Cart</h2>
                    <div className="cart-items">
                        {cartState.cartArray.length > 0 ? (
                            cartState.cartArray.map((item) => (
                                <div key={item.id} className="cart-item flex items-center justify-between gap-3 border-b py-4">
                                    <Image
                                        src={item.images[0]}
                                        width={80}
                                        height={80}
                                        alt={item.name}
                                        className="rounded-lg"
                                    />
                                    <div className="flex-grow">
                                        <div className="text-button">{item.name}</div>
                                        <div className="text-sm">Qty: {item.quantity}</div>
                                        <div className="text-sm">Price: ${item.price}</div>
                                    </div>
                                    <Icon.Trash
                                        className="cursor-pointer"
                                        onClick={() => removeFromCart(item.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>

                    {/* Checkout Button */}
                    <div className="footer-modal p-6 border-t bg-white border-line absolute bottom-0 left-0 w-full text-center">
                        <div>Total: ${totalPrice.toFixed(2)}</div>
                        <button
                            className="bg-black text-white px-4 py-2 rounded-lg"
                            onClick={handleCheckout} // Updated handler
                        >
                            Checkout
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalCart;
