'use client';
import React from 'react';

import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const Refund = () => {
    return (
        <>

            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Refund and Return Policy" subHeading="Refund and Return Policy" />
            </div>
            <div className="about md:pt-20 pt-10">
                <div className="about-us-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <p className="p1"><b>RETURNS & REFUNDS</b></p><br></br>
                                <p className="p3">
                                    We strive to deliver you the best in quality and value. If for any reason you are not
                                    satisfied with your order, we are happy to take back the product and issue you a full refund.
                                </p>
                                <ol className="ol1">
                                    <li>
                                        Products can only be returned if they are still in their <b>original condition</b> and packaging.
                                        Used products, or products damaged by the customer, will not be eligible for refund.
                                    </li>
                                    <li>
                                        <b>Request your Return Authorization Number</b> by emailing
                                        <span className="s1"> contact@horizonexo.com</span> with a detailed reason for return and pictures
                                        or a video of the product. Upon approval, you will receive the RA# and the address of the closest
                                        warehouse to mail the product.
                                    </li>
                                    <li>
                                        To assure your refund, please use a <b>trackable mail service</b>. We will not be responsible for
                                        lost or missing packages.
                                    </li>
                                    <li>
                                        Upon receipt of your package, your products will be examined, and a full refund will be issued to
                                        your original method of payment. A refund receipt will be emailed to the email address used for the purchase.
                                    </li>
                                </ol><br></br>
                                <p className="p2"><b>LATE OR MISSING REFUNDS</b></p><br></br>
                                <p className="p3">
                                    Please understand that refunds are issued immediately after approval. If you haven’t received your refund yet,
                                    first check your bank account. Then contact your credit card company, as it may take some time before the refund is posted.
                                    If you’ve done all of this and still haven’t received your refund, please contact us.
                                </p><br></br>
                                <p className="p2"><b>How long does delivery take?</b></p><br></br>
                                <p className="p3">
                                    All orders are shipped within <span className="s1">10-45 business days</span>. If your order hasn’t arrived within
                                    the estimated time, please contact our support team at contact<span className="s1">@horizonexo.com</span>.
                                </p>
                                <p className="p3">(This excludes errors made by customers when providing shipping details or missed parcel deliveries).</p><br></br>
                                <p className="p2"><b>Can you provide me with a tracking number?</b></p><br></br>
                                <p className="p3">Tracking numbers will be emailed as soon as they are available.</p><br></br>
                                <p className="p2"><b>I&apos;ve entered the wrong shipping address, can I change it?</b></p><br></br>
                                <p className="p3">
                                    Email us as soon as possible. We might be able to assist, but if the order has already entered the shipping process,
                                    we cannot stop it. We are not responsible for incomplete or incorrect shipping addresses provided by the customer.
                                </p><br></br>
                                <p className="p2"><b>Can I cancel my order after it has been placed?</b></p><br></br>
                                <p className="p3">
                                    Orders cannot be canceled once processed or shipped. If canceled before processing, a
                                    <span className="s1"> 15% cancellation fee</span> will apply.
                                </p><br></br>
                                <p className="p3"><b>Invalid reasons for cancellation:</b></p><br></br>
                                <ol className="ol1">
                                    <li>
                                        Buyer no longer wants the items. Buyers should ensure they are committed before submitting an order.
                                    </li>
                                    <li>
                                        Buyer found items cheaper elsewhere. Price comparisons should be done before placing an order.
                                    </li>
                                </ol><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Refund;
