# CityHub Frontend

A React-based frontend for the CityHub project management platform, built with Vite and TypeScript.

## Demonstration

> These screenshots and videos demonstrate the core features of the CityHub Frontend. Useful if the website is not running.

### 0. Home Page
![Home Page](public/images/Homepage.png)
![Home Page 2](public/images/Homepage2.png)
![Home Page 3](public/images/Homepage3.png)
![About](public/images/About.png)

### 1. Login & Signup
![Login](public/images/Login.png) 
![SignUp](public/images/Signup.png) 
![API Login1](public/images/Login1.png) 
![API Login2](public/images/Login2.png) 

### 2. Project Submission
![Submit Project](public/images/Submit1.png)
![Submit Project 2](public/images/Submit2.png)
![Submit Project 3](public/images/Submit3.png)
![Submit Project 4](public/images/Submit4.png)
![Submit Project 5](public/images/Submit5.png)

### 3. Project Browsing & Filters
![Browse Projects](public/images/Browse1.png)

### 4. Project Details & Comments
![Project Details](public/images/Details1.png)
![Project Details](public/images/Details2.png)
![Project Details](public/images/Details3.png)

### 5. Admin Dashboard & Content Moderation
![Admin API Login](public/images/Admin1.png)
![Pending Projects](public/images/Admin2.png)
![Approved Projects](public/images/Admin3.png)
![Content Moderation](public/images/Admin4.png)



## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git


## Installation

1. Clone the repository:
```bash
git clone https://github.com/kwesi-koranteng/cityhub-frontend.git
cd cityhub-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`




## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## Technologies Used

- React
- Vite
- CSS
- React Router


