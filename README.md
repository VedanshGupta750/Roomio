<p align="center">
  <img src="https://img.icons8.com/color/96/home--v1.png" alt="Roomio Logo" width="80"/>
</p>

<h1 align="center">🏠 Roomio</h1>

<p align="center">
  <em>A full-stack vacation rental marketplace — Discover, list & review unique stays around the world.</em>
</p>

<p align="center">
  <a href="https://roomio-mvxc.onrender.com/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-roomio--mvxc.onrender.com-fe424d?style=for-the-badge" alt="Live Demo"/>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white&style=flat-square" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white&style=flat-square" alt="Express"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white&style=flat-square" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white&style=flat-square" alt="Bootstrap"/>
  <img src="https://img.shields.io/badge/Mapbox-GL_JS-4264FB?logo=mapbox&logoColor=white&style=flat-square" alt="Mapbox"/>
  <img src="https://img.shields.io/badge/Cloudinary-Image_CDN-3448C5?logo=cloudinary&logoColor=white&style=flat-square" alt="Cloudinary"/>
  <img src="https://img.shields.io/badge/Passport.js-Auth-34E27A?logo=passport&logoColor=white&style=flat-square" alt="Passport.js"/>
  <img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License"/>
</p>

---

## 📸 Screenshots

| Homepage with Category Filters | Listing Detail with Map & Reviews |
|:---:|:---:|
| ![Homepage](https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=400&q=60) | ![Detail Page](https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60) |

> 🌐 **See it live:** [https://roomio-mvxc.onrender.com/](https://roomio-mvxc.onrender.com/)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** — Secure sign-up/login powered by Passport.js with Local Strategy
- **Session Management** — Persistent sessions stored in MongoDB via `connect-mongo` (7-day cookie expiry)
- **Owner Authorization** — Only listing owners can edit or delete their listings
- **Review Authorization** — Only review authors can delete their reviews
- **Post-login Redirect** — Users are redirected back to the page they originally requested after login

### 🏡 Listing Management (Full CRUD)
- **Create Listings** — Add new properties with title, description, price, location, country, category & image upload
- **Read / Browse** — View all listings in a responsive card grid with image previews and per-night pricing
- **Update Listings** — Edit listing details and replace images (with Cloudinary image transformation)
- **Delete Listings** — Remove listings along with all associated reviews (cascade delete via Mongoose middleware)

### 🔍 Search & Filter
- **Destination Search** — Search by title, location, or country with case-insensitive regex matching
- **Category Filtering** — Filter listings across **12 unique categories:**

| Category | Icon | Category | Icon |
|----------|------|----------|------|
| 🔥 Trending | `fa-fire` | 🏖️ Beaches | `fa-umbrella-beach` |
| 🛏️ Rooms | `fa-bed` | ⛰️ Mountain | `fa-mountain` |
| 🏙️ Iconic Cities | `fa-city` | 🏰 Castles | `fa-fort-awesome` |
| 🏊 Pools | `fa-person-swimming` | 🏕️ Camping | `fa-campground` |
| 🌾 Farms | `fa-wheat-awn` | ❄️ Arctic | `fa-snowflake` |
| 🏁 Race | `fa-flag-checkered` | 🌙 Night Safari | `fa-moon` |

### 💰 Tax Toggle
- **GST Display** — Toggle "Display total after taxes" to show/hide an 18% GST indicator on all listings

### ⭐ Review System
- **Star Ratings** — Interactive 1–5 star rating widget (Starability CSS library)
- **Comments** — Leave detailed text reviews on any listing
- **Authored Reviews** — Each review displays the reviewer's username
- **Validated Input** — Server-side review validation via Joi schemas

### 🗺️ Interactive Maps
- **Mapbox GL JS** — Each listing displays an interactive map showing the exact location
- **Geocoding** — Automatic forward geocoding converts location names to coordinates via Mapbox SDK
- **Map Markers** — Red pin markers with popup info ("Exact location provided after booking")

### 📷 Cloud Image Storage
- **Cloudinary Integration** — All listing images are uploaded to and served from Cloudinary CDN
- **Multer Middleware** — File upload handling with `multer-storage-cloudinary`
- **Format Support** — Accepts PNG, JPG, and JPEG image formats
- **Image Optimization** — Edit page displays a 400px-wide thumbnail preview via Cloudinary transformations

### 🛡️ Data Validation & Error Handling
- **Joi Schemas** — Server-side validation for listings, update listings, and reviews
- **Custom Error Class** — `expressError` class for consistent HTTP error responses
- **Async Error Wrapper** — `wrapAsync` utility to catch and forward async errors
- **404 Handler** — Custom "Page Not Found" error page
- **Flash Messages** — Success/error notifications using `connect-flash`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js 22.x |
| **Framework** | Express.js 5.x |
| **Template Engine** | EJS + ejs-mate (layouts & partials) |
| **Database** | MongoDB Atlas (Mongoose 9.x ODM) |
| **Authentication** | Passport.js + passport-local + passport-local-mongoose |
| **Sessions** | express-session + connect-mongo (MongoDB session store) |
| **Image Upload** | Multer + multer-storage-cloudinary + Cloudinary SDK |
| **Maps** | Mapbox GL JS + @mapbox/mapbox-sdk (Geocoding) |
| **Validation** | Joi |
| **Styling** | Bootstrap 5.3 + Font Awesome 7 + Plus Jakarta Sans (Google Fonts) |
| **Deployment** | Render |

---

## 📁 Project Structure

```
Roomio/
├── app.js                  # Entry point — Express app config, DB connection, routes & middleware
├── cloudConfig.js          # Cloudinary + multer-storage-cloudinary configuration
├── middleware.js            # Auth guards, ownership checks, Joi validation middleware
├── schema.js               # Joi validation schemas (listing, updateListing, review)
├── package.json            # Dependencies & project metadata
├── .env                    # Environment variables (not committed)
├── .gitignore
│
├── models/
│   ├── listing.js          # Listing schema (title, description, image, price, location, reviews, owner, geometry, category)
│   ├── review.js           # Review schema (comment, rating, author, createdAt)
│   └── user.js             # User schema (email + passport-local-mongoose plugin)
│
├── controllers/
│   ├── listing.js          # Listing CRUD logic + Mapbox geocoding
│   ├── review.js           # Add/delete review logic
│   └── user.js             # Signup, login, logout logic
│
├── routes/
│   ├── listing.js          # RESTful listing routes with middleware chains
│   ├── review.js           # Review POST & DELETE routes
│   └── user.js             # Auth routes (signup, login, logout)
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Master layout (head, Bootstrap, Mapbox, Font Awesome, footer)
│   ├── includes/
│   │   ├── navbar.ejs      # Navigation bar with search, auth links & responsive toggle
│   │   ├── flash.ejs       # Flash message alerts
│   │   └── footer.ejs      # Site footer
│   ├── listings/
│   │   ├── listings.ejs    # All listings grid with category filters & tax toggle
│   │   ├── show.ejs        # Single listing detail with reviews, map & owner controls
│   │   ├── new.ejs         # Create new listing form
│   │   └── edit.ejs        # Edit listing form with image preview
│   ├── users/
│   │   ├── signup.ejs      # Registration form
│   │   └── login.ejs       # Login form
│   └── error.ejs           # Error display page
│
├── public/
│   ├── css/
│   │   ├── style.css       # Custom styles
│   │   └── rating.css      # Starability star-rating styles
│   └── js/
│       ├── script.js       # Bootstrap form validation
│       └── map.js          # Mapbox map initialization & marker
│
├── utils/
│   ├── expressError.js     # Custom error class
│   └── wrapAsync.js        # Async error-catching wrapper
│
└── init/
    ├── data.js             # Sample listing seed data (40+ listings worldwide)
    └── init.js             # Database seeder script
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22.x — [Download](https://nodejs.org/)
- **MongoDB Atlas** account — [Sign up free](https://www.mongodb.com/cloud/atlas)
- **Cloudinary** account — [Sign up free](https://cloudinary.com/)
- **Mapbox** account — [Sign up free](https://www.mapbox.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/VedanshGupta750/Roomio.git
cd Roomio
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages:

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `ejs` + `ejs-mate` | Templating engine with layouts |
| `passport` + `passport-local` + `passport-local-mongoose` | User authentication |
| `express-session` + `connect-mongo` | Session management |
| `cloudinary` + `multer` + `multer-storage-cloudinary` | Image upload & CDN |
| `@mapbox/mapbox-sdk` | Geocoding API |
| `joi` | Data validation |
| `method-override` | HTTP verb support (PUT, PATCH, DELETE) |
| `connect-flash` | Flash messages |
| `dotenv` | Environment variable management |

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
MAP_TOKEN=your_mapbox_public_access_token

# MongoDB Atlas Connection
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Session Secret
SECRET=your_session_secret_key
```

> **Important:** Never commit the `.env` file. It is already listed in `.gitignore`.

### 4. Seed the Database (Optional)

Populate the database with 40+ sample listings from around the world:

```bash
node init/init.js
```

### 5. Run the Application

```bash
node app.js
```

The server starts on **http://localhost:3000**

---

## 🌐 Live Demo

The application is deployed and accessible at:

### 🔗 [https://roomio-mvxc.onrender.com/](https://roomio-mvxc.onrender.com/)

Try these features on the live site:

| Action | How |
|--------|-----|
| **Browse listings** | Visit the homepage to see all available properties |
| **Filter by category** | Click any category icon (Trending, Beaches, Mountain, etc.) |
| **Search** | Type a destination in the search bar and hit Search |
| **View details** | Click any listing card to see full details, map & reviews |
| **Sign up** | Click "Sign up" in the navbar to create an account |
| **Create a listing** | Click "Rent your home" (requires login) |
| **Leave a review** | Open any listing and submit a star rating + comment (requires login) |
| **Toggle taxes** | Use the "Display total after taxes" switch on the listings page |

> ⚠️ **Note:** The app is hosted on Render's free tier. The first load may take 30–60 seconds as the server spins up from sleep.

---

## 📡 API Routes

### Listings

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| `GET` | `/listings` | List all listings (supports `?q=` search & `?category=` filter) | ❌ |
| `GET` | `/listings/new` | Render new listing form | ✅ |
| `POST` | `/listings` | Create a new listing | ✅ |
| `GET` | `/listings/:id` | Show listing details | ❌ |
| `GET` | `/listings/:id/edit` | Render edit form | ✅ (Owner) |
| `PATCH` | `/listings/:id` | Update a listing | ✅ (Owner) |
| `DELETE` | `/listings/:id` | Delete a listing | ✅ (Owner) |

### Reviews

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| `POST` | `/listings/:id/reviews` | Add a review | ✅ |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review | ✅ (Author) |

### Authentication

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/signup` | Render signup form |
| `POST` | `/signup` | Register a new user |
| `GET` | `/login` | Render login form |
| `POST` | `/login` | Authenticate user |
| `GET` | `/logout` | Log out current user |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                    │
│   EJS Templates + Bootstrap 5 + Mapbox GL JS + FA 7     │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP Requests
┌──────────────────────▼──────────────────────────────────┐
│                   EXPRESS.JS SERVER                       │
│                                                          │
│  ┌─────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │ Routes  │→ │  Middleware   │→ │   Controllers     │   │
│  │         │  │ • isLoggedIn  │  │ • listing.js      │   │
│  │ listing │  │ • isOwner     │  │ • review.js       │   │
│  │ review  │  │ • validate*  │  │ • user.js         │   │
│  │ user    │  │ • saveRedirect│  │                   │   │
│  └─────────┘  └──────────────┘  └─────────┬─────────┘   │
│                                            │             │
│  ┌─────────────────────────────────────────▼──────────┐  │
│  │                    MODELS (Mongoose)                │  │
│  │  Listing  │  Review  │  User                       │  │
│  └─────────────────────────────────────────────────────┘  │
└──────────┬──────────────┬───────────────┬────────────────┘
           │              │               │
    ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
    │  MongoDB    │ │ Cloudinary│ │   Mapbox    │
    │  Atlas      │ │   CDN     │ │  Geocoding  │
    └─────────────┘ └───────────┘ └─────────────┘
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Vedansh Gupta**

- GitHub: [@VedanshGupta750](https://github.com/VedanshGupta750)

---

<p align="center">
  <sub>⭐ If you found this project helpful, please consider giving it a star on GitHub!</sub>
</p>
