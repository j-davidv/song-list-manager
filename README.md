# Song Lineup Manager

A modern web application for song leaders to organize weekly lineups of songs for church services or events. Built with React, TypeScript, and Firebase for real-time updates and authentication.

## Features

- **Weekly Song Organization**: Organize songs by Sunday (First Sunday through Fifth Sunday)
- **Song Management**: Add, edit, and delete songs with the following details:
  - Song title
  - Optional key (C, G, Bb, etc.)
  - YouTube link with automatic thumbnail preview
  - Song sequence (Verse 1, Chorus, etc.)
- **Real-time Updates**: Changes are instantly synced across all users
- **Authentication System**: Admin users can manage songs, while regular users can only view
- **Mobile-Friendly**: Responsive design optimized for one-handed phone use
- **Collapsible Sections**: Clean interface with collapsible Sunday sections

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd song-lineup-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or select existing)
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password provider
4. Create Firestore Database:
   - Go to Firestore Database
   - Create database (start in test mode for development)
   - Update security rules (see below)
5. Get your configuration:
   - Go to Project Settings → General
   - Scroll down to "Your apps" → Web app
   - Register app and copy the configuration

### 4. Configure Firebase in the App

Update `src/config/firebase.ts` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 5. Firestore Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only authenticated users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Songs collection - everyone can read, only admins can write
    match /songs/{songId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### 6. Create First Admin User

1. Run the app: `npm start`
2. Register a new account
3. Go to Firebase Console → Firestore Database
4. Find your user in the `users` collection
5. Edit the document and set `isAdmin: true`

## Running the Application

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

## Deployment

The build folder can be deployed to any static hosting service:
- Firebase Hosting
- Netlify
- Vercel
- GitHub Pages

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

## Usage

### For Admins
1. Log in with your admin account
2. Click "Add Song" button in any Sunday section
3. Fill in song details and save
4. Edit or delete songs using the buttons on each song card

### For Regular Users
1. View the song lineup without logging in
2. Click on YouTube thumbnails or links to watch songs
3. Browse songs organized by Sunday

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## License

MIT
