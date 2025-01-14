'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const MyAccount = () => {
    const [activeTab, setActiveTab] = useState<string | undefined>('dashboard')
    const [user, setUser] = useState<{ name: string, email: string } | null>(null)
    const [error, setError] = useState<string>('')
    const router = useRouter()

    // Fetch user data
    const fetchUserData = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token is missing');
            return;
        }

        try {
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (err) {
            setError('Failed to fetch user data');
        }
    }

    // Use effect to fetch data on page load
    useEffect(() => {
        fetchUserData();
    }, [])

    // Handle password change
    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        // Implement password change logic here
    }

    // Handle account deletion
    const handleDeleteAccount = async () => {
        router.push('/');
    }

    return (
        <>
            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='My Account' subHeading='My Account' />
            </div>
            <div className="profile-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col w-full">
                        <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
                            <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl">
                                <div className="heading flex flex-col items-center justify-center">
                                    <div className="name heading6 mt-4 text-center">{user?.name || 'kasun'}</div>
                                    <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1">{user?.email || 'Kasun@gmail.com'}</div>
                                </div>
                                <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                                    <Link href={'#!'} scroll={false} className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${activeTab === 'setting' ? 'active' : ''}`} onClick={() => setActiveTab('setting')}>
                                        <Icon.GearSix size={20} />
                                        <strong className="heading6">MY Details</strong>
                                    </Link>
                                    <Link href={'/login'} className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5">
                                        <Icon.SignOut size={20} />
                                        <strong className="heading6">Logout</strong>
                                    </Link>
                                    <button onClick={handleDeleteAccount} className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 text-red-600">
                                        <Icon.Trash size={20} />
                                        <strong className="heading6">Delete Account</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="right md:w-2/3 w-full pl-2.5">
                            <div className={`tab text-content w-full p-7 border border-line rounded-xl ${activeTab === 'setting' ? 'active' : ''}`}>
                                <form onSubmit={handleChangePassword}>
                                    <div className="heading5 pb-4">Information</div>

                                    <div className='grid sm:grid-cols-2 gap-4 gap-y-5 mt-5'>
                                        <div className="first-name">
                                            <label htmlFor="firstName" className="caption1 capitalize">
                                                User Name <span className="text-red">*</span>
                                            </label>
                                            <input
                                                className="border-line mt-2 px-4 py-3 w-full rounded-lg"
                                                id="name"
                                                type="text"
                                                defaultValue={user?.name || 'kan'} // Display the current user's name
                                                placeholder='username'
                                                required
                                            />
                                        </div>

                                        <div className="email">
                                            <label htmlFor="email" className='caption1 capitalize'>Email Address <span className='text-red'>*</span></label>
                                            <input className="border-line mt-2 px-4 py-3 w-full rounded-lg" id="email" type="email" defaultValue={user?.email || 'n@gmail.com'} placeholder="Email address" required />
                                        </div>
                                    </div>


                                    <div className="block-button lg:mt-10 mt-6">
                                        <button
                                            className="button-main"
                                            onClick={() => alert('Your details have been successfully updated!')}
                                        >
                                            Save Change
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyAccount
