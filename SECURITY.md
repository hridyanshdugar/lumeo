# Security Considerations

## Current Implementation

This portfolio generator includes **client-side authentication** for demonstration purposes. The authentication is designed to prevent casual unauthorized access to the manifest editor.

### What's Implemented

1. **Session Management**: 30-minute auto-expiring sessions
2. **Protected Routes**: Editor and theme switcher only accessible when authenticated
3. **Environment Variables**: Credentials stored in `.env` files (not hardcoded)
4. **Session Storage**: Authentication state persists across page refreshes

### Important Security Limitations

⚠️ **This is NOT production-ready authentication**. The current implementation has these limitations:

1. **Client-Side Only**: All authentication logic runs in the browser and can be bypassed by inspecting code
2. **No Encryption**: Credentials are compared in plain text
3. **No Backend**: Changes to the manifest are only stored in browser state (lost on refresh)
4. **Timing Attacks**: While mitigated, still vulnerable
5. **No Rate Limiting**: Brute force attacks are possible

## For Production Use

To make this production-ready, you **MUST** implement:

### Backend Requirements

1. **Authentication Server**
   - Use established frameworks (Passport.js, Auth0, Firebase Auth)
   - Hash passwords with bcrypt or argon2
   - Implement JWT tokens or secure session cookies
   - Add rate limiting (express-rate-limit)

2. **API Endpoints**
   ```
   POST /api/auth/login    - Authenticate user
   POST /api/auth/logout   - Invalidate session
   GET  /api/manifest      - Get portfolio data
   PUT  /api/manifest      - Update portfolio data (authenticated only)
   ```

3. **Database**
   - Store manifest data in a database (MongoDB, PostgreSQL)
   - Store user credentials securely (hashed passwords)
   - Track sessions and their expiration

### Security Best Practices

1. **HTTPS Only**: Never transmit credentials over HTTP
2. **CSRF Protection**: Implement CSRF tokens for state-changing operations
3. **Input Validation**: Validate and sanitize all manifest JSON on the server
4. **Content Security Policy**: Set appropriate CSP headers
5. **Audit Logging**: Log all authentication attempts and manifest changes
6. **2FA**: Consider adding two-factor authentication
7. **Password Requirements**: Enforce strong password policies

### Recommended Tech Stack

- **Backend**: Node.js + Express, Next.js API Routes, or serverless functions
- **Auth**: Clerk, Auth0, Firebase Auth, or NextAuth.js
- **Database**: Supabase, MongoDB Atlas, or PostgreSQL
- **Hosting**: Vercel, Netlify, or AWS with proper security groups

## Current Setup Instructions

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Change default credentials in `.env`:
   ```
   VITE_ADMIN_USERNAME=your_username
   VITE_ADMIN_PASSWORD=your_secure_password
   ```

3. **Never commit `.env` to version control** (already in `.gitignore`)

## Disclaimer

The current authentication is suitable for:
- Personal portfolios where security is not critical
- Development and testing environments
- Proof-of-concept demonstrations

It is **NOT suitable for**:
- Production environments
- Multi-user systems
- Handling sensitive data
- Public-facing admin panels

Use at your own risk and implement proper backend authentication before deploying to production.
