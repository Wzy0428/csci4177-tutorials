import axios from 'axios';

const BASE_URL = 'https://express-t4.onrender.com/api';

    //Function to handle user login
    //axios.post sends a POST request and 'await' pauses execution until the API responds
    export const loginUser = async (username, password) => {
        try{
            const response = await axios.post(`${BASE_URL}/login`, {
                username,
                password
            });
            return response.data;   // axios wraps the response and .data gets the actual content
        } catch (error){
            throw error;
        }
    };
    
    //Function to get all users
    export const getAllUsers = async () => {
        try{
            //GET request for retrieving data, no body needed
            const response = await axios.get(`${BASE_URL}/users`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    //Function to get one specific user by ID
    export const getUserById = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };


