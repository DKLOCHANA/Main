'use client'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Chat from '@/components/Chat/Chat';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import React from 'react';


const ChatPage: React.FC = () => {
    return (
        <div>
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
                <Breadcrumb heading="Customer Chat" subHeading="Chat" />
            </div>
            <Chat />
            <Footer />
        </div>
    );
};

export default ChatPage;
