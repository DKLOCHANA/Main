import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

const Chat: React.FC = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

    useEffect(() => {
        // Connect to the WebSocket server
        socket = io('http://localhost:5000');

        // Listen for incoming messages
        socket.on('receiveMessage', (newMessage: string) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Listen for the updated user list
        socket.on('userList', (users: string[]) => {
            setConnectedUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const joinChat = () => {
        if (username.trim()) {
            socket.emit('join', username);
        }
    };

    const sendMessage = () => {
        if (message.trim()) {
            const formattedMessage = `${username}: ${message}`;
            socket.emit('sendMessage', formattedMessage);
            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
            setMessage('');
        }
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.userList}>
                <h3>Connected Users</h3>
                <ul>
                    {connectedUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.chatBox}>
                {!username ? (
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
                            {messages.map((msg, index) => (
                                <p key={index} style={styles.message}>
                                    {msg}
                                </p>
                            ))}
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
        padding: '20px',
        gap: '20px',
        height: '500px',
    },
    userList: {
        flex: '1',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
    },
    chatBox: {
        flex: '2',
        display: 'flex',
        flexDirection: 'column' as const,
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '10px',
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
        marginBottom: '10px',
    },
    messageInput: {
        display: 'flex',
        gap: '10px',
    },
    input: {
        flex: '1',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    message: {
        padding: '5px',
        margin: '5px 0',
        borderBottom: '1px solid #ddd',
    },
};

export default Chat;
