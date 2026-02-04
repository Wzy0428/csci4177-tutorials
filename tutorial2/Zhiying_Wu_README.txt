<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# Tutorial 2
This is a React-based registration and profile management system implementing form validation, client-side routing, and state management using React hooks.

* *Date Created*: 30/01/2026
* *Last Modification Date*: 04/02/2026
* *Netlify URL*: https://tutorial-02.netlify.app/
* *GitLab URL*: https://git.cs.dal.ca/zhiyingw/csci4177-tutorials/-/tree/main/tutorial2
* *GitHub URL*: https://github.com/Wzy0428/csci4177-tutorials/tree/main/tutorial2

## Authors
* [Zhiying Wu](zh617138@dal.ca) - *(Developer)*


## Getting Started
To have a local copy of this project up and running on your local machine for development and testing purposes, follow the instructions below.

### Prerequisites
To run this project locally, you will need to install the following software:
```
Node.js 
npm 
Git
A modern web browser (Chrome, Firefox, Safari, or Edge)
A code editor 
```

### Installing
Follow these step-by-step instructions to get a development environment running:

**Step 1: Clone the repository**
```
git clone https://git.cs.dal.ca/zhiyingw/csci4177-tutorials.git
cd csci4177-tutorials/tutorial2/vite-project
```

**Step 2: Install dependencies**
```
npm install
```
(This will install all required packages including React, React Router DOM, and Vite)

**Step 3: Start the development server**
```
npm run dev
```

**Step 4: Open in browser**

Navigate to the URL in your web browser. You should see the registration form with:
- Five input fields (First Name, Last Name, Email, Password, Confirm Password)
- A Register button

## Running the tests
This project includes manual validation testing.

### Validation Tests

**Test 1: First Name Validation**
```
Input: "John123"
Expected Result: Error message "First name must contain only letters"

Input: "John"
Expected Result: No error, field accepts input
```

**Test 2: Last Name Validation**
```
Input: "O'Brien"
Expected Result: Error message "Last name must contain only letters"

Input: "Doe"
Expected Result: No error, field accepts input
```

**Test 3: Email Validation**
```
Input: "invalid.email"
Expected Result: Error message "Please enter a valid email address"

Input: "john.doe@example.com"
Expected Result: No error, field accepts input
```

**Test 4: Password Validation**
```
Input: "short"
Expected Result: Error message "Password must be at least 8 characters..."

Input: "Password123!"
Expected Result: No error, field accepts input
```

**Test 5: Confirm Password Validation**
```
Input: "DifferentPassword"
Expected Result: Error message "Passwords do not match"

Input: Same as password field
Expected Result: No error, field accepts input
```

## Deployment
This project is deployed on Netlify.

1. Build the project:
```
npm run build
```

2. Deploy to Netlify:
   - Connect GitHub repository and configure:
     * Base directory: `tutorial2/vite-project`
     * Build command: `npm run build`
     * Publish directory: `tutorial2/vite-project/dist`

## Built With
* [React](https://react.dev) - Frontend JavaScript library for building user interfaces
* [React Router DOM](https://reactrouter.com) - Declarative routing for React applications  
* [Vite](https://vitejs.dev) - Frontend build tool with fast HMR
* [ESLint](https://eslint.org/) - JavaScript utility for code quality


## Sources Used

### Registration.jsx

*Lines 20 - 34*

```
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

```

The code above was created by adapting the code in [W3Schools JavaScript RegExp Reference](https://www.w3schools.com/jsref/jsref_obj_regexp.asp) as shown below: 

```
const pattern = /[0-9]/;

```

- The code in [W3Schools](https://www.w3schools.com/jsref/jsref_obj_regexp.asp) was implemented by creating a regular expression pattern to match alphabetic characters, numbers, and email formats.
- W3Schools' code was used because it provides a standard and reliable method for validating that names contain only letters and regular regular expression pattern examples.
- W3Schools' code was modified by wrapping it in a reusable function that accepts a name parameter and returns a boolean result for use in React state validation.

### App.jsx

*Lines 1-17*

```
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

```

The code above was created by adapting the code in [W3Schools React Router Tutorial](https://www.w3schools.com/react/react_router.asp) as shown below: 

```
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- The code in [W3Schools](https://www.w3schools.com/react/react_router.asp) was implemented by importing routing components and setting up basic route structure.
- W3Schools' code was used because it provides a clear example of implementing client-side routing in React, which is required for navigating between the registration and profile pages.
- W3Schools' code was modified by adding specific routes for Registration and Profile components, and wrapping the Routes in a div with className for styling purposes.


### Profile.jsx

*Lines 12-27*

```
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

```

The code above was created by adapting the code in [W3Schools React useEffect Hook](https://www.w3schools.com/react/react_useeffect.asp) and [W3Schools JavaScript localStorage](https://www.w3schools.com/jsref/prop_win_localstorage.asp) as shown below: 

```
useEffect(() => {
  //Runs on the first render
  //And any time any dependency value changes
}, [prop, state]);

// localStorage example
localStorage.setItem(key, value);
let lastname = localStorage.getItem(key);
localStorage.removeItem(key);

```

- The code in [W3Schools](https://www.w3schools.com/react/react_useeffect.asp) was implemented by using the useEffect hook to perform side effects after component rendering, and localStorage methods to persist data.
- W3Schools' code was used because it demonstrates how to load data when a component mounts and how to use browser storage for data persistence without a backend.
- W3Schools' code was modified by combining the useEffect hook with localStorage retrieval, adding conditional logic to check if data exists, parsing JSON data, and implementing navigation redirect if no user data is found.

## Artificial Intelligence Tools Used
* [Claude AI](https://claude.ai) - AI Assistant by Anthropic

### Prompt Used on [Claude AI]

```
Why the registration page not displaying on the webpage? Files included src/pages/Registration.jsx, src/pages/Profile.jsx and src/main.jsx, using react framework.

```

The code prompt above was used with [Claude AI](https://claude.ai) to generate troubleshooting steps shown below: 

```
Check browser console for errors (Cmd + Option + I)
Verify all files exist: ls -la src/
Check if src/main.jsx exists
Check if index.html loads main.jsx
Look for JavaScript errors in console

```

#### Registration.jsx
*Missing email field identification*

- The troubleshooting steps from [Claude AI](https://claude.ai) were implemented by systematically checking the browser console for errors, examining file structure, and analysing component code to identify that the email input field was missing from the registration form JSX.
- [Claude AI](https://claude.ai)'s debugging approach was used because the blank page indicated a component rendering issue, and systematic checks helped identify that the form had a comment for "Email Field" but the actual email input was replaced with password field code.
- The debugging process led to adding the missing email field between lastName and password fields in the JSX, which resolved the display issue.


### Prompt Used on Claude AI (Debugging)

```
The register button on the Registration.jsx page does not work.
```

The code prompt above was used with [Claude AI](https://claude.ai) to generate diagnostic commands shown below: 

```
grep -n "hadleSubmit\|onSubmit" src/pages/Registration.jsx
grep -A 2 "<form" src/pages/Registration.jsx
```

#### Registration.jsx
*Line 179 - form onSubmit handler*

```
<form onSubmit={hadleSubmit} className="Registration-form" noValidate>
```

- The debugging commands from [Claude AI](https://claude.ai) were implemented by using grep to search for the onSubmit handler in the Registration component, which revealed a typo in the function name.
- [Claude AI](https://claude.ai)'s diagnostic approach was used because the button appeared to do nothing when clicked, suggesting the form submission handler was not properly connected.
- The code was modified by correcting the typo from `hadleSubmit` to `handleSubmit` on line 199, which successfully connected the form submission to the validation and navigation logic.

## Acknowledgments
* W3Schools for comprehensive React tutorials and JavaScript reference documentation
* React.dev official documentation for React best practices and modern patterns
* Anthropic's Claude AI for generating educational code examples and debugging assistance
* Professor and TAs for assignment requirements and guidance
* Vite development team for the build tool and development experience
