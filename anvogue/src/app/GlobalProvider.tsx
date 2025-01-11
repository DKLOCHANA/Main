import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'

import { ModalSearchProvider } from '@/context/ModalSearchContext'
import { ModalQuickviewProvider } from '@/context/ModalQuickviewContext'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CartProvider>
            <ModalCartProvider>
                <WishlistProvider>
                    <ModalWishlistProvider>

                        <ModalSearchProvider>
                            <ModalQuickviewProvider>
                                {children}
                            </ModalQuickviewProvider>
                        </ModalSearchProvider>

                    </ModalWishlistProvider>
                </WishlistProvider>
            </ModalCartProvider>
        </CartProvider>
    )
}

export default GlobalProvider