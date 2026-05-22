# Paw Heaven 🐾

**Paw Heaven** is a modern pet adoption platform that connects loving families with pets in need of forever homes. Built with Next.js, this application provides a seamless experience for browsing, adopting, and managing pet listings.

## Live URL

🔗 [https://paw-heaven-beige.vercel.app/](https://paw-heaven-beige.vercel.app/)

## Purpose

Paw Heaven aims to simplify the pet adoption process by providing:
- A centralized platform for animal shelters and individuals to list pets for adoption
- An intuitive browsing experience for potential adopters to find their perfect companion
- A dashboard for managing pet listings and tracking adoption requests
- Secure user authentication and profile management

## Features

### 🏠 Homepage
- **Banner Section** - Eye-catching hero section with call-to-action
- **Featured Animals** - Showcase of pets looking for homes
- **Site Sections** - Quick navigation to different areas of the platform

### 🐾 Pet Browsing
- **All Pets Page** - Browse all available pets for adoption
- **Pet Details** - Detailed information about each pet including photos, breed, age, and personality
- **Search & Filter** - Find pets based on specific criteria

### 📋 Adoption Process
- **Adoption Forms** - Submit adoption requests for pets
- **Request Management** - Track and manage adoption applications

### 👤 User Dashboard
- **Personal Dashboard** - Overview of user activity and stats
- **Pet Listings Management** - Add, edit, and delete pet listings
- **Adoption Requests** - View and respond to adoption applications
- **Statistics** - Track total pets listed, adoption requests, and messages

### 🔐 Authentication
- **User Registration** - Sign up for a new account
- **Login/Logout** - Secure authentication system
- **Session Management** - Persistent user sessions

### 🎨 UI/UX Features
- **Responsive Design** - Works seamlessly on all devices
- **Animations** - Smooth transitions using Framer Motion
- **Toast Notifications** - User feedback with Sonner toasts
- **Loading States** - Spinner components for better UX
- **Modal Dialogs** - Confirmation dialogs for delete/edit actions

## NPM Packages Used

### Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `next` | 16.2.6 | React framework for production |
| `react` | 19.2.4 | JavaScript library for building user interfaces |
| `react-dom` | 19.2.4 | React DOM rendering |
| `@heroui/react` | ^3.0.5 | UI component library |
| `@heroui/styles` | ^3.0.5 | Styling for HeroUI components |
| `better-auth` | ^1.6.11 | Authentication library |
| `@better-auth/mongo-adapter` | ^1.6.11 | MongoDB adapter for Better Auth |
| `mongodb` | ^7.2.0 | MongoDB driver |
| `framer-motion` | ^12.39.0 | Animation library for React |
| `react-icons` | ^5.6.0 | Icon library |
| `nuqs` | ^2.8.9 | URL query state management |
| `sonner` | ^2.0.7 | Toast notification library |

### Dev Dependencies
| Package | Version | Description |
|---------|---------|-------------|
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin for Tailwind CSS |
| `eslint` | ^9 | JavaScript linter |
| `eslint-config-next` | 16.2.6 | ESLint configuration for Next.js |
| `babel-plugin-react-compiler` | 1.0.0 | React Compiler Babel plugin |

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB connection (for backend API)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rahinhaque/Petheaven-frontend.git
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SERVER_URL=your_backend_api_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── all-pets/          # Pet browsing pages
│   │   ├── api/auth/          # Authentication API routes
│   │   ├── dashboard/         # User dashboard
│   │   ├── login/             # Login page
│   │   ├── signup/            # Registration page
│   │   ├── page.js            # Homepage
│   │   ├── layout.js          # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── cards/             # Pet card components
│   │   ├── filter/            # Search and filter components
│   │   ├── forms/             # Form components (adoption, etc.)
│   │   ├── homepage/          # Homepage sections
│   │   ├── modal/             # Modal dialogs
│   │   └── shared/            # Shared components (Navbar, Footer, Spinner)
│   └── lib/
│       └── auth-client.js     # Authentication client configuration
├── public/                    # Static assets
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

**Made with ❤️ for pet lovers everywhere**