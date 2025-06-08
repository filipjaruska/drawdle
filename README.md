# Drawdle 🎨

## About

Drawdle is a **hobby web application** that combines drawing and social interaction. Users can submit drawings for weekly challenges ("draweeks"), vote on submissions, and maintain drawing streaks.

**This is a personal learning/hobby project created for educational purposes.** It was built to explore modern web development technologies and is not intended for commercial use, production deployment, or any mission-critical applications.

## Features

- 🎨 **Weekly Drawing Challenges**: Submit drawings for themed weekly contests
- 📊 **Voting System**: Community voting on submissions
- 🔥 **Streak System**: Duolingo-inspired streak tracking for consistent participation
- 👤 **User Profiles**: Personal galleries and statistics
- 🌙 **Dark Theme**: Modern dark UI design
- 📱 **Progressive Web App**: Installable as a mobile app

## Tech Stack

This project was bootstrapped with [create-t3-app](https://create.t3.gg/) and uses:

- **Framework**: [Next.js 14](https://nextjs.org) - React framework with App Router
- **Authentication**: [Clerk](https://clerk.com) - User authentication and management
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **File Upload**: [UploadThing](https://uploadthing.com) - File upload service

## Local Development

1. Clone the repository

```bash
git clone https://github.com/yourusername/drawdle.git
cd drawdle
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Set up the database

```bash
npm run db:push
```

5. Start the development server

```bash
npm run dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
POSTGRES_URL="your_postgres_connection_string"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"

# UploadThing
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"
```

## Database Schema

The application uses a PostgreSQL database with the following main entities:

- **Users**: Managed by Clerk with metadata for streaks and permissions
- **Images**: User-uploaded artwork
- **Draweeks**: Weekly drawing challenges with topics
- **Submissions**: User submissions linking images to draweeks
- **Votes/Polling**: Community voting system for submissions

## Project Status & Disclaimers

This project is **ARCHIVED** and no longer maintained. Known issues and incomplete features include:

- Incomplete voting system
- Missing dashboard functionality
- Schema inconsistencies
- Unfinished image deletion flow
- Various UI/UX improvements needed
- Potential security vulnerabilities
- Unoptimized database queries

## License

MIT License - See [LICENSE](LICENSE) file for details.

**Additional Hobby Project Disclaimer**: This project includes additional disclaimers in the LICENSE file specifically addressing its status as a hobby/learning project not intended for production use.

## Final Notes

- This was a fun learning project exploring the T3 stack and experimenting with advanced Next.js patterns including:
  - **Parallel Routes & Intercepting Routes**: Implemented `@modal` folder structure with `(.)art/[id]` for modal overlays
  - **File Upload Systems**: Built custom upload components using UploadThing with React hooks and drag-drop functionality
  - **Server Actions**: Experimented with Next.js 14 server actions for form submissions and database mutations
  - **Modern React Patterns**: Custom hooks, portals, and client/server component boundaries
  - **Database Design**: Relational schema design with Drizzle ORM and PostgreSQL
  - **Authentication Flow**: Clerk integration with custom user metadata and role-based access
- If you're looking to build something similar, consider using this as inspiration for learning these patterns rather than a production starting point
