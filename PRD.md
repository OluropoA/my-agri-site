
# Product Requirements Document (PRD)  
**Product:** Dr. Oluropo Apalowo – Agritech Community Portal  
**Goal:** Empower agricultural experts and communities with an extensible, customizable, and future-proof platform for blogging, market insight, collaboration, and outreach.

***

## 1. **Vision & Objectives**

- **Ultimate Flexibility:** Own every aspect of logic, data, and UI. No vendor lock-in.
- **Unbounded Extensibility:** APIs, content models, and UI/UX can be changed as needs and innovations arise.
- **Innovation Platform:** Integrate AI/ML tools, data visualizations, real-time price feeds, or any emerging technology with zero limits.
- **Community-Driven:** Enable expert and community interaction far deeper than basic blog comments (future: Q&A, forums, events, real-time chat).
- **Open Ecosystem:** Data and integrations are open. You can plug in to external partners, marketplaces, or research consortia.

***

## 2. **Core Features**

### A. **Content Management**
- **Blog Module:**
  - Multi-category articles and posts, authored by Dr. Apalowo or future collaborators
  - Rich text, images, code/math notation, embedded media
  - Flexible tagging, search, and filtering
  - Moderated and open comment system with threading

- **Static & Dynamic Pages:**
  - About, Research Interests (with dynamic lists: projects, publications)
  - Contact (secure form, social links)
  - Extensible to any new content type (case studies, videos, etc.)

### B. **Data & Insights**
- **Market Watch:**  
  - **Editable price tables:** Track food commodity prices by market/state/week  
  - **Data ingestion:** Upload CSV/XLS, form entry or (later) automated scraping/API.
  - **Dynamic visualizations:** Interactive, filterable charts/trends for prices.
  - **Admin commentary:** Weekly/periodic market insights alongside data.

- **Trusted Sellers Directory:**  
  - **Relational directory:** Filter sellers by state, product, verified status
  - **Seller profile pages:** With products, contact info, feedback/comments
  - **Easy extensibility** (e.g. add ratings, certifications, trade history later)

### C. **Workflow & Admin**
- **Role-based Permissions:** Distinct admin/author/user roles; scalable to “teams” with custom privileges.
- **Custom Admin Dashboard:**  
  - CRUD for all important data models (posts, prices, sellers, comments)
  - Bulk/batch actions and import/export
  - Easy extension to new workflows (analytics, in-app AI, partner access)

### D. **User Experience**
- **Responsive UI:** Modern, polished, a joy on mobile and desktop.
- **Accessibility-first** (a11y): Ensuring all users have equal access.
- **Customizable Branding:** Full creative control for logos, color, layout.
- **Performance:** Optimized for fast load times and big tables.

### E. **APIs & Integration**
- **Open API Layer:** Built-in API for all resources, so you can integrate with other tools or launch spin-off apps (mobile, dashboards, data science)
- **SSG/SSR Support:** Enables content to be SEO-perfect and instantly available.
- **Plugin System (future-proofed):** System designed so you can plug in AI, analytics, live chat, or any evolving workflow.

***

## 3. **Technical Requirements**

- **Stack:**  
  - Next.js (App Router) + TypeScript  
  - Tailwind CSS  
  - Prisma ORM  
  - Supabase PostgreSQL  
  - NextAuth (admin user support)  
  - Chart/table/data libraries (TanStack Table, Recharts or Chart.js)
- **File Structure:** Canonical, isolated components and API routes per workflow.
- **Environment:** Easy dev/prod switch, clean environment config.
- **Testing:** Scaffold for unit/integration/E2E (future extensibility).
- **Deployment:** Vercel-native, with clear CI/CD and preview flow.

***

## 4. **Non-Functional Requirements**

- **Scalable:** No vendor limits; add features, models, or integrations easily.
- **Secure:** Auth for user data; admin panels protected; anti-bot/spam for public forms/comments.
- **Maintainable:** Modern coding best practices, isolated features, documentation (in-code and README).
- **Ownership:** All source, infrastructure, and data is under your control—no SaaS hostage risks.

***

## 5. **Roadmap & Extensibility**

- **Phase 1:**  
  - Home, About, Research, Contact, Blog, Market Watch, Trusted Sellers live with admin dashboard.
  - Initial user feedback loop + docs.

- **Phase 2+:**  
  - Add new expert workflows (article submission, review, events, newsletter, SMS, WhatsApp integration, etc.)
  - ML/AI powered features (e.g., price prediction, smart insights).
  - Data connectors (APIs to government or market feeds).
  - Community upgrade: Forums, Q&A, chat, reputation systems.

***

## 6. **Why This Approach Beats SaaS "Walled Gardens"**

- **No Feature Ceiling:** You decide what to build and when—no daylight between your ambition and your tech.
- **Data Freedom:** Your data is always yours; no vendor lock-in.
- **Unblocked Integrations:** Connect to anything: AI models, email/SMS gateways, agri APIs, payment rails, etc.
- **Rapid Innovation:** Deploy new research-driven features the minute they make sense.
- **Future-proofed:** Never rely on whether a vendor will support a feature, keep prices stable, or stay alive.

***

## 7. **Acceptance Criteria**

- All entities and workflows above function independently and can be composed in new ways as needs arise.
- No part of the workflow is dependent on external (SaaS) limitations—full control at every layer.
- Admins can add, edit, and remove any content type without writing code.
- Open API enables new integrations and innovations on top of the platform.

***

> This PRD establishes your platform as an **innovation hub**—inviting constant evolution and ensuring your vision never falls short because of commercial software limits.

## **Project Structure**

```plaintext
my-agri-site/
│
├── prisma/                    # Prisma database schema and migrations
│   ├── schema.prisma
│   └── migrations/
│
├── public/                    # Static assets (images, logos, favicon)
│
├── src/
│   ├── components/            # All reusable React components
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Blog/
│   │   │   ├── BlogList.tsx
│   │   │   ├── BlogPost.tsx
│   │   │   └── BlogCommentForm.tsx
│   │   ├── MarketWatch/
│   │   │   ├── MarketTable.tsx
│   │   │   ├── PriceChart.tsx
│   │   │   ├── MarketCommentary.tsx
│   │   │   └── MarketCommentForm.tsx
│   │   ├── Sellers/
│   │   │   ├── SellerList.tsx
│   │   │   ├── SellerProfile.tsx
│   │   │   └── SellerFilter.tsx
│   │   └── ...other shared components
│   │
│   ├── app/                   # Next.js routes and pages (App Router)
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Home
│   │   ├── about/page.tsx
│   │   ├── research/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx       # Blog list
│   │   │   └── [slug]/page.tsx# Single blog post
│   │   ├── market-watch/page.tsx
│   │   ├── trusted-sellers/page.tsx
│   │   ├── api/               # API routes for CRUD
│   │   │   ├── blog/
│   │   │   ├── price/
│   │   │   ├── sellers/
│   │   │   └── comments/
│   │   ├── admin/             # Admin dashboard and tools
│   │   │   └── page.tsx
│   │   └── auth/              # NextAuth routes if needed
│   │       └── [...nextauth]/route.ts
│   │
│   ├── lib/                   # Helpers: database connection, utils, api helpers, auth helpers
│   ├── styles/                # Tailwind/global/app CSS
│   └── types/                 # TypeScript types and interfaces
│
├── .env                       # Environment variables (never commit to repo)
├── .env.example               # Example environment file (commit this)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
```

***

## **Notes:**

- All major features (Blog, Market Watch, Sellers, Admin) have their own folders for clear separation.
- The `api/` directory is ready for CRUD endpoints, following the Next.js API routes convention.
- Components are atomic and domain-scoped for maintainability.
- `styles/` contains Tailwind config, base CSS, and any modules.
- Prisma is ready for database migrations and relation modeling.
- `auth/` folder for NextAuth endpoint route.
- Place static images/logos in `public/`.

***

**This structure provides:**
- Ultimate flexibility and clarity for big projects, team work, open API, and easy future expansion!
- Fast lookup and scaling for all content/workflow features.
