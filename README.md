# EB Planty Backend API

A comprehensive RESTful API for the EB Planty plant e-commerce platform, built with Node.js and Express.js. This backend service provides complete functionality for user management, plant catalog operations, and shopping cart features with integrated API documentation.

## 🌱 Project Overview

EB Planty Backend is a robust e-commerce API designed specifically for plant retailers and enthusiasts. The platform enables:

- **User Management**: Registration, authentication, and profile management
- **Plant Catalog**: Complete CRUD operations for plant inventory
- **Shopping Cart**: Add, update, and manage plant purchases
- **Image Upload**: Cloudinary integration for plant image management
- **API Documentation**: Interactive Swagger UI for easy API exploration

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Upload**: Multer with Cloudinary storage
- **API Documentation**: Swagger (OpenAPI 3.0) with custom HTML template
- **Environment Management**: dotenv
- **Development**: Nodemon for hot reloading
- **Deployment**: Vercel (serverless)

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **MongoDB**: Local installation or MongoDB Atlas account
- **Git**: For version control

## 🚀 Installation Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Planty-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3003
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/planty-db
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/planty-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

### 4. Database Setup

Ensure MongoDB is running locally or configure your MongoDB Atlas connection string in the `.env` file.

## 📚 API Documentation

The API includes comprehensive interactive documentation powered by Swagger UI:

- **Local Development**: http://localhost:3003/api-docs
- **Production**: https://eb-project-backend-kappa.vercel.app/api-docs

### Additional Documentation Endpoints

- **Swagger JSON**: `/swagger.json` - Raw OpenAPI specification
- **Health Check**: `/` - Server status verification
- **Test Endpoint**: `/test-swagger` - Swagger configuration verification

## 🔗 Available Endpoints

### User Management (`/api/v0/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/createUser` | Register a new user |
| POST | `/loginUser` | Authenticate user login |
| GET | `/getUserAll` | Retrieve all users |
| GET | `/getSpecificUser/:email` | Get user by email |
| PUT | `/updateUser/:id` | Update user information |
| DELETE | `/deleteUser/:id` | Delete user account |
| POST | `/addToCart` | Add items to shopping cart |

### Plant Management (`/api/v0/plants`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/uploadImage` | Upload plant images |
| POST | `/create` | Add new plant to catalog |
| GET | `/getAll` | Retrieve all plants |
| GET | `/getOne/:id` | Get specific plant details |
| PUT | `/update/:id` | Update plant information |
| DELETE | `/delete/:id` | Remove plant from catalog |

## 💻 Local Development

### Start Development Server

```bash
npm run dev
```

The server will start on http://localhost:3003 with hot reloading enabled.

### Start Production Server

```bash
npm start
```

### Verify Installation

1. Visit http://localhost:3003 - Should display "Server is up & running"
2. Visit http://localhost:3003/api-docs - Should show interactive API documentation
3. Visit http://localhost:3003/swagger.json - Should return JSON API specification

## 🚀 Deployment

### Vercel Deployment

This project is optimized for Vercel deployment with custom Swagger UI configuration:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Environment Variables**: Configure the same environment variables in your Vercel dashboard.

### Deployment Features

- **Serverless Architecture**: Optimized for Vercel's serverless functions
- **CDN-Based Assets**: Swagger UI loads CSS/JS from CDN for reliable rendering
- **Custom Routing**: Configured in `vercel.json` for proper endpoint handling

### Verify Deployment

Use the included verification script:

```bash
node verify-swagger.js --url=https://your-domain.vercel.app
```

## 📁 Project Structure

```
Planty-Backend/
├── config/
│   ├── ConnectDb.js          # MongoDB connection configuration
│   └── cloudinaryConfig.js   # Cloudinary setup
├── controllers/
│   ├── UserController.js     # User-related business logic
│   ├── PlantController.js    # Plant-related business logic
│   └── CartController.js     # Shopping cart logic
├── models/
│   ├── UserModel.js          # User data schema
│   ├── PlantImageModel.js    # Plant image schema
│   ├── PlantTypes.js         # Plant type definitions
│   └── CartModel.js          # Shopping cart schema
├── routes/
│   ├── UserRoute.js          # User API endpoints with Swagger docs
│   └── PlantRoute.js         # Plant API endpoints with Swagger docs
├── uploads/plants/           # Local image storage (development)
├── Server.js                 # Main application entry point
├── appSwagger.js            # Swagger/OpenAPI configuration
├── vercel.json              # Vercel deployment configuration
├── verify-swagger.js        # Deployment verification script
└── package.json             # Project dependencies and scripts
```

## 🔧 Key Features

### Authentication & Security
- JWT-based authentication system
- Password hashing with bcrypt
- Secure user session management
- Input validation and sanitization

### File Management
- Cloudinary integration for image storage
- Multer middleware for file uploads
- Optimized image handling for plant photos

### API Documentation
- **Custom Swagger UI**: Serverless-compatible implementation
- **Interactive Testing**: Test endpoints directly from documentation
- **OpenAPI 3.0 Specification**: Industry-standard API documentation
- **CDN-Based Assets**: Reliable CSS/JS loading on all platforms

### Database Operations
- MongoDB with Mongoose ODM
- Efficient data modeling for plants and users
- Relationship management between users and cart items

## 🧪 Testing

### Manual Testing
Use the interactive Swagger UI to test all endpoints:
1. Navigate to `/api-docs`
2. Expand any endpoint section
3. Click "Try it out"
4. Fill in required parameters
5. Execute the request

### Automated Verification
Run the verification script to test all endpoints:

```bash
# Test local development
node verify-swagger.js --local

# Test production deployment
node verify-swagger.js --url=https://eb-project-backend-kappa.vercel.app
```

## 🔍 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running locally
- Check your `MONGODB_URI` in `.env`
- For Atlas, verify network access and credentials

**Port Already in Use**
```bash
Error: listen EADDRINUSE :::3003
```
- Change the `PORT` in `.env` file
- Kill existing processes: `lsof -ti:3003 | xargs kill -9`

**Swagger UI Not Loading**
- Check browser console for errors
- Verify `/swagger.json` returns valid JSON
- Ensure CDN access (cdnjs.cloudflare.com)

### Environment Variables
Ensure all required environment variables are set:
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `CLOUDINARY_*`: Image upload configuration

## 🤝 Contributing

We welcome contributions to the EB Planty Backend API! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

### Code Standards
- Follow existing code style and conventions
- Add JSDoc comments for new functions
- Update Swagger documentation for new endpoints
- Test your changes locally before submitting

### Pull Request Process
1. Update the README.md with details of changes if needed
2. Update the Swagger documentation for any new endpoints
3. Ensure all tests pass
4. Request review from maintainers

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - Document-based database
- **Swagger UI** - API documentation interface
- **Cloudinary** - Image and video management
- **Vercel** - Deployment and hosting platform

## 📞 Support

For support and questions:

- **Documentation**: Visit `/api-docs` for interactive API documentation
- **Issues**: Create an issue in the repository
- **Verification**: Use `verify-swagger.js` to test deployment

---

**Built with ❤️ for plant enthusiasts by the EB Planty team**