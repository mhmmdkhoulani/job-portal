# AI Job Portal for Syria: Project Structure & Build Plan

## Overview

This document outlines the complete file structure and phased build plan for the AI-powered job portal targeting Syria and Syrian people. The project uses a monolith architecture with Next.js frontend, NestJS backend, PostgreSQL with pgvector for AI embeddings, and Supabase for authentication.

## Project Root Structure

```
job-portal-syria/
├── frontend/                 # Next.js 14 application
├── backend/                  # NestJS monolith
├── docker/                   # Docker configurations
├── docs/                     # Documentation
├── scripts/                  # Build and deployment scripts
├── .github/                  # GitHub Actions CI/CD
├── docker-compose.yml        # Local development
├── docker-compose.prod.yml   # Production deployment
├── package.json              # Root package.json for monorepo management
├── .env.example              # Environment variables template
└── README.md                 # Project documentation
```

## Frontend Structure (Next.js 14)

```
frontend/
├── app/                      # App Router directory
│   ├── (auth)/               # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/          # Protected routes
│   │   ├── jobs/
│   │   ├── profile/
│   │   ├── applications/
│   │   └── employer/
│   ├── api/                  # API routes (simple operations)
│   ├── layout.tsx            # Root layout with providers
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global styles
│   └── loading.tsx           # Loading UI
├── components/               # Reusable components
│   ├── ui/                   # shadcn/ui components
│   ├── forms/                # Form components
│   ├── jobs/                 # Job-related components
│   ├── auth/                 # Authentication components
│   └── layout/               # Layout components
├── lib/                      # Utilities and configurations
│   ├── supabase.ts           # Supabase client
│   ├── api.ts                # API client functions
│   ├── utils.ts              # Utility functions
│   └── validations.ts        # Form validations
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
├── public/                   # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

## Backend Structure (NestJS)

```
backend/
├── src/
│   ├── app.module.ts         # Root module
│   ├── main.ts               # Application entry point
│   ├── config/               # Configuration modules
│   │   ├── database.config.ts
│   │   ├── supabase.config.ts
│   │   └── redis.config.ts
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── strategies/
│   │   │   └── guards/
│   │   ├── users/            # User management
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── jobs/             # Job postings
│   │   │   ├── jobs.module.ts
│   │   │   ├── jobs.service.ts
│   │   │   ├── jobs.controller.ts
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── applications/     # Job applications
│   │   │   ├── applications.module.ts
│   │   │   ├── applications.service.ts
│   │   │   └── entities/
│   │   ├── ai/               # AI matching service
│   │   │   ├── ai.module.ts
│   │   │   ├── ai.service.ts
│   │   │   ├── openrouter.service.ts
│   │   │   └── dto/
│   │   ├── companies/        # Company profiles
│   │   │   ├── companies.module.ts
│   │   │   ├── companies.service.ts
│   │   │   └── entities/
│   │   ├── ngos/             # NGO management
│   │   │   ├── ngos.module.ts
│   │   │   ├── ngos.service.ts
│   │   │   └── entities/
│   │   └── notifications/    # Email notifications
│   │       ├── notifications.module.ts
│   │       ├── notifications.service.ts
│   │       └── templates/
│   ├── shared/               # Shared utilities
│   │   ├── entities/         # Base entities
│   │   ├── dto/              # Common DTOs
│   │   ├── guards/           # Custom guards
│   │   ├── interceptors/     # Custom interceptors
│   │   ├── filters/          # Exception filters
│   │   └── utils/            # Utility functions
│   ├── migrations/           # Database migrations
│   └── common/               # Common decorators, pipes
├── test/                     # Test files
├── docker/                   # Docker files
│   ├── Dockerfile
│   └── .dockerignore
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env
```

## Database Schema (PostgreSQL)

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";

-- Users table (managed by Supabase auth)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_id UUID UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('job_seeker', 'employer', 'ngo', 'admin')),
  email_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles table (polymorphic)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  location VARCHAR(255),
  bio TEXT,
  bio_multilang JSONB, -- {"en": "bio", "ar": "السيرة الذاتية"}
  avatar_url TEXT,
  resume_url TEXT,
  skills TEXT[],
  experience_years INTEGER,
  -- AI embeddings for semantic matching
  embedding_en vector(1536),
  embedding_ar vector(1536),
  -- Employer specific
  company_name VARCHAR(255),
  company_description TEXT,
  company_description_multilang JSONB,
  company_website VARCHAR(255),
  is_ngo BOOLEAN DEFAULT FALSE,
  ngo_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  title_multilang JSONB, -- {"en": "title", "ar": "العنوان"}
  description TEXT NOT NULL,
  description_multilang JSONB,
  location VARCHAR(255),
  job_type VARCHAR(50), -- full-time, part-time, contract, remote
  salary_min INTEGER,
  salary_max INTEGER,
  required_skills TEXT[],
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'expired', 'closed')),
  views INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  -- AI embeddings
  embedding_en vector(1536),
  embedding_ar vector(1536),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cover_letter TEXT,
  resume_url TEXT,
  status VARCHAR(20) DEFAULT 'applied' CHECK (status IN ('applied', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(job_id, applicant_id)
);

-- NGO applications table
CREATE TABLE ngo_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  organization_name VARCHAR(255) NOT NULL,
  tax_id VARCHAR(100),
  proof_document_url TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_supabase_id ON users(supabase_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_applicant_id ON applications(applicant_id);
CREATE INDEX idx_applications_status ON applications(status);
-- Vector indexes for AI search
CREATE INDEX idx_profiles_embedding_en ON profiles USING ivfflat (embedding_en vector_cosine_ops);
CREATE INDEX idx_profiles_embedding_ar ON profiles USING ivfflat (embedding_ar vector_cosine_ops);
CREATE INDEX idx_jobs_embedding_en ON jobs USING ivfflat (embedding_en vector_cosine_ops);
CREATE INDEX idx_jobs_embedding_ar ON jobs USING ivfflat (embedding_ar vector_cosine_ops);
```

## Build Plan: Phased Development (12 Weeks)

### Phase 1: Foundation & Authentication (Weeks 1-2)

#### Week 1: Project Setup & Infrastructure
- [ ] Set up GitHub repository with project structure
- [ ] Initialize Next.js frontend with TypeScript, Tailwind, shadcn/ui
- [ ] Initialize NestJS backend with TypeORM
- [ ] Set up PostgreSQL with pgvector extension
- [ ] Configure Supabase project and authentication
- [ ] Set up Docker development environment
- [ ] Create basic CI/CD pipeline with GitHub Actions

#### Week 2: Authentication & User Management
- [ ] Implement Supabase auth integration in Next.js
- [ ] Create login/register pages with multilingual support
- [ ] Build NestJS auth module with JWT validation
- [ ] Create user profile entities and basic CRUD
- [ ] Implement role-based access control (job_seeker, employer, ngo)
- [ ] Add email verification flow

### Phase 2: Core Features (Weeks 3-6)

#### Week 3: Job Posting & Listing
- [ ] Build job creation form with multilingual fields
- [ ] Implement job listing page with filters
- [ ] Add job search functionality
- [ ] Create employer dashboard
- [ ] Integrate Google AdSense for monetization

#### Week 4: Job Applications & Profiles
- [ ] Build job seeker profile creation
- [ ] Implement job application flow
- [ ] Add resume upload with S3 storage
- [ ] Create application tracking for both sides
- [ ] Build job seeker dashboard

#### Week 5: AI Matching MVP
- [ ] Integrate OpenRouter API for embeddings
- [ ] Implement basic semantic matching (keyword + vector)
- [ ] Add match scoring and recommendations
- [ ] Create AI-powered job suggestions
- [ ] Test with sample data

#### Week 6: NGO Features & Polish
- [ ] Build NGO application and verification system
- [ ] Add NGO-specific features (unlimited posts)
- [ ] Implement email notifications
- [ ] Add basic analytics dashboard
- [ ] Polish UI/UX and mobile responsiveness

### Phase 3: Testing & Launch (Weeks 7-9)

#### Week 7: Testing & QA
- [ ] Write unit tests for backend services
- [ ] Create integration tests for API endpoints
- [ ] Implement E2E tests with Playwright
- [ ] Performance testing and optimization
- [ ] Security testing and fixes

#### Week 8: Beta Testing & Feedback
- [ ] Deploy to staging environment
- [ ] Recruit 10-15 beta testers (NGOs + job seekers)
- [ ] Collect feedback and fix critical issues
- [ ] Prepare marketing materials
- [ ] Set up analytics tracking

#### Week 9: Production Deployment
- [ ] Final security review
- [ ] Production deployment with Docker
- [ ] SSL certificate setup
- [ ] Monitoring and alerting setup
- [ ] Launch announcement preparation

### Phase 4: Post-Launch Optimization (Weeks 10-12)

#### Week 10: Monitoring & Support
- [ ] Monitor user engagement and performance
- [ ] Provide customer support for initial users
- [ ] Fix any production issues
- [ ] Optimize database queries

#### Week 11: Feature Enhancements
- [ ] Improve AI matching algorithm
- [ ] Add advanced search filters
- [ ] Implement real-time notifications
- [ ] Enhance mobile experience

#### Week 12: Growth & Analytics
- [ ] Analyze user behavior and conversion
- [ ] Implement A/B testing for UI improvements
- [ ] Plan for scaling (user acquisition, partnerships)
- [ ] Prepare funding materials

## Key Technical Decisions

### Authentication Strategy
- **Supabase Auth:** For MVP speed and security
- **Custom JWT Validation:** In NestJS for API protection
- **Role-Based Access:** Implemented in database and guards

### Multilingual Implementation
- **JSONB Storage:** For flexible language fields
- **Language Detection:** Based on user preference or browser locale
- **Dual Embeddings:** Separate vectors for English and Arabic

### AI Architecture
- **OpenRouter:** For LLM access and embeddings
- **pgvector:** For efficient vector similarity search
- **Background Processing:** For embedding generation on content updates

### Deployment Strategy
- **Docker:** For consistent environments
- **VPS Hosting:** Cost-effective for MVP
- **CI/CD:** Automated testing and deployment

## Risk Mitigation

### Technical Risks
- **AI API Limits:** Monitor usage and implement caching
- **Database Performance:** Regular query optimization
- **Scalability:** Design for horizontal scaling from day one

### Business Risks
- **User Acquisition:** Focus on NGO partnerships for initial users
- **Market Access:** Start with diaspora communities
- **Monetization:** Diversify beyond ads (premium features, partnerships)

### Development Risks
- **Solo Development:** Break work into small, testable chunks
- **Technology Changes:** Use stable, well-documented tools
- **Timeline Pressure:** Focus on MVP essentials, defer nice-to-haves

## Success Metrics

### Launch Targets (Week 9)
- ✅ 25 NGOs registered
- ✅ 250 job seekers active
- ✅ 100 job posts created
- ✅ 50% user retention (7 days)
- ✅ < 2s page load times

### Month 1 Targets
- ✅ 500 total users
- ✅ 200 active jobs
- ✅ $50+ ad revenue
- ✅ 40% user satisfaction (NPS)

### Month 3 Targets
- ✅ 2,000 total users
- ✅ 500 active jobs
- ✅ $200+ monthly revenue
- ✅ Positive user feedback from Syrian community

This plan provides a structured path to launch a functional, AI-powered job portal for the Syrian community within 12 weeks, with room for iteration based on user feedback.