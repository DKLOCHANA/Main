'use client';
import React from 'react';

import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const PrivacyPolicy = () => {
    return (
        <>

            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Privacy Policy" subHeading="Your Data, Our Responsibility" />
            </div>
            <div className="policy md:pt-20 pt-10">
                <div className="policy-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <p className="p1"><b>PRIVACY POLICY</b></p>
                                <p className="p3">
                                    At Horizonexo, your privacy is our top priority. This policy outlines how we collect, use, and protect your personal information.
                                </p><br></br>
                                <p className="p2"><b>1. Information We Collect</b></p>
                                <ul className="ul1">
                                    <li className="li4">Personal Information: Name, email address, phone number, shipping and billing address.</li>
                                    <li className="li4">Payment Information: Credit card details and other payment methods (processed securely).</li>
                                    <li className="li4">Browsing Data: IP address, device information, and website interaction history.</li>
                                </ul><br></br>
                                <p className="p2"><b>2. How We Use Your Information</b></p>
                                <ul className="ul1">
                                    <li className="li4">To process and fulfill orders.</li>
                                    <li className="li4">To communicate with you regarding orders, promotions, and updates.</li>
                                    <li className="li4">To improve our website and customer experience.</li>
                                    <li className="li4">To comply with legal requirements.</li>
                                </ul><br></br>
                                <p className="p2"><b>3. Protecting Your Information</b></p>
                                <p className="p3">
                                    We implement industry-standard security measures to protect your personal data from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                                </p><br></br>
                                <p className="p2"><b>4. Sharing Your Information</b></p>
                                <ul className="ul1">
                                    <li className="li4">We do not sell or rent your personal information to third parties.</li>
                                    <li className="li4">We may share your information with trusted service providers to help us operate our business, such as payment processors or shipping companies.</li>
                                    <li className="li4">We may disclose your information to comply with legal obligations or protect our rights.</li>
                                </ul><br></br>
                                <p className="p2"><b>5. Your Rights</b></p>
                                <ul className="ul1">
                                    <li className="li4">You have the right to access, update, or delete your personal information.</li>
                                    <li className="li4">You can opt out of receiving marketing communications by clicking the Unsubscribe link in our emails.</li>
                                </ul><br></br>
                                <p className="p2"><b>6. Cookies</b></p>
                                <p className="p3">
                                    Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device to collect and analyze data about your website activity.
                                </p><br></br>
                                <p className="p2"><b>7. Changes to This Policy</b></p>
                                <p className="p3">
                                    We may update this privacy policy from time to time. Changes will be posted on this page with the updated date.
                                </p><br></br>
                                <p className="p2"><b>8. Contact Us</b></p>
                                <p className="p3">
                                    If you have any questions or concerns about this policy, please contact us at:
                                    <br />
                                    Email: <span className="s1">contact@horizonexo.com</span>
                                </p><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
