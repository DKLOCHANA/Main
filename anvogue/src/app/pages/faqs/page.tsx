'use client'
import React, { useState } from 'react'
import MenuOne from '@/components/Header/Menu/MenuOne'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer'
import * as Icon from "@phosphor-icons/react/dist/ssr";

const Faqs = () => {
    const [activeTab, setActiveTab] = useState<string | undefined>('how to buy')
    const [activeQuestion, setActiveQuestion] = useState<string | undefined>('')

    const handleActiveTab = (tab: string) => {
        setActiveTab(tab)
    }

    const handleActiveQuestion = (question: string) => {
        setActiveQuestion(prevQuestion => prevQuestion === question ? undefined : question)
    }

    return (
        <>

            <div id="header" className='relative w-full'>
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading='FAQs' subHeading='FAQs' />
            </div>
            <div className='faqs-block md:py-20 py-10'>
                <div className="container">
                    <div className="flex justify-between">
                        <div className="right ">
                            <div className={`tab-question flex flex-col gap-5 ${activeTab === 'how to buy' ? 'active' : ''}`}>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '1' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('1')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">How do I know that my order has been successfully submitted?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">You will receive an email confirmation containing the Order Number and details of your purchase.</div>
                                </div>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '2' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('2')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">How is my order shipped?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">Orders are shipped during regular business days, excluding holidays. Any orders placed on Saturday or Sunday will be shipped the following Monday.</div>
                                </div>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '3' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('3')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">Can I change or cancel my order?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">If you wish to change or cancel your order, you are allowed to do so only before your item has been shipped. If your item&apos;s shipping label has already been created or if it&apos;s already been shipped, then you must wait to receive the order and pay to ship it back to us. Please contact us via our support page. </div>
                                </div>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '4' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('4')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">When can I expect to receive my shipment?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">All orders are shipped from our warehouse within 3-5 business days of the order being placed. Shipments typically arrive in between 10-20 business days after the shipment date, depending on the availability of the carrier provider and location. We do apologize that shipment delay may occur if the shipment requires Customs clearance or inspection, or transportation delay caused by carrier service.</div>
                                </div>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '5' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('5')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">What are your shipping rates?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">The shipping rates will vary depending on the product and the destination. </div>
                                </div>
                                <div
                                    className={`question-item px-7 py-5 rounded-[20px] overflow-hidden border border-line cursor-pointer ${activeQuestion === '6' ? 'open' : ''}`}
                                    onClick={() => handleActiveQuestion('6')}
                                >
                                    <div className="heading flex items-center justify-between gap-6">
                                        <div className="heading6">How can I track my order?</div>
                                        <Icon.CaretRight size={24} />
                                    </div>
                                    <div className="content body1 text-secondary">A tracking number will be provided to you in your Shipping Confirmation email. You may use the number and self-track your order.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Faqs