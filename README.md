# Kabba 2 Rental - Equipment & Schedule Management

A modern React TypeScript application for managing equipment inventory and rental schedules for Kabba 2 Rental company.

## 🚀 Features

### Equipment Inventory Management
- **Real-time equipment tracking** with status monitoring
- **Smart filtering system** with category, status, and location filters
- **Priority-based sorting** (Damaged → Maint. Hold → Rented → Available)
- **Customer integration** with clickable links to rental orders
- **Multi-store support** (Charlotte & Bon Aqua locations)

### Schedule Management
- **Comprehensive rental scheduling** with delivery/return tracking
- **Advanced search capabilities** (customer name, phone, equipment)
- **Transport mode tracking** (Truck delivery vs Store pickup)
- **Payment status monitoring**
- **Rescheduling support** with visual indicators

## 🛠 Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **ESLint** for code quality

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd kabba-2-rental

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── EquipmentInventory.tsx    # Equipment management interface
│   └── ScheduleManagement.tsx    # Schedule management interface
├── App.tsx                       # Main application component
├── main.tsx                      # Application entry point
└── index.css                     # Global styles with Tailwind
```

## 🎨 Design System

### Status Colors
- 🔴 **Damaged** - Red (Priority 1)
- 🟡 **Maint. Hold** - Yellow (Priority 2)  
- 🔵 **Rented** - Blue (Priority 3)
- 🟢 **Available** - Green (Priority 4)

### Icons
- **Damaged**: AlertTriangle
- **Maint. Hold**: Wrench
- **Rented**: UserCheck
- **Available**: CheckCircle

## 📱 Responsive Design

- **Mobile-first approach** with proper breakpoints
- **Flexible table layouts** with horizontal scrolling
- **Touch-friendly interface** elements
- **Optimized for tablets and desktops**

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- **TypeScript** for type safety
- **ESLint** with React and TypeScript rules
- **Consistent formatting** and naming conventions
- **Modular component architecture**

## 🚀 Deployment

The application is built with Vite and can be deployed to any static hosting service:

- **Netlify**
- **Vercel** 
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 📄 License

Private - Kabba 2 Rental Company

## 🤝 Contributing

This is a private company project. Please contact the development team for contribution guidelines.

---

**Built with ❤️ for Kabba 2 Rental**