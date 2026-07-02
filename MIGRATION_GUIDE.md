# MySQL Migration Guide

This guide will help you set up the MySQL backend and run your portfolio application after migrating from Supabase.

## Prerequisites

- Node.js installed
- MySQL server installed and running
- Your portfolio React application

## Setup Instructions

### 1. Database Setup

1. Create a MySQL database named `portfolio`:
```sql
CREATE DATABASE portfolio;
```

2. Run the SQL schema to create tables:
```bash
mysql -u root -p portfolio < create-table-template.sql
```

Or use your MySQL client to execute the SQL from `create-table-template.sql`

### 2. Backend Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Edit `.env` with your MySQL credentials:
```env
PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio
JWT_SECRET=your-secret-key-change-this-in-production
UPLOAD_DIR=./uploads
```

4. Install dependencies:
```bash
npm install
```

5. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

### 3. Frontend Setup

1. In the root directory, create environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your API URL:
```env
VITE_API_URL=http://localhost:3001/api
```

3. Install dependencies (if needed):
```bash
npm install
```

4. Start the frontend:
```bash
npm run dev
```

### 4. Default Admin Login

The first time you log in, a default admin account will be created automatically:
- Email: Any email (e.g., `admin@example.com`)
- Password: `admin123`

**Important:** Change the default password in production by updating the authentication logic in `server/routes/auth.js`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify JWT token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Certificates
- `GET /api/certificates` - Get all certificates
- `POST /api/certificates` - Create certificate (admin only)
- `DELETE /api/certificates/:id` - Delete certificate (admin only)

### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create comment (public)
- `PUT /api/comments/:id` - Update comment (admin only)
- `PATCH /api/comments/:id/pin` - Pin/unpin comment (admin only)
- `DELETE /api/comments/:id` - Delete comment (admin only)

### Upload
- `POST /api/upload` - Upload single image (admin only)
- `POST /api/upload/multiple` - Upload multiple images (admin only)

## Changes Made

### Backend (New)
- Created Node.js/Express API server in `server/` directory
- Implemented JWT authentication
- Created REST API endpoints for all data operations
- Added file upload functionality with Multer
- MySQL database connection with mysql2

### Frontend (Updated)
- Replaced Supabase client with custom API client (`src/api.js`)
- Updated all components to use REST API calls
- Removed Supabase dependencies
- Added JWT token management

### Database
- Converted PostgreSQL schema to MySQL
- Removed Supabase-specific features (RLS, storage buckets, auth tables)
- Simplified table structure for MySQL compatibility

## Important Notes

1. **Real-time features**: The original Supabase real-time subscriptions have been removed. Comments will need to be refreshed manually or implement polling.

2. **File storage**: Images are now stored locally in `server/uploads/`. In production, consider using cloud storage (AWS S3, Cloudinary, etc.).

3. **Security**: 
   - Change the JWT_SECRET in production
   - Implement proper password hashing for admin users
   - Add rate limiting to API endpoints
   - Use HTTPS in production

4. **Image URLs**: Existing image URLs from Supabase storage will need to be updated or migrated to the new upload system.

## Troubleshooting

### Backend won't start
- Check MySQL is running
- Verify database credentials in `.env`
- Ensure the database exists

### Frontend can't connect to API
- Check backend is running on port 3001
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS settings in `server/server.js`

### Login fails
- Verify admin user exists in `profiles` table
- Check JWT_SECRET is set
- Review auth logs in backend console

## Next Steps for Production

1. Set up a production database
2. Implement proper password management
3. Add cloud storage for images
4. Set up process manager (PM2) for backend
5. Configure environment variables properly
6. Add SSL/HTTPS
7. Implement rate limiting and security headers
8. Set up monitoring and logging
