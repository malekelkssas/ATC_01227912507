<div align="center">

# 🦆 QuackSeats Backend

</div>

## 📋 Prerequisites

- Node.js 20 or higher
- MongoDB
- npm or yarn

### MongoDB Installation

1. **Download MongoDB Community Server & Install**
   - Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Select your operating system
   - Download the latest version


2. **Verify Installation**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # You should see the MongoDB shell
   ```

## 📦 Local Setup & Running

1. **Install Node.js 20**
   - Download and install from [Node.js official website](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version  # Should show v20.x.x
     npm --version   # Should show 9.x.x or higher
     ```

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>/BE
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3000                    # Port number for the server
   NODE_ENV=development         # Environment (development/production)

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/quackseats  # MongoDB connection string

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_here    # Secret key for JWT token generation
   JWT_EXPIRES_IN=7d                  # JWT token expiration time

   # Admin Configuration (Optional - defaults provided)
   ADMIN_EMAIL=admin@admin.com        # Default admin email
   ADMIN_PASSWORD=Admin@123           # Default admin password
   ```

5. **Start the application in development mode**
   ```bash
   npm run dev
   ```

6. **Start the application in production mode**
   ```bash
   npm run build
   ```
   then 
   ```bash
   npm start
   ```

## 👤 Default Admin User

When the application starts for the first time with an empty database, a default admin user is automatically created with the following credentials:

```
Email: admin@admin.com
Password: Admin@123
```

You can change these default credentials by setting the following environment variables:
- `ADMIN_EMAIL`: Custom admin email
- `ADMIN_PASSWORD`: Custom admin password


2. **Environment Setup**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/quackseats

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=7d
   ```



4. **Access the Application**
   - Backend API: http://localhost:3000

## 🔧 Available Scripts

- `npm start` - Start the application
- `npm run dev` - Start the application in development mode with hot reload
- `npm run build` - Build the TypeScript code
- `npm test` - Run tests

## 📝 Notes

- The application runs on port 3000 by default


## Data Schema/Models

```mermaid
erDiagram
    USER {
        string _id
        string name
        string email
        string password
        string role
    }

    EVENT {
        string _id
        string name
        string description
        string category
        string venue
        string imageUrl
        number price
        date date
    }

    BOOKING {
        string _id
        string userId
        string eventId
        date bookedAt
    }

    TAG {
        string _id
        string name
        string color
    }

    EVENT_TAG {
        string eventId
        string tagId
    }

    USER ||--o{ BOOKING : makes
    EVENT ||--o{ BOOKING : is_for
    EVENT ||--o{ EVENT_TAG : has
    TAG ||--o{ EVENT_TAG : used_in
```

---

## 🗂️ Backend Structure

The backend follows a clean, scalable architecture:

```
BE/
├── src/
│   ├── controllers/   # Handle HTTP requests & responses
│   ├── models/        # Mongoose schemas & models
│   ├── routes/        # API endpoint definitions
│   ├── services/      # Business logic layer
│   ├── repository/    # Data access layer (DB queries & operations)
│   ├── middlewares/   # Auth, error handling, etc.
│   ├── utils/         # Reusable helpers & constants
│   ├── config/        # Configuration & DB setup
│   ├── types/         # Shared TypeScript types & interfaces
│   └── index.ts       # Entry point for Express app
├── uploads/           # Uploaded files
│   └── events/        # Event images
├── tests/            # Test files
│   ├── fixtures/     # Test data fixtures
│   ├── integration/  # API integration tests
│   └── seeds/        # Database seeding utilities
├── .env.example      # Example environment variables
├── .env              # Environment variables
└── package.json      # Project dependencies
```

---

## 🔒 Security Measures

The backend implements several security layers to protect against common vulnerabilities:

- **CORS Protection**: Configurable CORS policy to control cross-origin requests
- **Rate Limiting**: Limits requests to 300 per minute per IP to prevent abuse
- **Helmet**: Sets various HTTP headers for security
- **Request Size Limit**: Limits JSON payload size to 10kb
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **XSS Protection**: Sanitizes user input to prevent cross-site scripting attacks

---

## 🚨 Error Handling

The backend implements a robust error handling system with centralized error management:

### Global Error Handler

A global error handler middleware ([`error-handler.middleware.ts`](./src/middlewares/error-handler.middleware.ts)) processes all errors and returns consistent error responses:

```ts
// Example error response format
{
    message: string
}
```

### Mongoose Error Handling

Specialized handling for common Mongoose errors, inspired by [Sling Academy's guide](https://www.slingacademy.com/article/how-to-handle-errors-in-mongoose-an-in-depth-guide/):

- **Validation Errors**: Schema validation failures
- **Cast Errors**: Invalid ObjectId or type mismatches
- **Duplicate Key Errors**: Unique index violations

```ts
// Example: Handling Mongoose errors
try {
    await user.save();
} catch (error) {
    const response = handleMongooseError(error);
    // Returns formatted error response
}
```

### Custom Error Classes

The system uses custom error classes for different scenarios:

- `AppError`: Base error class for application errors
- `DatabaseError`: Database-specific errors
- `ValidationError`: Input validation errors
- `NotFoundError`: Resource not found errors

---

## 🏗️ Repository Pattern & Atomic Transactions

### Generic Repository for Mongoose

To promote code reuse and consistency, I implement a **generic repository class** for common Mongoose operations (CRUD). This approach is inspired by [this article](https://medium.com/@erickwendel/generic-repository-with-typescript-and-node-js-731c10a1b98e).

> **Snapshot:**  
> See [`src/types/repository.ts`](./src/types/repository.ts)
> ```ts
> export abstract class BaseRepository<T extends Document> {
>   protected model: Model<T>;
>   constructor(model: Model<T>) { this.model = model; }
>   async create(item: Partial<T>): Promise<T> { return this.model.create(item); }
> }
> ```

This pattern allows all repositories to inherit common logic, reducing duplication and improving maintainability.

---

### Singleton Pattern in Services & Repositories & Controllers

To ensure single instances of services, repositories and controllers throughout the application lifecycle, I implement the **Singleton pattern**. This approach:
- Maintains consistent state
- Reduces memory usage
- Prevents multiple database connections
- Ensures proper dependency management

**Example: Repository Singleton Implementation**
```ts
export class UserRepository extends BaseRepository<IUser> {
    private static userRepository: UserRepository;

    private constructor() {
        super(User);
    }

    static getInstance() {
        if (!UserRepository.userRepository) {
            UserRepository.userRepository = new UserRepository();
        }
        return UserRepository.userRepository;
    }
}
```

**Example: Service Singleton Implementation**
```ts
export class UserService {
    private static userService: UserService;

    static getInstance() {
        if (!UserService.userService) {
            UserService.userService = new UserService();
        }
        return UserService.userService;
    }
}
```

This pattern ensures that:
1. Only one instance of each service/repository/controller exists
2. The instance is created lazily (only when first needed)
3. All subsequent requests get the same instance
4. Dependencies are properly managed across the application

---

### Atomic Operations with Transactions

I use an **atomic approach** for database operations: either all changes succeed, or none are applied. This is achieved by wrapping requests in a MongoDB transaction using a middleware.

> **Snapshot:**  
> See [`src/middlewares/transaction.middleware.ts`](./src/middlewares/transaction.middleware.ts)
> ```ts
> export const transactionMiddleware = (req, _, next) => {
>   mongoose.startSession().then((session) => {
>     session.startTransaction();
>     req.session = session;
>     next();
>   });
> };
> ```

This ensures data consistency and integrity, especially for multi-step operations.

---

## 🧩 Request Validation with Zod (DTO-like)

To ensure robust and type-safe validation of incoming requests, this project uses [Zod](https://zod.dev/) schemas. Zod acts as a runtime validator and can serve as a replacement for traditional DTOs (Data Transfer Objects) found in frameworks like Java Spring or NestJS.

**Example: User DTO Validation with Zod**

```ts
// src/types/dtos/user.dto.ts
import { UserRoleEnum } from '../enums';
import { z } from 'zod';

export const CreateUserZod = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be less than 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  role: z.literal(UserRoleEnum.USER),
});

export type CreateUserDto = z.infer<typeof CreateUserZod>;
```

---

## 🏷️ Experimental Decorators (Inspired by Java Spring & NestJS)

Inspired by technologies I use in university and industry—such as **Java Spring** (where they're called "annotations") and **NestJS** (where they're called "decorators")—I decided to experiment with TypeScript's.

**Example: Database Error Handling Decorator**

```ts
import { DatabaseError } from "@/utils";

export function WrapDatabaseError(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (error: any) {
      throw new DatabaseError(error);
    }
  };
  return descriptor;
}
```

Use this decorator on repository methods to automatically catch and wrap any thrown errors:

```ts
class UserRepository {
  @WrapDatabaseError
  async createUser(data: CreateUserDto) {
    // ... database logic ...
  }
}
```

> **Reference:** [TypeScript Decorators Handbook](https://www.typescriptlang.org/docs/handbook/decorators.html)

---

## 🧪 Testing

The backend implements a robust testing strategy using Jest and Supertest for API testing. The tests are designed to be isolated, repeatable, and maintainable.

### Test Structure

```
tests/
├── fixtures/     # Test data fixtures
├── integration/  # API integration tests
├── seeds/        # Database seeding utilities
└── setup.ts      # Global test configuration
```

### Test Environment

Tests run in an isolated environment using:
- **In-Memory MongoDB**: Using `mongodb-memory-server` to create a temporary database
- **Test Data Seeding**: Pre-populated test data for consistent test scenarios
- **Environment Isolation**: Tests run with `NODE_ENV=test` to prevent affecting production data

### Testing Approach

#### AAA Pattern (Arrange-Act-Assert)

All tests follow the AAA pattern for clear structure and readability:

```typescript
describe('Auth APIs', () => {
    it('should login a user successfully', async () => {
        // Arrange
        const signInDto: SignInDto = {
            email: UserFixture.userData.email!,
            password: UserFixture.userData.password!
        };

        // Act
        const response = await request(app)
            .post(loginRoute)
            .send(signInDto);
        const signInResponse: SignInResponseDto = response.body;

        // Assert
        expect(response.status).toBe(HTTP_STATUS_CODE.OK);
        expect(signInResponse.user).toBeDefined();
        expect(signInResponse.token).toBeDefined();
    });
});
```

### Test Setup

The test environment is configured in `setup.ts`:

```typescript
beforeAll(async () => {
    // Disconnect from any existing connections
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
    
    // Create in-memory MongoDB instance
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
});

beforeEach(async () => {
    // Clear all collections before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }

    // Seed fresh test data
    await setupTestData();
});
```

### Test Data Seeding

Test data is managed through a seeding system:

```typescript
// tests/seeds/data/user.seed.ts
export const seedUsers = async () => {
    try {
        await Promise.all([
            new User(UserFixture.userData).save(),
            new User(UserFixture.userData2).save(),
            new User(UserFixture.adminData).save()
        ]);
    } catch (error) {
        console.error("Error seeding users:", error);
        throw error;
    }
}
```

### Integration Testing

The project focuses on API-level integration testing, ensuring that:
- HTTP endpoints work as expected
- Request/response cycles are properly handled
- Authentication flows are secure
- Error cases are properly managed
- Data validation works end-to-end

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

The project maintains high test coverage with:
- Comprehensive API endpoint testing
- Authentication flow validation
- Error case handling
- Input validation testing
- Edge case coverage