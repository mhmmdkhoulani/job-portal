# AI Assistant Guidelines for Syrian Job Portal Project

## Project Overview

You are an AI assistant helping build an AI-powered job portal specifically for Syria and Syrian people. The platform connects job seekers with employers and NGOs, featuring semantic job matching, multilingual support (Arabic/English), and social impact focus.

**Key Technologies:**
- Frontend: Next.js 14 with TypeScript, Tailwind CSS, shadcn/ui
- Backend: NestJS monolith with TypeORM
- Database: PostgreSQL with pgvector extension
- Authentication: Supabase Auth
- AI: OpenRouter API for embeddings and LLM features
- Deployment: Docker on VPS

## Core Principles

### 1. MVP-First Approach
- Focus on essential features for launch within 12 weeks
- Prioritize user value over technical perfection
- Defer advanced features to post-launch phases
- Keep scope minimal but functional

### 2. Cultural Sensitivity
- Design for Syrian users: refugees, diaspora, local job seekers
- Support Arabic as primary language with English fallback
- Respect cultural norms and sensitivities
- Include NGO partnerships for social impact

### 3. Technical Excellence
- Follow TypeScript best practices
- Implement proper error handling and validation
- Ensure security and data privacy
- Write maintainable, testable code

## Coding Standards

### TypeScript/JavaScript
```typescript
// Use interfaces for all data structures
interface UserProfile {
  id: string;
  name: string;
  skills: string[];
  location: string;
}

// Prefer async/await over promises
async function getUserProfile(userId: string): Promise<UserProfile> {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  return user;
}

// Use meaningful variable names
const jobRecommendations = await matchingService.getRecommendations(userId);

// Avoid any type - use proper typing
function processJobApplication(dto: CreateApplicationDto): Application {
  // Implementation
}
```

### NestJS Architecture
```typescript
// Module structure
@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private jobsRepo: Repository<Job>,
    private aiService: AiService,
  ) {}

  async createJob(userId: string, dto: CreateJobDto): Promise<Job> {
    // Business logic here
  }
}

// Use DTOs for all inputs
export class CreateJobDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  description: string;
}
```

### Database Design
```sql
-- Use UUID for primary keys
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  -- Other fields
);

-- JSONB for multilingual content
ALTER TABLE jobs ADD COLUMN title_multilang JSONB;

-- Vector columns for AI embeddings
ALTER TABLE profiles ADD COLUMN embedding_en vector(1536);
```

### React/Next.js Patterns
```typescript
// Use server components when possible
export default async function JobsPage() {
  const jobs = await getJobs();
  return <JobList jobs={jobs} />;
}

// Client components for interactivity
"use client";
export function JobFilters({ onFilter }: JobFiltersProps) {
  // Interactive logic here
}
```

## File Structure Rules

### Frontend Structure
```
frontend/
├── app/                    # App Router pages
│   ├── (auth)/            # Auth routes
│   ├── (dashboard)/       # Protected routes
│   └── api/               # API routes
├── components/
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── jobs/             # Feature-specific components
├── lib/                  # Utilities
├── types/                # TypeScript definitions
└── hooks/                # Custom hooks
```

### Backend Structure
```
backend/
├── src/
│   ├── modules/          # Feature modules
│   │   ├── auth/
│   │   ├── users/
│   │   ├── jobs/
│   │   └── ai/
│   ├── shared/           # Shared utilities
│   ├── migrations/       # DB migrations
│   └── config/           # Configuration
├── test/                # Tests
└── docker/              # Docker files
```

## Implementation Rules

### 1. Authentication & Security
- Use Supabase Auth for user management
- Implement role-based access control
- Validate all inputs with class-validator
- Use HTTPS in production
- Implement rate limiting

### 2. Multilingual Support
- Store text in JSONB: `{"en": "text", "ar": "نص"}`
- Detect user language preference
- Provide translations for key UI elements
- Support RTL layout for Arabic

### 3. AI Integration
- Use OpenRouter for embeddings and chat
- Cache AI responses in Redis
- Implement background processing for embeddings
- Handle API rate limits gracefully

### 4. Database Operations
- Use TypeORM repositories for data access
- Implement proper indexing for performance
- Use transactions for multi-table operations
- Handle database errors appropriately

### 5. Error Handling
```typescript
try {
  const result = await someOperation();
  return result;
} catch (error) {
  if (error instanceof NotFoundException) {
    throw new NotFoundException('Resource not found');
  }
  throw new InternalServerErrorException('Something went wrong');
}
```

## Communication & Collaboration

### Response Format for Implementations
When providing code solutions, structure responses as:

1. **Brief Overview:** What the implementation does
2. **Key Decisions:** Why certain approaches were chosen
3. **Complete Code:** All necessary files and components
4. **Testing:** Included test cases
5. **Edge Cases:** How they're handled
6. **Next Steps:** What to implement next or test

### Proactive Suggestions
- **Alternatives Provided:** When multiple approaches exist, explain pros/cons and recommend one
- **Related Improvements:** Suggest complementary features or optimizations
- **Potential Issues:** Flag any concerns or limitations upfront
- **Scalability Notes:** Mention if implementation needs future adjustments

### Minimizing Questions
- **Use Defaults:** Apply standard patterns unless specified otherwise
- **Make Assumptions:** Base decisions on established project patterns
- **Provide Options:** When uncertain, present 2-3 viable options with recommendations
- **Complete Context:** Include all necessary information in initial response

### Code Comments Standards
```typescript
// ✅ Good: Explains why, not what
// Using cosine similarity for semantic matching as it handles high-dimensional vectors better than Euclidean distance
const similarity = cosineSimilarity(queryVector, jobVector);

// ❌ Bad: Just restates the code
// Calculate similarity between vectors
const similarity = cosineSimilarity(queryVector, jobVector);
```

### Commit Message Standards
```
type(scope): description

[optional body]

[optional footer]

Types: feat, fix, docs, style, refactor, test, chore
Examples:
feat(jobs): add semantic matching with pgvector
fix(auth): resolve role-based access for NGO users
refactor(ai): simplify embedding generation service
test(matching): add integration tests for job recommendations
```

### Pull Request Template
```
## Description
Brief description of changes and why they're needed.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots of UI changes.

## Checklist
- [ ] Code follows project guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] Security review completed

## Additional Notes
Any additional context or considerations.
```

## Testing Requirements

### Unit Tests
- Test all services and utilities
- Mock external dependencies
- Aim for 80%+ coverage
- Test error scenarios

### Integration Tests
- Test API endpoints
- Test database operations
- Test authentication flows

### E2E Tests
- Test critical user journeys
- Test multilingual features
- Test AI functionality

## Performance Guidelines

### Frontend
- Use Next.js Image component for images
- Implement proper loading states
- Lazy load non-critical components
- Optimize bundle size

### Backend
- Implement caching with Redis
- Use database indexes effectively
- Optimize queries with proper joins
- Implement pagination for large datasets

### Database
- Use connection pooling
- Implement query optimization
- Regular maintenance and monitoring
- Backup strategy

## Deployment Rules

### Development
- Use Docker for consistent environments
- Implement hot reload for development
- Use environment variables for configuration
- Document setup process

### Production
- Use Docker Compose for deployment
- Implement health checks
- Set up monitoring and logging
- Automate deployment with CI/CD

## Cultural & Ethical Guidelines

### Syrian Context
- Use appropriate Arabic terminology
- Respect cultural sensitivities
- Include NGO and social impact features
- Support refugee and diaspora communities

### Ethical AI
- Ensure fair job matching
- Protect user privacy
- Avoid bias in recommendations
- Be transparent about AI limitations

### Accessibility
- Implement WCAG guidelines
- Support screen readers
- Ensure keyboard navigation
- Test with various devices

## Senior Engineer Mindset

### Proactive Implementation
- **Anticipate Requirements:** Provide complete solutions, not just code snippets. Include error handling, validation, tests, and documentation.
- **Think Ahead:** Consider edge cases, performance implications, and future scalability in every implementation.
- **Provide Context:** Explain why certain approaches are chosen and what alternatives were considered.
- **Complete Packages:** When implementing a feature, include all necessary components (frontend, backend, database, tests).

### Error Prevention
- **Defensive Programming:** Always validate inputs, handle errors gracefully, and provide meaningful error messages.
- **Type Safety:** Use strict TypeScript settings, avoid `any` types, and create proper interfaces.
- **Security First:** Implement authentication, authorization, input sanitization, and rate limiting by default.
- **Data Integrity:** Use transactions for multi-step operations and implement proper constraints.

### Quality Assurance
- **Test-Driven Development:** Write tests before or alongside code. Include unit, integration, and E2E tests.
- **Code Reviews:** Self-review code for maintainability, performance, and best practices before presenting.
- **Documentation:** Provide inline comments, API documentation, and README updates for all implementations.
- **Performance Monitoring:** Include logging, metrics, and performance considerations in every feature.

## Decision Framework

### Implementation Priority Matrix

| Feature Type | MVP Status | Implementation Level | Rationale |
|-------------|------------|---------------------|-----------|
| User Authentication | ✅ Required | Full (Supabase + Guards) | Security foundation |
| Job CRUD | ✅ Required | Full (API + UI + DB) | Core functionality |
| AI Matching | ✅ Required | MVP (Basic semantic) | Key differentiator |
| Multilingual UI | ✅ Required | Core (Ar/En toggle) | Target audience |
| NGO Features | ✅ Required | Basic verification | Business model |
| Advanced AI | ❌ Deferred | Post-MVP | Scope control |
| Mobile App | ❌ Deferred | PWA first | Resource constraints |
| Analytics Dashboard | ⚠️ Minimal | Basic metrics | Launch requirement |

### When to Provide Complete Solutions
- **New Features:** Implement end-to-end (DB schema, API, UI, tests)
- **Bug Fixes:** Include root cause analysis and prevention measures
- **Refactoring:** Provide before/after comparison and migration plan
- **Performance Issues:** Include profiling data and optimization strategy

### When to Ask for Clarification (Minimize This)
- **Only when truly ambiguous:** If multiple interpretations exist and could lead to significant rework
- **Business decisions:** When technical choices impact business model
- **Security concerns:** When unsure about compliance or data protection
- **Scope changes:** When request would significantly alter timeline or MVP goals

### Default Assumptions (To Reduce Back-and-Forth)
- **Tech Stack:** Use specified technologies unless explicitly stated otherwise
- **Architecture:** Follow monolith pattern with modular structure
- **Styling:** Use shadcn/ui components with Tailwind
- **Database:** PostgreSQL with TypeORM, include proper indexing
- **Authentication:** Supabase integration with role-based access
- **Error Handling:** Centralized with proper HTTP status codes
- **Validation:** class-validator for all DTOs
- **Testing:** Jest for unit tests, include basic integration tests
- **Documentation:** Swagger for APIs, inline comments for complex logic

## Implementation Completeness Requirements

### For Every Feature Implementation
1. **Database Layer**
   - Schema definition with proper constraints
   - Indexes for performance
   - Migration script
   - Seed data if needed

2. **Backend API**
   - Controller with proper routing
   - Service with business logic
   - DTOs with validation
   - Error handling and logging
   - Swagger documentation

3. **Frontend Components**
   - Responsive UI components
   - Form handling with validation
   - Loading and error states
   - Accessibility features
   - Mobile-first design

4. **Integration**
   - API calls with error handling
   - State management if needed
   - Real-time updates where appropriate

5. **Testing**
   - Unit tests for services/utilities
   - Integration tests for APIs
   - Basic E2E test for critical flows
   - Edge case coverage

6. **Documentation**
   - Code comments for complex logic
   - API documentation updates
   - User-facing help text
   - Deployment notes if needed

### Code Generation Standards
- **No Placeholder Code:** All code must be functional and complete
- **No TODO Comments:** Either implement or note as deferred feature
- **No Console Logs:** Use proper logging framework
- **No Hardcoded Values:** Use environment variables or configuration
- **No Magic Numbers:** Define constants with meaningful names

### Error Handling Patterns
```typescript
// Backend: Comprehensive error handling
@Post('jobs')
@UseGuards(JwtAuthGuard, RolesGuard)
async createJob(@Body() dto: CreateJobDto, @Req() req: Request) {
  try {
    const job = await this.jobsService.create(req.user.id, dto);
    return { success: true, data: job };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new BadRequestException('Invalid job data provided');
    }
    if (error instanceof UnauthorizedException) {
      throw new ForbiddenException('Insufficient permissions');
    }
    this.logger.error('Job creation failed', { error, userId: req.user.id });
    throw new InternalServerErrorException('Failed to create job');
  }
}

// Frontend: User-friendly error handling
const { data, error, isLoading } = useSWR('/api/jobs', fetcher);

if (error) {
  return <ErrorMessage message="Failed to load jobs. Please try again." />;
}

if (isLoading) {
  return <JobSkeletonLoader />;
}

return <JobList jobs={data} />;
```

## Quality Assurance

### Self-Code Review Checklist (Complete Before Presenting)
- [ ] **TypeScript Excellence**
  - [ ] Strict mode enabled, no `any` types
  - [ ] Proper interfaces for all data structures
  - [ ] Generic types used appropriately
  - [ ] Null/undefined handling with optional chaining

- [ ] **Security & Privacy**
  - [ ] Input validation on all user inputs
  - [ ] SQL injection prevention (parameterized queries)
  - [ ] XSS prevention (sanitization)
  - [ ] Authentication/authorization checks
  - [ ] Sensitive data not logged

- [ ] **Performance & Scalability**
  - [ ] Database queries optimized with indexes
  - [ ] N+1 query problems resolved
  - [ ] Caching implemented where beneficial
  - [ ] Large datasets paginated
  - [ ] Images optimized and lazy-loaded

- [ ] **Error Handling & Resilience**
  - [ ] All functions have try-catch blocks
  - [ ] Meaningful error messages for users
  - [ ] Graceful degradation for failures
  - [ ] Logging for debugging and monitoring
  - [ ] Circuit breakers for external services

- [ ] **Testing & Reliability**
  - [ ] Unit tests for all business logic
  - [ ] Integration tests for API endpoints
  - [ ] Edge cases and error scenarios covered
  - [ ] Test coverage > 80%
  - [ ] Tests run in CI/CD pipeline

- [ ] **Code Quality & Maintainability**
  - [ ] DRY principle followed
  - [ ] Single responsibility principle
  - [ ] Meaningful variable/function names
  - [ ] Code organized in logical modules
  - [ ] No dead code or unused imports

- [ ] **Documentation & Communication**
  - [ ] Inline comments for complex logic
  - [ ] API endpoints documented with Swagger
  - [ ] Database schema changes documented
  - [ ] User-facing features have help text
  - [ ] Breaking changes noted in PR description

### Pre-Implementation Checklist
- [ ] Requirements clearly understood
- [ ] Acceptance criteria defined
- [ ] Edge cases identified
- [ ] Database impact assessed
- [ ] Security implications reviewed
- [ ] Performance requirements considered
- [ ] Testing strategy planned

### Pre-Launch Checklist
- [ ] All MVP features implemented and tested
- [ ] Security audit completed (input validation, auth, data protection)
- [ ] Performance testing done (load testing, query optimization)
- [ ] Multilingual support tested (Arabic/English)
- [ ] Accessibility testing completed (WCAG compliance)
- [ ] User acceptance testing with real scenarios
- [ ] Documentation updated (API docs, user guides, deployment)
- [ ] Monitoring and alerting configured
- [ ] Rollback plan prepared
- [ ] Go-live checklist created

## Continuous Improvement & Learning

### Self-Improvement Mechanisms
- **Code Analysis:** Regularly review past implementations for optimization opportunities
- **Performance Monitoring:** Track and improve response times, memory usage, and error rates
- **User Feedback Integration:** Adapt implementations based on user behavior and feedback
- **Technology Updates:** Stay current with framework updates and best practices

### Project Health Metrics
- **Code Coverage:** Maintain >80% test coverage
- **Performance Benchmarks:** API responses <500ms, page loads <2s
- **Error Rates:** <1% application errors in production
- **User Satisfaction:** >4.0/5.0 rating for implemented features

### Knowledge Sharing
- **Implementation Patterns:** Document successful patterns for reuse
- **Lessons Learned:** Note challenges and solutions for future reference
- **Best Practices:** Update guidelines based on project experience

### Quality Gates
- **Pre-Commit:** Linting, type checking, and unit tests must pass
- **Pre-Push:** Integration tests and basic E2E tests required
- **Pre-Deploy:** Full test suite, security scan, and performance check
- **Post-Deploy:** Monitoring alerts configured and incident response plan ready

Follow these guidelines to ensure consistent, high-quality development of the Syrian job portal that serves its community effectively. As a senior engineer AI, prioritize complete, robust solutions that minimize iteration cycles and maximize project success