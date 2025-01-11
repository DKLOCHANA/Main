'use client'
import { useState } from 'react';

const ReviewPage = () => {
    const [formData, setFormData] = useState({
        name: '',

        title: '',
        message: '',
        rating: 0,
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRatingChange = (rating: number) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!formData.name || !formData.title || !formData.message || formData.rating === 0) {
            setErrorMessage('All fields are required');
            return;
        }

        setErrorMessage('');
        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage('Review submitted successfully!');
                setFormData({ name: '', title: '', message: '', rating: 0 }); // Reset form
            } else {
                setErrorMessage(result.message || 'Something went wrong!');
            }
        } catch (error) {
            setErrorMessage('Error submitting review. Please try again.');
        }
    };

    return (
        <div>
            <h2>Leave A Comment</h2>
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name *"
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Message Title *"
                        required
                    />
                </div>
                <div>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message *"
                        required
                    />
                </div>
                <div>
                    <label>Rating: </label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleRatingChange(star)}
                                style={{
                                    cursor: 'pointer',
                                    color: formData.rating >= star ? 'gold' : 'gray',
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <button type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewPage;
