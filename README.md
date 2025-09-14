<<<<<<< HEAD
# Earnofia-test
=======
# Earnofia – Responsive MERN UI (BookMyShow-style) 

This package contains a ready frontend (React + Bootstrap) and a basic backend (Express) with sample `/api/events` routes and placeholder images.

## Run locally
### 1) Backend
```bash
cd backend
npm install
npm run dev
```
Open http://localhost:5000 to verify.

### 2) Frontend
```bash
cd ../frontend
npm install
npm start
```
Visit http://localhost:3000

## Edit Sections
- Sidebar/header shell: `frontend/src/components/Shell.jsx`
- Hero banner carousel: `frontend/src/components/HeroCarousel.jsx`
- Home sections (Trending/Happening): `frontend/src/pages/Home.jsx` + `frontend/src/components/SectionRow.jsx`
- Explore page & search: `frontend/src/pages/Explore.jsx`
- Event detail page: `frontend/src/pages/EventDetail.jsx`

## Connect Mongo later
Replace in-memory sample in `backend/routes/events.js` with real Mongo queries.
>>>>>>> 643c721 (Qr project first commit)
