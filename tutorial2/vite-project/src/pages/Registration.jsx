import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Registration(){
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    //State for storing validation errors
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    //Validation
    const validateName = (name) => {
        const nameRegex = /^[A-Za-z]+$/
        return nameRegex.test(name)
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password) => {
    if (password.length < 8) return false
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/
    return passwordRegex.test(password)
    }

    //Handle input changes
    const handleChange = (e) => {
        const {name, value } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setTouched(prev => ({
            ...prev,
            [name]: true
        }))

        validateField(name, value)
    }

    //Validate individual field
    const validateField = (fieldName, value) => {
        let error = ''

        switch(fieldName){
            case 'firstName':
                if(!value.trim()) {
                    error = 'First name is required'
                } else if (!validateName(value)){
                    error = 'First name must contain only letters'
                }
                break

            case 'lastName':
                if(!value.trim()) {
                    error = 'Last name is required'
                } else if (!validateName(value)){
                    error = 'Last name must contain only letters'
                }
                break

            case 'email':
                if(!value.trim()){
                    error = 'Email is required'
                } else if (!validateEmail(value)){
                    error = 'Please enter a valid email address'
                }
                break

            case 'password':
                if(!value){
                    error = 'Password is required'
                } else if (!validatePassword(value)){
                    error = 'Password must be at least 8 characters with alphanumeric and special characters'
                }
                break
            
            case 'confirmPassword':
                if(!value){
                    error = 'Please confirm your password'
                } else if (value !== formData.password){
                    error = 'Passwords do not match'
                }
                break

            default:
                break
        }

        //Update errors state
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }))
        return error === ''
    }

    //Validate entire form
    const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required'
    } else if (!validateName(formData.firstName)) {
        newErrors.firstName = 'First name must contain only letters'
    }
    
    if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required'
    } else if (!validateName(formData.lastName)) {
        newErrors.lastName = 'Last name must contain only letters'
    }
    
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.password) {
        newErrors.password = 'Password is required'
    } else if (!validatePassword(formData.password)) {
        newErrors.password = 'Password must be at least 8 characters with alphanumeric and special characters'
    }
    
    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setTouched({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        confirmPassword: true
    })

    if(validateForm()){
        localStorage.setItem('userData', JSON.stringify ({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }))

        navigate('/profile')
    }
  }
    return (
        <div className="registration-container">
            <div className="registration-card">
                <h1 className="form-title">Create Your Account</h1>
                <p className="form-subtitle">Join us today and get started</p>

                <form onSubmit={handleSubmit} className="Registration-form" noValidate>
                    {/* First Name Field */}
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={errors.firstName && touched.firstName ? 'error' : ''}
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && touched.firstName && (
                            <span className="error-message">{errors.firstName}</span>
                        )}
                    </div>

                    {/* Last Name Field */}
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={errors.lastName && touched.lastName ? 'error' : ''}
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && touched.lastName && (
                            <span className="error-message">{errors.lastName}</span>
                        )} 
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email && touched.email ? 'error' : ''}
                            placeholder="your.email@example.com"
                        />
                        {errors.email && touched.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password && touched.password ? 'error' : ''}
                            placeholder="Minimum 8 characters"
                        />
                        {errors.password && touched.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                            placeholder="Re-enter your password"
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>
                
                    {/* Submit Button */}
                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Registration

