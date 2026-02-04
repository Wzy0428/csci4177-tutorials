import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    useEffect(() => {
        const storedData = localStorage.getItem('userData')
    

    if(storedData) {
        setUserData(JSON.parse(storedData))
    } else {
        navigate('/')
    }

    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('userData')
        navigate('/')
    }
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                    </div>
                    <h1 className="profile-title">Welcome to your profile</h1>
                </div>

                <div className="profile-content">
                    <div className="profile-info-group">
                        <label>First Name</label>
                        <div className="profile-info-value">{userData.firstName}</div>
                    </div>

                    <div className="profile-info-group">
                        <label>Last Name</label>
                        <div className="profile-info-value">{userData.lastName}</div>
                    </div>

                    <div className="profile-info-group">
                        <label>Email</label>
                        <div className="profile-info-value">{userData.email}</div>
                    </div>

                    <button onClick={handleLogout} className="logout-button">
                        Back to Registration
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile