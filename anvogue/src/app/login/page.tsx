'use client';
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState<string>("");

    const router = useRouter(); // Use router for navigation

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset error on each submit attempt

        try {
            const response = await axios.post("http://localhost:5000/api/login", formData);
            localStorage.setItem("token", response.data.token); // Store the token in localStorage
            alert(response.data.message);
            setFormData({ email: "", password: "" }); // Reset the form data
            router.push("/"); // Redirect to the homepage after successful login
        } catch (err: any) {
            if (err.response) {
                setError(err.response.data.error); // Show backend error message
            } else if (err.request) {
                setError("No response from server. Please check your internet connection.");
            } else {
                setError("Something went wrong! Please try again.");
            }
        }
    };

    return (
        <>
            <MenuOne props="bg-transparent" />
            <Breadcrumb heading='Welcome' subHeading='register' />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
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

                        >
                            Login
                        </button>
                    </form>
                </div>
            </div><Footer /></>
    );
};

export default LoginPage;
