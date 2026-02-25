# Tutorial 3: Front-End Frameworks II
The app allows users to log in, browse a list of user profiles with search functionality, and view detailed information for individual users.

* *Date Created*: 25 Feb 2026
* *Last Modification Date*: 25 Feb 2026
* *Netlify URL*:
* *GitLab URL*: https://git.cs.dal.ca/zhiyingw/csci4177-tutorials/-/tree/main/tutorial3?ref_type=heads
* *GitHub URL*: https://github.com/Wzy0428/csci4177-tutorials/tree/main/tutorial3

## Authors
* [Zhiying Wu](zh617138@dal.ca) - *(Developer)*

## Getting Started

### Prerequisites
To have a local copy of this tutorial up and running on your local machine, you will first need to install the following:

```
Node.js (v18 or higher)
npm (Node.js)

```
You can download Node.js from https://nodejs.org/

### Installing
1. Clone the repository:

```
https://git.cs.dal.ca/zhiyingw/csci4177-tutorials.git
```
2. Navigate into the Tutorial 3 folder:

```
cd Tutorial3
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

The app will open at http://localhost:3000

You should see a Login page. Use the following test credentials:

```
Email: testemail@dal.ca
Password: Test@123
```
After logging in you will be redirected to the User Profiles page.

## Deployment
To deploy:
1. Push the code to GitHub
2. Log in to https://netlify.com
3. Click "Add new site" -> "Import an existing project"
4. Connect the GitHub repo and set the build command to: npm run build
5. Set the publish directory to: build
6. Click "Deploy site"

## Built With
* [React](https://react.dev/) - Front-end JavaScript framework used to build the UI
* [React Router DOM](https://reactrouter.com/) - Used for client-side routing between Login, User List, and User Detail pages
* [Axios](https://axios-http.com/) - Used to make HTTP GET and POST requests to the external REST API
* [Create React App](https://create-react-app.dev/) - Used to scaffold and bundle the project

## Sources Used

### Login.jsx

*Lines 05 - 70*

```
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');   
    setLoading(true);  

    try {
      await loginUser(email, password);   
      navigate('/users', {replace: true});
    } catch (err) {
      setError(
      'Login failed. Please check your credentails!'
    );
    } finally {
      setLoading(false); 
    }
  };

return (
  <div className='login-container'>
    <div className='login-box'>
      <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
              <input
                type="email"
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                placeholder="Enter your email"
              />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder='Enter your password'
              />
          </div>
    )
}  

```
The code above was created by adapting the code in [LogRocket](https://blog.logrocket.com/axios-post-requests/) as shown below: 

```
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password
    };
    axios.post("https://reqres.in/api/login", userData).then((response) => {
      console.log(response.status, response.data.token);
    });
  };

  return (
    <div>
      <h1>Login Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

```
- <!---How---> The code in [LogRocket](https://blog.logrocket.com/axios-post-requests/) was implemented by demonstrating how to collect form input values and send them as a POST request body using Axios.
- <!---Why---> [LogRocket](https://blog.logrocket.com/axios-post-requests/)'s Code was used because it showed the standard pattern for handling login form submissions with Axios in React.
- <!---How---> [LogRocket](https://blog.logrocket.com/axios-post-requests/)'s Code was modified by converting the single state object into separate useState hooks for email and password, adding async/await instead of .then(), adding error handling with try/catch/finally, adding a loading state to disable the button during the request, and using useNavigate to redirect on success.

### UserDetails.jsx and UserList.jsx

*Lines 14 - 28*

```
useEffect(() => {
  const fetchUserDetail = async () => {
    try {
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
}, [id]); 

*Lines 20 - 35, 89 - 103*

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();  
      setUsers(data); 
      setFilteredUsers(data);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false); 
    }
  };
  fetchUsers();
}, []);

<div className="users-grid">
  {filteredUsers.map((user) => (
    <div
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

```
The code above was created by adapting the code in [DEV](https://dev.to/collegewap/how-to-fix-react-hook-warnings-for-async-functions-in-useeffect-1p5d) as shown below: 

```
import { useEffect, useState } from "react"
function App() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`
        )
        const data = await response.json()
        setPosts(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App

```
- <!---How---> The code in [DEV](https://dev.to/collegewap/how-to-fix-react-hook-warnings-for-async-functions-in-useeffect-1p5d) was implemented by wrapping an async fetch call inside a named function within useEffect, then immediately calling it, which avoids the React warning about returning a Promise from useEffect.
- <!---Why---> [DEV](https://dev.to/collegewap/how-to-fix-react-hook-warnings-for-async-functions-in-useeffect-1p5d)'s Code was used because it demonstrated the correct pattern for making async API calls inside useEffect without causing React hook warnings.
- <!---How---> [DEV](https://dev.to/collegewap/how-to-fix-react-hook-warnings-for-async-functions-in-useeffect-1p5d)'s Code was modified by replacing fetch() with Axios calls to a custom api.js service, adding a finally block to manage the loading state, passing [id] as a dependency in UserDetail so the effect re-runs when the user navigates to a different profile, and storing results in separate users and filteredUsers state variables to support search filtering.

## Acknowledgments
* Professor and TAs for assignment requirements and guidance.
* React Router DOM documentation: https://reactrouter.com/en/main
* Axios documentation: https://axios-http.com/docs/intro