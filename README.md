# Next.js Admin Dashboard

A modern admin dashboard built with Next.js, TypeScript, Tailwind CSS, and Firebase authentication.

## Features

- Responsive sidebar navigation
- Stats cards with key metrics
- Interactive charts (line and bar)
- Recent activity feed
- Firebase Authentication
  - Login/Logout
  - Signup with admin code verification
  - Forgot password functionality
- Protected routes

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- Firebase account

### Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication and choose Email/Password sign-in method
3. Create a Firestore database
4. Create a `.env.local` file in the project root with the following structure:

```
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

You can find these values in your Firebase project settings.

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Admin Registration

The default admin code is `ADMIN123`. You'll need to enter this when registering a new admin account.

For production, you should change this code to something more secure in the `AuthContext.tsx` file.

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Chart.js & react-chartjs-2
- React Icons
- Firebase Authentication
- Firestore Database

## Project Structure

- `/app` - Next.js App Router
- `/components` - Reusable UI components
- `/contexts` - React context providers
- `/lib` - Firebase and utility functions
- `/public` - Static assets

## License

This project is open source and available under the [MIT License](LICENSE).
