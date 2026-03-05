const express = require ('express');
//uuidv4() generates a random unique ID
const { v4: uuidv4 } = require('uuid');

//Creates actual server
const app = express();

//Tells Express to automatically parse JSON from request bodies
app.use(express.json());

const PORT = process.env.PORT || 3000;

let users = [
    { id: uuidv4(), email: "abc@dal.ca", firstName: "ABC" },
    { id: uuidv4(), email: "def@dal.ca", firstName: "DEF" }
];

//GET /users
//app.get() registers a handler for HTTP GET requests to '/users'
//(req) = the incoming request object (headers, body, params)
//(res) = the response object: used to send data back to the client
app.get('/users', (req, res) => {
    try {
        //.json() sends a JSON response
        res.status(200).json({
            message: "Users retrieved",
            success: true,
            users: users
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
});

//Returns a SINGLE user by their ID
//:id is a route parameter, GET /user/5abf6783 
app.get('/user/:id', (req, res) => {
    try {
        const { id } = req.params;  //req.params holds all route parameters
        //Array.find() loops through users and returns the FIRST match
        //For each user u, checks if u.id === id
        const user = users.find(u => u.id === id);

        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        res.status(200).json({
            success: true,
            user: user  //Returns just that one user object
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
});

//Post/add
app.post('/add', (req,res) => {
    try {
        //req.body contains the JSON data sent in the request body
        const { email, firstName } = req.body;

        if (!email || !firstName) {
            return res.status(400).json({
                message: "Email and firstName are required",
                success: false
            });
        }

        const newUser = {
            id: uuidv4(),
            email: email,
            firstName: firstName
        };

        //Adds the new user object to the end of our users array
        users.push(newUser);

        res.status(201).json({
            message: "User added",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
});

//Put/update/:id
app.put('/update/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { email, firstName } = req.body;

        if (!email && !firstName) {
            return res.status(400).json({
                message: "Provide at least email or firstName to update",
                success: false
            });
        }
        //findIndex() returns the INDEX (position) of the user in the array
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        //users[userIndex] directly modifies the object in the array
        if (email) users[userIndex].email = email;
        if (firstName) users[userIndex].firstName = firstName;

        res.status(200).json({
            message: "User updated",
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}) 