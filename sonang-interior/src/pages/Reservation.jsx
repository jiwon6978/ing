import React, { useState } from 'react';
import './Reservation.css';

const Reservation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        service: 'residential',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your reservation request. We will contact you shortly.');
        setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            service: 'residential',
            message: ''
        });
    };

    return (
        <div className="reservation container fade-in">
            <div className="page-header">
                <h1>Book a Consultation</h1>
                <p>Let's discuss your vision and how we can bring it to life.</p>
            </div>

            <div className="reservation-content">
                <form className="reservation-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Preferred Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="service">Service Type</label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                        >
                            <option value="residential">Residential Design</option>
                            <option value="commercial">Commercial Space</option>
                            <option value="renovation">Renovation</option>
                            <option value="consultation">General Consultation</option>
                        </select>
                    </div>

                    <div className="form-group full-width">
                        <label htmlFor="message">Message (Optional)</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">Request Consultation</button>
                </form>
            </div>
        </div>
    );
};

export default Reservation;
