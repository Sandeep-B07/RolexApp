# Rolex-App — Luxury Watch Boutique

A Rolex-style luxury watch catalogue built with **Java (Spring Boot)** backend, **React + Tailwind CSS** frontend and **PostgreSQL** database.

```
Rolex_App/
├── backend/                  # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/rolexapp/backend/
│       │   ├── RolexBackendApplication.java
│       │   ├── config/CorsConfig.java
│       │   ├── controller/WatchController.java     # REST endpoints
│       │   ├── service/WatchService.java           # filtering + sorting logic
│       │   ├── repository/WatchRepository.java     # JPA + Specifications
│       │   ├── model/Watch.java                    # JPA entity
│       │   ├── dto/WatchSearch.java                # filter parameters
│       │   └── exception/GlobalExceptionHandler.java
│       └── resources/
│           ├── application.properties              # DB config
│           └── data.sql                            # 15 sample Rolex-style watches
└── frontend/                 # React + Vite + Tailwind
    ├── package.json
    ├── vite.config.js        # proxies /api -> backend
    ├── tailwind.config.js
    └── src/
        ├── App.jsx           # routing
        ├── api.js            # axios client
        ├── components/       # Navbar, Footer, Hero, WatchCard, WatchForm
        └── pages/            # Home, Watches, WatchDetail, Admin
```

## Features

**Like Rolex.com:**
- Cinematic hero section with luxury serif branding (black / gold palette)
- Featured timepieces on the homepage
- Collection showcase (Submariner, Daytona, Datejust, GMT-Master II…)
- Full watch catalogue with **search, collection/category filters, price filter and sorting**
- Rich watch detail pages with full technical specifications (case, movement, power reserve, water resistance…)
- **Admin dashboard** to **create / edit / delete** watches (`/admin`)

**Backend API (`http://localhost:8080/api/watches`):**
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/watches` | List all — supports `search`, `collection`, `category`, `minPrice`, `maxPrice`, `sort` (`price-asc`, `price-desc`, `name`, `newest`) |
| GET | `/api/watches/featured` | Featured watches |
| GET | `/api/watches/collections` | Distinct collection names |
| GET | `/api/watches/categories` | Distinct categories |
| GET | `/api/watches/{id}` | Single watch |
| POST | `/api/watches` | Create watch (JSON body, validated) |
| PUT | `/api/watches/{id}` | Update watch |
| DELETE | `/api/watches/{id}` | Delete watch |

Example: `GET /api/watches?collection=Submariner&sort=price-asc&maxPrice=20000`

## Prerequisites

- **Java 8+** (17+ recommended) — currently installed: Java 8
- **Maven 3.8+** (or use your IDE's built-in Maven)
- **Node.js 18+** — installed: v24
- **PostgreSQL 12+** running locally

## Setup

### 1. Database

```sql
CREATE DATABASE rolexdb;
```

Then edit `backend/src/main/resources/application.properties` if your
PostgreSQL username/password differs from `postgres/postgres`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/rolexdb
spring.datasource.username=postgres
spring.datasource.password=postgres
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080** and seeds 15 sample watches on first run (via `data.sql`, idempotent).

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** (Vite proxies `/api` calls to the backend automatically).

> If `npm` gives an execution-policy error on Windows, run once:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Usage

- `/` — homepage (hero, featured watches, collections)
- `/watches` — full catalogue with filters
- `/watches/:id` — watch detail page with specifications
- `/admin` — management dashboard (add/edit/delete watches, toggle "featured")
- `/admin?edit=new` — straight to the create form

## 🚀 Deploy it for free (public URL for anyone)

Fully free stack (no credit card needed): **Neon** (database) + **Render** (Java backend) + **Vercel or Netlify** (frontend).

> The free Render instance "sleeps" after 15 minutes of inactivity and wakes on the next request (~30–60 s first load). Optional: keep it awake with a free UptimeRobot ping every 5 min.

### Step 0 — Push the code to GitHub
Render / Vercel / Netlify deploy straight from a Git repo:

```bash
cd D:\Rolex_App
git init
git add .
git commit -m "Rolex app initial commit"
# create a new repo at github.com/new, then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

### Step 1 — Free PostgreSQL database (Neon)
1. Go to [neon.tech](https://neon.tech) → Sign in with GitHub → **Create Project** (Free tier).
2. Copy the connection string:
   `postgres://user:password@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. You'll need it in **Step 2** as a JDBC URL: replace `postgres://` with `jdbc:postgresql://` and remove the `user:password@` part (credentials go into separate env vars):
   ```
   jdbc:postgresql://ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### Step 2 — Backend on Render (free)
1. [render.com](https://render.com) → **New +** → **Web Service** → connect your GitHub repo.
2. Environment: **Docker**. Set:
   - **Docker Context:** `backend`
   - **Dockerfile Path:** `backend/Dockerfile`
3. Instance type: **Free**.
4. Add environment variables (from Step 1):
   - `SPRING_DATASOURCE_URL` = `jdbc:postgresql://ep-xxxx.../neondb?sslmode=require`
   - `SPRING_DATASOURCE_USERNAME` = your Neon user (e.g. `rolex_user`)
   - `SPRING_DATASOURCE_PASSWORD` = your Neon password
5. Click **Deploy**. When done, your API is at:
   `https://your-service-name.onrender.com/api/watches`

### Step 3 — Frontend on Vercel (or Netlify)
**First** edit `frontend/vercel.json` (or `netlify.toml`) and replace
`https://YOUR-RENDER-SERVICE.onrender.com` with the URL from Step 2, commit and push.

**Vercel:** [vercel.com](https://vercel.com) → Add New Project → import the repo →
set **Root Directory** to `frontend` → **Deploy** → open the `.vercel.app` link.

**Netlify:** [netlify.com](https://netlify.com) → New site from Git → import repo →
Build command: `npm run build` · Publish dir: `frontend/dist` · Base dir: `frontend`.

The `/api/*` requests are automatically proxied to your Render backend (see `vercel.json` / `netlify.toml`), and CORS is open, so everything works from any domain.

### Alternative options
- **Quickest (temporary):** keep the app running on this PC and expose it with **Cloudflare Tunnel** (`cloudflared tunnel --url http://localhost:8080`) or **ngrok** — free public link that dies when the PC turns off.
- **Simplest all-in-one (not permanently free):** [Railway.app](https://railway.app) deploys backend + Postgres in one click using its $5 free trial credit.
- **Truly free forever (advanced):** Oracle Cloud Always-Free VM (needs a credit card for verification) — run Docker + Postgres there.

## Notes

- The project targets **Java 8** (Spring Boot 2.7) so it runs on the current machine; it also works unchanged on Java 17+.
- Watch images load from Unsplash URLs stored in the database — replace them in the Admin panel or `data.sql` with your own product photos.
- This is a demo/learning project inspired by Rolex's catalogue design.
