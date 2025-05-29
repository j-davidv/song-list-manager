# 🎵 Song Lineup Manager

A modern web application built for **Beloved Community Church** to manage song lineups for different Sundays, featuring dual authentication, song leader assignments, and YouTube integration.

![Church Logo](public/church-logo.png)

## ✨ Features

### 🔐 Dual Authentication System
- **User Authentication**: Firebase-based email/password authentication
- **Admin Authentication**: Secure admin portal with custom credentials
- **Stay Logged In**: Optional persistent sessions across browser closes
- **Role-based Access**: Different permissions for users and administrators

### 📅 Sunday Management
- **Five Sunday Categories**: First, Second, Third, Fourth, Fifth Sunday organization
- **Song Leader Assignment**: Assign and manage song leaders per Sunday
- **Real-time Updates**: Live synchronization using Firebase Firestore
- **Collapsible Sections**: Clean, organized view with expandable Sunday sections

### 🎶 Song Management
- **Complete Song Information**: Title, key, sequence, and YouTube links
- **YouTube Integration**: Embedded thumbnails and direct video access
- **Admin Controls**: Add, edit, and delete songs (admin-only)
- **Smart Organization**: Songs automatically grouped by Sunday

### 📱 Modern UI/UX
- **Fully Responsive**: Mobile-first design that works on all devices
- **Blue Theme**: Consistent color scheme throughout the application
- **Modern Components**: Glassmorphism effects, gradients, and smooth animations
- **Church Branding**: Integrated church logo and professional styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/j-davidv/song-list-manager.git
cd song-list-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password provider)
   - Create a Firestore database
   - Copy your Firebase configuration

4. **Environment Setup**
   - Copy `env.example` to `.env`
   - Add your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Admin Credentials (customize these)
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=your_secure_password
```

5. **Start the development server**
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔧 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS v3.4.0 with custom responsive breakpoints
- **Database**: Firebase Firestore (real-time database)
- **Authentication**: Firebase Auth + Custom Admin Auth
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App

## 📖 Usage

### For Regular Users
1. **Sign up/Login**: Create an account or sign in with existing credentials
2. **Choose Stay Logged In**: Optionally stay logged in across browser sessions
3. **View Songs**: Browse songs organized by Sunday categories
4. **Watch Videos**: Click on song thumbnails to open YouTube videos

### For Administrators
1. **Admin Login**: Use the admin toggle and enter admin credentials
2. **Manage Songs**: Add, edit, or delete songs for any Sunday
3. **Assign Leaders**: Set song leaders for each Sunday
4. **Real-time Management**: All changes sync immediately across all users

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard view
│   ├── Login.tsx        # Authentication form
│   ├── SongCard.tsx     # Individual song display
│   ├── SongForm.tsx     # Song creation/editing form
│   └── SundaySection.tsx # Sunday organization component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── config/              # Configuration files
│   └── firebase.ts      # Firebase initialization
├── types/               # TypeScript type definitions
│   └── index.ts         # App-wide type definitions
├── utils/               # Utility functions
│   └── format.ts        # Formatting helpers
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design Features

- **Responsive Breakpoints**: Custom `xs` (475px) breakpoint for better mobile experience
- **Gradient Themes**: Beautiful blue gradient backgrounds and components
- **Modern Cards**: Rounded corners, shadows, and hover effects
- **Glassmorphism**: Backdrop blur effects for modern aesthetics
- **Smooth Animations**: Transform and transition effects throughout

## 🔒 Security Features

- **Environment Variables**: Sensitive configuration kept in environment files
- **Firebase Security Rules**: Database access controlled by authentication
- **Admin Separation**: Admin functionality isolated from regular user features
- **Secure Storage**: Proper handling of authentication tokens and sessions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Beloved Community Church** for inspiring this project
- **Firebase** for providing robust backend services
- **Tailwind CSS** for the utility-first CSS framework
- **React Community** for the excellent ecosystem

---

Built with ❤️ for Beloved Community Church
