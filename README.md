# Dr. Oluropo Apalowo's Agricultural Research Website

A professional website showcasing Dr. Oluropo Apalowo's agricultural research work, expertise, and resources for the agricultural community in Nigeria.

## 🌱 Overview

This website serves as a comprehensive digital platform for Dr. Oluropo Apalowo, an agricultural researcher at Nnamdi Azikiwe University. The site includes informational pages about Dr. Apalowo's background and research, a blog for sharing insights, a market watch section for agricultural price trends, and a directory of trusted agricultural sellers.

## 🚀 Features

### Key Pages

- **Home**: Welcome page with featured content, latest blog posts, and market watch highlights
- **About**: Dr. Apalowo's biography, expertise areas, key achievements, and educational background
- **Research**: Details on research focus areas, current projects, and research impact
- **Blog**: Articles on agricultural science, farming practices, and research findings
- **Market Watch**: Agricultural commodity price tracking with trend analysis
- **Trusted Sellers**: Directory of verified agricultural producers and suppliers
- **Contact**: Contact form, location map, and direct contact information

### Admin Dashboard

A secure admin area allows for content management:

- Blog post creation and editing
- Market price data updates
- Trusted seller verification and management
- User message management
- Website analytics

## 🔧 Technical Stack

- **Framework**: [Next.js](https://nextjs.org) with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com) for responsive design
- **Database**: PostgreSQL with [Prisma ORM](https://prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org) for secure admin access
- **Charts**: [Recharts](https://recharts.org) for market trend visualization
- **Tables**: [TanStack Table](https://tanstack.com/table) for data display
- **Icons**: [Lucide React](https://lucide.dev) for consistent iconography

## 🏗️ Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/      # Reusable React components
│   │   ├── Admin/       # Admin dashboard components
│   │   ├── Blog/        # Blog-related components
│   │   ├── Contact/     # Contact form components
│   │   ├── Layout/      # Header, footer, and layout components
│   │   ├── MarketWatch/ # Market data components
│   │   ├── Sellers/     # Trusted sellers components
│   │   └── ui/          # UI utility components
│   └── lib/            # Utility functions and shared code
└── DEPLOYMENT.md       # Deployment instructions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/OluropoA/my-agri-site.git
cd my-agri-site
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables by copying `.env.example` to `.env.local` and filling in required values

4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) to view the site

## 📝 Brand Identity

The website adheres to Dr. Apalowo's brand identity guidelines:

- **Colors**: 
  - Forest Green (#2D5016) - Primary
  - Golden Harvest (#DAA520) - Accent
  - Earth Brown (#8B4513) - Tertiary

- **Typography**:
  - Headings: Montserrat (Bold, Semi-Bold)
  - Body: Open Sans (Regular, Light)

- **Brand Voice**: Professional, educational, authoritative yet accessible

## 📋 Implementation Notes

- The site uses server components for improved SEO and performance
- Form submissions are handled through server actions
- Authentication restricts admin access to authorized personnel
- Responsive design ensures usability across devices

## 🔄 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions, including:

- Vercel deployment (recommended)
- Self-hosted server options
- Docker containerization
- Environment variable configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Dr. Oluropo Apalowo - Content & Requirements
- Development Team - Implementation
