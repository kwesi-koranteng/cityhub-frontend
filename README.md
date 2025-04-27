# CityHub Frontend

A React-based frontend for the CityHub project management platform, built with Vite and TypeScript.

## Features

- User authentication (login/signup)
- Project submission and management
- Project browsing with filters
- Project details with comments
- Admin dashboard
- Responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cityhub-frontend.git
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

## Building for Production

1. Build the project:
```bash
npm run build
# or
yarn build
```

2. Preview the production build:
```bash
npm run preview
# or
yarn preview
```

## Deployment

### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run preview`
4. Add environment variables:
   - `VITE_API_URL`: Your backend API URL

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
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
