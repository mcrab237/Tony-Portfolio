# Tony's Portfolio

A modern, responsive portfolio website built with React, Firebase, and Framer Motion. Features a beautiful design with smooth animations, project management system, and contact functionality.

## 🚀 Features

- **Modern Design**: Dark theme with gradient backgrounds and smooth animations
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Project Management**: Full CRUD operations for projects with Firebase backend
- **Image Upload**: Support for multiple project screenshots with Firebase Storage
- **Contact Form**: Working contact form with validation
- **Admin Dashboard**: Manage projects, upload images, and edit content
- **Performance Optimized**: Fast loading with optimized animations
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Framer Motion
- **Backend**: Firebase (Firestore, Storage, Auth)
- **Styling**: CSS3 with modern features (Grid, Flexbox, Animations)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Ready for Vercel, Netlify, or Firebase Hosting

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd tony-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Firebase Setup**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Storage
   - Enable Authentication (optional)
   - Copy your Firebase configuration

4. **Environment Setup**

   - The Firebase configuration is already set up in `src/firebase.js`
   - Update the configuration with your Firebase project details if needed

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### Main Portfolio

- Visit the homepage to see the portfolio with hero section, projects, and contact form
- Click on projects to view detailed information
- Use the contact form to send messages

### Admin Dashboard

- Visit `/admin` to access the project management dashboard
- Use "Seed Demo Data" to populate with sample projects
- Add, edit, or delete projects
- Upload multiple images for each project
- Manage project details including technologies, features, and links

### Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx        # Landing section
│   ├── Navigation.jsx  # Header navigation
│   ├── ProjectCard.jsx # Project preview card
│   ├── ProjectsSection.jsx # Projects gallery
│   ├── ProjectDetail.jsx   # Individual project page
│   └── Contact.jsx     # Contact form section
├── admin/              # Admin dashboard
│   └── ProjectManager.jsx # Project CRUD operations
├── firebase.js         # Firebase configuration
├── App.jsx            # Main app component
├── App.css            # Styles
└── main.jsx           # App entry point
```

## 🎨 Customization

### Personal Information

Update the following in the respective components:

1. **Hero Section** (`src/components/Hero.jsx`):

   - Name and title
   - Description
   - Social media links
   - Profile image

2. **Contact Section** (`src/components/Contact.jsx`):

   - Email address
   - Phone number
   - Location
   - Social media links

3. **Navigation** (`src/components/Navigation.jsx`):
   - Logo text
   - Menu items

### Styling

- Main styles are in `src/App.css`
- Color scheme uses CSS custom properties
- Responsive breakpoints: 768px (tablet), 480px (mobile)

### Firebase Collections

#### Projects Collection

```javascript
{
  title: "Project Name",
  shortDescription: "Brief description",
  description: "Detailed description",
  category: "Web Development",
  technologies: ["React", "Node.js"],
  features: ["Feature 1", "Feature 2"],
  image: "main-image-url",
  images: ["image1-url", "image2-url"],
  liveUrl: "https://live-demo.com",
  githubUrl: "https://github.com/user/repo",
  duration: "3 months",
  role: "Full Stack Developer",
  client: "Client Name",
  challenges: "Challenges faced and solutions",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🚀 Deployment

### Vercel

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📱 Features Overview

### 🎯 Hero Section

- Animated introduction with name and role
- Social media links
- Parallax effects on scroll
- Floating geometric shapes

### 📁 Projects Section

- Filterable project gallery
- Grid/List view toggle
- Smooth hover animations
- Category-based filtering

### 📋 Project Details

- Comprehensive project information
- Image gallery with thumbnails
- Technology stack display
- Project timeline and role information

### 📞 Contact Section

- Working contact form
- Contact information cards
- Social media integration
- Form validation and submission feedback

### 🔧 Admin Dashboard

- Project CRUD operations
- Image upload with preview
- Form validation
- Demo data seeding

## 🔒 Security Notes

- Firebase Security Rules should be configured for production
- Consider implementing authentication for admin routes
- Validate and sanitize all user inputs
- Use environment variables for sensitive configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support

For support and questions:

- Email: tony@example.com
- GitHub Issues: Create an issue in this repository

---

Built with ❤️ by Tony using React and Firebase
