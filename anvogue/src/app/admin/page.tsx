'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";

const AdminLoginPage: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { username, password } = formData;

        // Check if the email and password are both 'admin'
        if (username === 'admin' && password === 'admin') {
            router.push('pages/admin');  // Redirect to /admin page
        } else {
            alert('Unauthorized access');  // Show alert for incorrect login
            router.push('/');  // Redirect to homepage after alert
        }
    };

    return (
        <>


            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="User Name"
                            className="input-field border border-gray-300 rounded-lg w-full px-4 py-2 mb-4"
                            required />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="input-field border border-gray-300 rounded-lg w-full px-4 py-2 mb-4"
                            required />
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-3 rounded-lg"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default AdminLoginPage;
