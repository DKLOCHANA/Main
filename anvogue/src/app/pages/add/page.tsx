'use client'
import React, { useState } from "react";

const AddProductPage: React.FC = () => {
    // State for the product attributes
    const [product, setProduct] = useState({
        id: "",
        category: "",
        type: "",
        name: "",
        gender: "",
        new: false,
        sale: false,
        rate: "",
        price: "",
        originPrice: "",
        brand: "",
        sold: "",
        quantity: "",
        quantityPurchase: "",
        sizes: "",
        variation: "",
        thumbImage: "",
        images: "",
        description: "",
        action: "",
        slug: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Product added successfully!");
        setProduct({
            id: "",
            category: "",
            type: "",
            name: "",
            gender: "",
            new: false,
            sale: false,
            rate: "",
            price: "",
            originPrice: "",
            brand: "",
            sold: "",
            quantity: "",
            quantityPurchase: "",
            sizes: "",
            variation: "",
            thumbImage: "",
            images: "",
            description: "",
            action: "",
            slug: "",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="id" value={product.id} onChange={handleChange} placeholder="ID" className="input-field" required />
                        <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="input-field" />
                        <input type="text" name="type" value={product.type} onChange={handleChange} placeholder="Type" className="input-field" />
                        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" className="input-field" />
                        <input type="text" name="gender" value={product.gender} onChange={handleChange} placeholder="Gender" className="input-field" />
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="new" checked={product.new} onChange={handleChange} />
                                New
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" name="sale" checked={product.sale} onChange={handleChange} />
                                Sale
                            </label>
                        </div>
                        <input type="number" name="rate" value={product.rate} onChange={handleChange} placeholder="Rate" className="input-field" />
                        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="input-field" />
                        <input type="number" name="originPrice" value={product.originPrice} onChange={handleChange} placeholder="Original Price" className="input-field" />
                        <input type="text" name="brand" value={product.brand} onChange={handleChange} placeholder="Brand" className="input-field" />
                        <input type="number" name="sold" value={product.sold} onChange={handleChange} placeholder="Sold" className="input-field" />
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} placeholder="Quantity" className="input-field" />
                        <input type="number" name="quantityPurchase" value={product.quantityPurchase} onChange={handleChange} placeholder="Quantity Purchase" className="input-field" />
                        <input type="text" name="sizes" value={product.sizes} onChange={handleChange} placeholder="Sizes (comma-separated)" className="input-field" />
                        <input type="text" name="variation" value={product.variation} onChange={handleChange} placeholder="Variation (comma-separated)" className="input-field" />
                        <input type="text" name="thumbImage" value={product.thumbImage} onChange={handleChange} placeholder="Thumbnail Image (comma-separated URLs)" className="input-field" />
                        <input type="text" name="images" value={product.images} onChange={handleChange} placeholder="Images (comma-separated URLs)" className="input-field" />
                        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="input-field h-20"></textarea>
                        <input type="text" name="action" value={product.action} onChange={handleChange} placeholder="Action" className="input-field" />
                        <input type="text" name="slug" value={product.slug} onChange={handleChange} placeholder="Slug" className="input-field" />
                    </div>
                    <button type="submit" className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
