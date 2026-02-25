import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers} from '../services/api';

const UserList = () => {
    //useNavigate returns a function that can call to change pages
    const navigate = useNavigate();

    //users: stores all users from the API, initially empty array []
    //const [value, setValue] = useState(initialValue)
    const [users, setUsers] = useState([]);
    //stores users that match the search
    const [filteredUsers, setFilteredUsers] = useState([]);
    //what user types in the search box
    const [searchTerm, setSearchTerm] = useState('');
    //loading: true while fetching data, false when done
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        //Call API to get all users
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();   //calls api.js
                setUsers(data); //store the full list
                setFilteredUsers(data);
            } catch (err) {
                setError('Failed to load users. Please try again.');
                console.error('Error fetching user:', err);
            } finally {
                setLoading(false); 
            }
        };
        fetchUsers();
    }, []); //run once when component first appears on screen

    useEffect(() => {
        if (searchTerm === ''){
            setFilteredUsers(users);    //empty search = show everyone
        } else {
            //.filter() creates a new array with only items that pass the test
            //(user) => {...} is called for each user in the array
            const filtered = users.filter((user) => {
                const searchLower = searchTerm.toLowerCase();
                const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
                const name = (user.name || '').toLowerCase();

                return fullName.includes(searchLower) || name.includes(searchLower);
            });
            //Update filteredUsers with the filtered array
            setFilteredUsers(filtered);
        }
    }, [searchTerm, users]); //dependency array: Rerun this effect whenever searchTerm or users changes
    
    //When user clicks a card, navigate to that user's detail page
    const handleUserClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    if (loading) {
        return <div className="loading">Loading users...</div>;
    }
    if (error) {
        return <div className='error'>{error}</div>;

    }

    return (
        <div className="user-list-container">
            <h2>User Profiles</h2>

            {/* SEARCH INPUT BOX */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    //When user types, update searchTerm state, triggers the second useEffect (filter effect)
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            {/* If filtered array is empty, show "no results" message */}
            {filteredUsers.length === 0 ? (
                <p className="no-results">No users found matching "{searchTerm}"</p>
            ) : (
            /* .map() transforms each user object into a card element */
            <div className="users-grid">
                {filteredUsers.map((user) => (
                    <div
                        //'key' to track which items changed
                        //onClick: when card is clicked, call handleUserClick and pass user.id as parameter
                        key={user._id}
                        className="user-card"
                        onClick={() => handleUserClick(user._id)}
                    >
                        <div className="user-info">
                            <h3>{user.name}</h3>
                            <p className="user-email">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
    );
};

export default UserList;
