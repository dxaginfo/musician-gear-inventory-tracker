# Musician Gear Inventory Tracker

A comprehensive web application for musicians to track, manage, and maintain their musical equipment and gear.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.0+-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0+-blue.svg)](https://www.postgresql.org/)

## Features

- **Equipment Management**: Catalog all your musical instruments and gear with detailed information
- **Maintenance Tracking**: Schedule and record maintenance activities for your instruments
- **Value Tracking**: Monitor the value of your gear collection over time
- **Image Gallery**: Store and view multiple images for each instrument
- **Gig Management**: Organize equipment for upcoming gigs and ensure everything is packed
- **Band Member Collaboration**: Share gear information with band members
- **Mobile Responsive**: Access your gear information on any device

## Tech Stack

### Frontend
- React with Next.js
- TypeScript
- Tailwind CSS
- Firebase Authentication
- Headless UI Components
- React Hook Form for form handling
- SWR for data fetching

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Knex.js for query building and migrations
- Firebase Admin SDK for authentication
- Redis for caching
- Winston for logging

### DevOps
- Docker and Docker Compose for containerization
- GitHub Actions for CI/CD
- AWS for deployment (optional)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/musician-gear-inventory-tracker.git
   cd musician-gear-inventory-tracker
   ```

2. Set up environment variables:
   - Create a `.env` file in the `frontend` directory based on `.env.example`
   - Create a `.env` file in the `backend` directory based on `.env.example`

3. Start the application with Docker:
   ```bash
   docker-compose up
   ```

4. Or start without Docker:
   - Frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     npm run migrate
     npm run dev
     ```

## Database Schema

The application uses a PostgreSQL database with the following main tables:
- `users`: User account information
- `instruments`: Musical instruments and gear
- `instrument_images`: Images associated with instruments
- `maintenance_records`: History of maintenance activities
- `maintenance_schedule`: Scheduled maintenance tasks
- `bands`: Musical groups/ensembles
- `band_members`: Users belonging to bands
- `gigs`: Performance events
- `gig_gear`: Instruments needed for specific gigs
- `value_history`: Historical value records for instruments

## Key Features Explained

### Instrument Inventory Management
- Add and catalog instruments with detailed specifications
- Upload photos and documentation
- Track serial numbers, purchase information, and warranty details
- Generate inventory reports for insurance purposes

### Maintenance Tracking
- Schedule routine maintenance tasks
- Log service history and repairs
- Set reminders for upcoming maintenance
- Track consumables (strings, tubes, etc.)

### Value Tracking
- Monitor gear value over time
- Integrate with market price databases
- Calculate depreciation for tax purposes
- Track total collection value

### Location and Status Tracking
- Monitor which gear is in use, in storage, or on loan
- QR code/barcode generation for quick scanning
- Optional integration with Bluetooth trackers
- Check-in/check-out system for band equipment

### Gig Planning
- Create gear lists for specific performances
- Track what equipment is needed for different venues/shows
- Pack lists and setup diagrams
- Manage rental equipment alongside owned gear

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was inspired by the needs of musicians who want better tools to manage their gear
- Special thanks to all the contributors and open-source libraries that made this project possible