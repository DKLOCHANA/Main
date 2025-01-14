'use client';
import React, { useState } from "react";
import axios from "axios";
import MenuOne from "@/components/Header/Menu/MenuOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", formData);
            alert(response.data.message);
            setFormData({ username: "", email: "", password: "" });
        } catch (err: any) {
            alert(err.response.data.error || "Registration failed");
        }
    };

    return (
        <><div id="header" className='relative w-full'>
            <MenuOne props="bg-transparent" />
            <Breadcrumb heading='Welcome' subHeading='register' />
        </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            className="input-field border border-gray-300 rounded-lg w-full px-4 py-2 mb-4"
                            required />
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
                            Register
                        </button>
                    </form>
                </div>
            </div>
            <Footer /></>
    );
};

export default RegisterPage;