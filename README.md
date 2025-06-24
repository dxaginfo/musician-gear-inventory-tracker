# Musician Gear Inventory Tracker

A comprehensive web application for musicians, bands, and touring professionals to track, manage, and maintain their instrument inventory.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-13.0+-black.svg)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.0+-blue.svg)](https://www.postgresql.org/)

## Overview

The Musician Gear Tracker addresses a significant gap in the music technology ecosystem. While numerous solutions exist for rehearsal scheduling, tour planning, and other aspects of the music industry, a dedicated platform for gear management remains underdeveloped.

This application provides musicians with a powerful tool to:

- Catalog and track instruments and equipment
- Schedule and monitor maintenance needs
- Track gear value over time
- Organize equipment for performances
- Collaborate with band members and technicians

## Features

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

### User Management
- Multi-user access with different permission levels
- Band/ensemble shared inventory options
- Technician/roadie access controls
- Contact management for repair services

## Technology Stack

### Frontend
- **Framework:** React.js with Next.js for server-side rendering
- **Styling:** Tailwind CSS for responsive design
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form
- **Data Visualization:** Recharts

### Backend
- **API Framework:** Node.js with Express.js
- **Authentication:** Firebase Authentication
- **File Storage:** AWS S3
- **Image Processing:** Sharp

### Database
- **Primary Database:** PostgreSQL
- **Caching:** Redis
- **Search:** Elasticsearch

### DevOps
- **Hosting:** Vercel (frontend), AWS EC2 (backend)
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry, DataDog
- **Containerization:** Docker

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL
- Redis
- AWS account (for S3)
- Firebase account

### Frontend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/musician-gear-inventory-tracker.git
   cd musician-gear-inventory-tracker/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd ../backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   DATABASE_URL=postgresql://username:password@localhost:5432/musician_gear_tracker
   REDIS_URL=redis://localhost:6379
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   AWS_REGION=your_aws_region
   AWS_S3_BUCKET=your_s3_bucket_name
   FIREBASE_TYPE=service_account
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_PRIVATE_KEY_ID=your_firebase_private_key_id
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   FIREBASE_CLIENT_ID=your_firebase_client_id
   FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
   FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
   FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
   FIREBASE_CLIENT_X509_CERT_URL=your_firebase_client_cert_url
   ```

4. Run the database migrations
   ```bash
   npm run migrate
   # or
   yarn migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Docker Setup

1. Build and run the containers using Docker Compose
   ```bash
   docker-compose up -d
   ```

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the environment variables
3. Deploy

### Backend (AWS EC2)

1. Create an EC2 instance
2. Set up a CI/CD pipeline using GitHub Actions
3. Configure the environment variables
4. Deploy using Docker

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [AWS S3](https://aws.amazon.com/s3/)