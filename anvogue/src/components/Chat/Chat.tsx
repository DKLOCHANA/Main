import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
// Adjust the path depending on the location of your file


let socket: Socket;

const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        socket = io('http://localhost:5000');
        socket.on('receiveMessage', (newMessage: string) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const joinChat = () => {
        if (username.trim()) {
            socket.emit('join', username);
            setIsJoined(true);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            const formattedMessage = `${username}: ${message}`;
            socket.emit('sendMessage', formattedMessage);

            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {!isJoined ? (
                    <div className="join-container">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                        <button onClick={joinChat} className="button">
                            Join Chat
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="messages">
                            {messages.map((msg, index) => {
                                const isSent = msg.startsWith(username); // Check if the message is sent by the user
                                return (
                                    <div
                                        key={index}
                                        className={isSent ? 'sentMessage' : 'receivedMessage'}
                                    >
                                        <div className="messageBubble">
                                            {msg}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="message-input">
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input"
                            />
                            <button onClick={sendMessage} className="button">
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Chat;
