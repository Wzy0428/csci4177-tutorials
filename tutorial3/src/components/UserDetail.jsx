import React, { useState, useEffect } from 'react';
//useParams extracts URL parameters (the :id part)
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/api';

const UserDetail = () => {
    const { id } = useParams();     //Extracts the :id from the URL
    const navigate = useNavigate();
    //user: stores the single user object from API, initially not loaded yet
    const [user, setUser] = useState(null);     //null = not loaded yet
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                //calls api.js with the URL id
                const data = await getUserById(id);
                setUser(data);
            } catch (err) {
                setError('Failed to load user details. Please try again.');
                console.error('Error fetching user details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetail();
    }, [id]);   //Rerun this effect when id changes

    if (loading) {
        return <div className="loading">Loading user details...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error">{error}</div>

                {/* Back button navigates to /users */}
                <button onClick={() => navigate('/users')}>
                    Back to Users
                </button>
            </div>
        );
    };

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="user-detail-container">
            <button onClick={() => navigate('/users')} className="back-button">
                ← Back to Users
            </button>

            <div className="user-detail-card">
                <div className="user-detail-info">
                    {/* Use 'name' field */}
                    <h2>{user.name}</h2>
                    
                    <div className="detail-row">
                        <span className="label">Email:</span>
                        <span className="value">{user.email}</span>
                    </div>

                    {user.phone && (
                        <div className="detail-row">
                            <span className="label">Phone:</span>
                            <span className="value">{user.phone}</span>
                        </div>
                    )}

                    {user.address && (
                        <div className="detail-row">
                            <span className="label">Address:</span>
                            <span className="value">{user.address}</span>
                        </div>
                    )}

                    {user.company && (
                        <div className="detail-row">
                            <span className="label">Company:</span>
                            <span className="value">{user.company}</span>
                        </div>
                    )}

                    {user.about && (
                        <div className="detail-row">
                            <span className="label">About:</span>
                            <span className="value">{user.about}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetail;

