'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ProductType } from '@/type/ProductType';

interface ProductContextType {
    products: ProductType[];
    loading: boolean;
    error: string | null;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
            } catch (err) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};
