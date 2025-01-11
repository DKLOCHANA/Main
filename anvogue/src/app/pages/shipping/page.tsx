'use client';
import React from 'react';

import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const ShippingPolicy = () => {
    return (
        <>

            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Shipping Policy" subHeading="Know About Our Shipping Process" />
            </div>
            <div className="shipping md:pt-20 pt-10">
                <div className="shipping-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <p className="p1"><b>SHIPPING POLICY</b></p>
                                <br />
                                <p className="p2"><b>1. Shipping Timeframes</b></p>
                                <br />
                                <p className="p3">
                                    Orders are typically processed within <span className="s1">1-3 business days</span>. Delivery times vary depending on your location and the shipping option selected:
                                    <ul className="ul1">
                                        <li className="li4">Standard Shipping: 10-20 business days</li>
                                        <li className="li4">Express Shipping: 5-10 business days</li>
                                    </ul>
                                </p>
                                <br />
                                <p className="p2"><b>2. Shipping Costs</b></p>
                                <br />
                                <p className="p3">
                                    Shipping costs depend on the weight and destination of the package. The total shipping cost will be calculated and displayed during checkout.
                                </p>
                                <br />
                                <p className="p2"><b>3. Tracking Information</b></p>
                                <br />
                                <p className="p3">
                                    Once your order is shipped, a tracking number will be emailed to you. You can use this number to monitor the delivery progress on the carrier’s website.
                                </p>
                                <br />
                                <p className="p2"><b>4. International Shipping</b></p>
                                <br />
                                <p className="p3">
                                    We offer international shipping to many countries. Please note that customs duties and taxes may apply and are the responsibility of the customer.
                                </p>
                                <br />
                                <p className="p2"><b>5. Delayed or Lost Packages</b></p>
                                <br />
                                <p className="p3">
                                    If your package is delayed, please allow additional time as some factors, like customs clearance, are beyond our control. If your package is confirmed lost, we will work with the carrier to resolve the issue and resend the order if necessary.
                                </p>
                                <br />
                                <p className="p2"><b>6. Incorrect Address</b></p>
                                <br />
                                <p className="p3">
                                    Please ensure that the shipping address is correct when placing your order. We are not responsible for packages delivered to incorrect addresses provided by the customer.
                                </p>
                                <br />
                                <p className="p2"><b>7. Contact Us</b></p>
                                <br />
                                <p className="p3">
                                    If you have any questions about our shipping policy, please contact us at:
                                    <br />
                                    Email: <span className="s1">contact@horizonexo.com</span>
                                </p><br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ShippingPolicy;
