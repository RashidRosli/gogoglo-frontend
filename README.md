


          
# GoGoGlo Frontend

GoGoGlo is a comprehensive travel booking platform built with React and Tailwind CSS. This frontend application provides users with the ability to search, explore, and book flights, hotels, and tour packages.

## Features

- **User Authentication**: Secure login system with role-based access control
- **Flight Search & Booking**: Advanced flight search with filtering options
- **Hotel Reservations**: Browse and book hotels with detailed room information
- **Tour Packages**: Explore tour packages with comprehensive itineraries
- **Responsive Design**: Fully responsive interface for all device sizes
- **Interactive UI**: Modern, user-friendly interface with smooth transitions

## Tech Stack

- React 18
- Tailwind CSS
- React Router
- Axios for API requests
- Various React libraries:
  - react-slick for carousels
  - react-datepicker for date selection
  - react-icons for UI icons
  - react-toastify for notifications
  - and more

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gogoglo-frontend.git
cd gogoglo-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
gogoglo-frontend/
├── public/                  # Public assets
├── src/
│   ├── assets/              # Static assets (images, etc.)
│   ├── components/          # Reusable components
│   │   └── FrontPage/       # Components for the front-facing pages
│   ├── views/               # Page components
│   │   ├── Data/            # Mock data for development
│   │   └── FrontPage/       # Front-facing page views
│   ├── AuthContext.js       # Authentication context
│   └── index.js             # Application entry point
└── package.json             # Project dependencies and scripts
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will create an optimized build in the `build` directory.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_API_URL=your_api_url_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is based on the Tailwind Starter Kit by Creative Tim, which is licensed under the MIT License.

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Creative Tim](https://www.creative-tim.com/) for the Tailwind Starter Kit
