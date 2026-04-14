# React Login App

A simple React application with a login page built using Vite, featuring form validation and responsive design.

**Branch**: test

## Features

- ✨ Modern React 18 with Vite
- 🔐 Login page with email and password validation
- 📱 Responsive design (mobile, tablet, desktop)
- 🎨 Clean and modern UI with CSS Modules
- ✅ Form validation with real-time error feedback
- 🌙 Dark mode support
- ♿ Accessibility features (ARIA labels, keyboard navigation)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Login

The app includes a mock authentication system. You can login with any email and password that meet the validation requirements:

- **Email**: Must be a valid email format (e.g., user@example.com)
- **Password**: Must be at least 6 characters long

After successful login, you'll be redirected to the dashboard.

### Dashboard

The dashboard displays:
- Welcome message with user email
- Success notification
- Sample statistics (tasks, projects, messages)
- Logout button to return to login page

## Project Structure

```
demo/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Login form component
│   │   ├── Login.module.css       # Login styles
│   │   ├── Dashboard.jsx          # Dashboard component
│   │   └── Dashboard.module.css   # Dashboard styles
│   ├── App.jsx                    # Main app component with auth state
│   ├── App.css                    # App-level styles
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies and scripts
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS Modules** - Scoped component styling
- **JavaScript (ES6+)** - Modern JavaScript features

## Future Enhancements

- [ ] Add React Router for multiple pages
- [ ] Implement "Remember Me" functionality
- [ ] Add "Forgot Password" feature
- [ ] Integrate with backend API
- [ ] Add password visibility toggle
- [ ] Persist auth state in localStorage
- [ ] Add loading states and animations
- [ ] Implement unit tests with Vitest

## License

MIT