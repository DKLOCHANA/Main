import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductType } from '@/type/ProductType';

interface FetchProductsProps {
    render: (products: ProductType[]) => JSX.Element;
}

const FetchProducts: React.FC<FetchProductsProps> = ({ render }) => {
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

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return <>{render(products)}</>;
};

export default FetchProducts;
