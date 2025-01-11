'use client';
import React from 'react';
import MenuOne from '@/components/Header/Menu/MenuOne';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Footer from '@/components/Footer/Footer';

const TermsOfService = () => {
    return (
        <>

            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Terms of Service" subHeading="Understand Your Rights and Responsibilities" />
            </div>
            <div className="terms md:pt-20 pt-10">
                <div className="terms-block">
                    <div className="container">
                        <div className="text flex items-center justify-center">
                            <div className="content md:w-5/6 w-full">
                                <p className="p1"><b>TERMS OF SERVICE</b></p>
                                <br />
                                <p className="p2"><b>1. Introduction</b></p>
                                <br />
                                <p className="p3">
                                    Welcome to Horizonexo. By accessing or using our website, you agree to be bound by these terms of service. If you do not agree, please do not use our site.
                                </p>
                                <br />
                                <p className="p2"><b>2. Use of Our Website</b></p>
                                <br />
                                <ul className="ul1">
                                    <li className="li4">You must be at least 18 years old to use our services.</li>
                                    <li className="li4">You agree not to misuse our website, including attempting unauthorized access or spreading malicious software.</li>
                                    <li className="li4">We reserve the right to terminate your access if you violate these terms.</li>
                                </ul>
                                <br />
                                <p className="p2"><b>3. Products and Services</b></p>
                                <br />
                                <p className="p3">
                                    We strive to ensure accurate descriptions and availability of products. However, we do not guarantee that product descriptions or other content on the site are error-free, complete, or current.
                                </p>
                                <br />
                                <p className="p2"><b>4. Payment and Pricing</b></p>
                                <br />
                                <ul className="ul1">
                                    <li className="li4">All payments are processed securely using industry-standard methods.</li>
                                    <li className="li4">We reserve the right to change product prices without prior notice.</li>
                                    <li className="li4">In case of pricing errors, we may cancel the order and issue a refund.</li>
                                </ul>
                                <br />
                                <p className="p2"><b>5. Intellectual Property</b></p>
                                <br />
                                <p className="p3">
                                    All content, including text, graphics, logos, and software, is the property of Horizonexo and is protected by copyright and trademark laws. Unauthorized use is prohibited.
                                </p>
                                <br />
                                <p className="p2"><b>6. Limitation of Liability</b></p>
                                <br />
                                <p className="p3">
                                    Horizonexo is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our website or services.
                                </p>
                                <br />
                                <p className="p2"><b>7. Governing Law</b></p>
                                <br />
                                <p className="p3">
                                    These terms are governed by and construed in accordance with the laws of the jurisdiction where our company is registered.
                                </p>
                                <br />
                                <p className="p2"><b>8. Changes to These Terms</b></p>
                                <br />
                                <p className="p3">
                                    We may update these terms from time to time. Continued use of our website implies acceptance of the updated terms.
                                </p>
                                <br />
                                <p className="p2"><b>9. Contact Us</b></p>
                                <br />
                                <p className="p3">
                                    If you have any questions or concerns about these terms, please contact us at:
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

export default TermsOfService;
