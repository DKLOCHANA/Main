import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

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
        <div style={styles.chatContainer}>
            <div style={styles.chatBox}>
                {!isJoined ? (
                    <div style={styles.joinContainer}>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                        />
                        <button onClick={joinChat} style={styles.button}>
                            Join Chat
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={styles.messages}>
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

                        <div style={styles.messageInput}>
                            <input
                                type="text"
                                placeholder="Type a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={styles.input}
                            />
                            <button onClick={sendMessage} style={styles.button}>
                                Send
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const styles = {
    chatContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        height: '100vh',
    },
    chatBox: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column' as const,
        border: '1px solid #ddd',
        borderRadius: '16px',
        backgroundColor: '#fff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    joinContainer: {
        marginTop: 'auto',
        marginBottom: 'auto',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    },
    messages: {
        flex: '1',
        overflowY: 'auto' as const,
        padding: '10px',
        gap: '10px',
    },
    messageInput: {
        display: 'flex',
        gap: '10px',
        padding: '10px',
        borderTop: '1px solid #ddd',
    },
    input: {
        flex: '1',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        fontSize: '14px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default Chat;

// CSS styles for Sent and Received Messages (include this in your main CSS file or as a separate style tag)
const messageStyles = `
    .sentMessage {
        display: flex;
        justify-content: flex-end; /* Align to the right */
        margin-bottom: 10px;
    }
    .sentMessage .messageBubble {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        word-wrap: break-word;
        display: inline-block;
        margin: 5px 0;
        background-color: #DCF8C6; /* WhatsApp-like green background */
        border-radius: 16px 16px 0 16px;
    }

    .receivedMessage {
        display: flex;
        justify-content: flex-start; /* Align to the left */
        margin-bottom: 10px;
    }
    .receivedMessage .messageBubble {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        word-wrap: break-word;
        display: inline-block;
        margin: 5px 0;
        background-color: #E5E5EA; /* WhatsApp-like light gray background */
        border-radius: 16px 16px 16px 0;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = messageStyles;
document.head.appendChild(styleSheet);
