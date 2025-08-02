# i_cook - Recipe & Shopping List Manager

A full-stack web application for managing recipes and automatically generating shopping lists. Built with React, Express, and Prisma.

## 🍳 Features

- **Recipe Management**: Create, view, and manage your recipe collection
- **Smart Shopping Lists**: Automatically generate shopping lists based on selected recipes
- **Ingredient Tracking**: Mark ingredients as purchased and track quantities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live updates when ingredients are checked off

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Radix UI** components for accessible UI elements
- **Lucide React** for icons
- **React Toastify** for notifications
- **Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Prisma** as ORM
- **MySQL** database
- **CORS** enabled for cross-origin requests

### Development Tools
- **Biome** for linting and formatting
- **Docker** for containerized development
- **Concurrently** for running client and server together

## 📁 Project Structure

```
i_cook/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── routes/         # Page components
│   │   ├── services/       # API service functions
│   │   ├── context/        # React context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── lib/            # Utility functions
│   └── public/             # Static assets
├── server/                 # Express backend application
│   ├── src/
│   │   ├── modules/        # Feature-based modules
│   │   │   ├── recipe/     # Recipe management
│   │   │   ├── ingredient/ # Ingredient management
│   │   │   ├── list/       # Shopping list management
│   │   │   └── aggregates/ # Cross-module operations
│   │   ├── app.ts          # Express app configuration
│   │   ├── main.ts         # Server entry point
│   │   └── router.ts       # API routes
│   └── prisma/
│       ├── schema.prisma   # Database schema
│       └── seed.ts         # Database seeding
└── compose.dev.yaml        # Docker Compose for development
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- Docker (optional, for containerized development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd i_cook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/i_cook"
   VITE_API_URL="http://localhost:3001"
   ```

4. **Set up the database**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma db:seed
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both the client (on port 3000) and server (on port 3001) concurrently.

### Using Docker (Alternative)

```bash
docker-compose -f compose.dev.yaml up
```

## 📖 Usage

### Creating Recipes
1. Navigate to "Recettes" (Recipes)
2. Click "Nouvelle recette" (New Recipe)
3. Enter recipe name and ingredients
4. Save the recipe

### Managing Shopping Lists
1. Go to "Liste" (List) to view your current shopping list
2. Add recipes to your list using the "+" button on recipe cards
3. Check off ingredients as you shop
4. Create a new list when needed

### Key Components

- **Home**: Landing page with navigation
- **Recipes**: Browse and manage your recipe collection
- **Current List**: View and manage your active shopping list
- **New Recipe**: Form to create new recipes with ingredients

## 🗄️ Database Schema

The application uses a relational database with the following main entities:

- **Recipe**: Stores recipe information
- **Ingredient**: Manages ingredient catalog with units
- **List**: Shopping lists with timestamps
- **Recipe_ingredient**: Links recipes to ingredients with quantities
- **List_ingredient**: Tracks ingredients in shopping lists with purchase status

## 🔧 API Endpoints

### Recipes
- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes/add` - Create new recipe
- `GET /api/recipes/:recipeId/:listId` - Check if recipe is in list

### Ingredients
- `GET /api/ingredients` - Get all ingredients
- `POST /api/ingredients/add` - Add new ingredient

### Lists
- `GET /api/lists/current` - Get current list ID
- `GET /api/lists/search/:id` - Get list details
- `POST /api/lists` - Create new list
- `PUT /api/lists/recipes/:id` - Add/remove recipe from list
- `PATCH /api/lists/:listId/ingredients/:ingredientId` - Update ingredient status

## 🛠️ Development

### Running Tests
```bash
# Server tests
cd server
npm test
```

### Code Quality
The project uses Biome for consistent code formatting and linting:
```bash
# Format code
npm run format

# Lint code
npm run lint
```

### Database Operations
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed with user experience and accessibility in mind
- Responsive design for all device types
