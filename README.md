# LabTech

Backend du laboratoire virtuel pour étudiants.

## Stack
- Node.js
- Express
- TypeScript
- Prisma
- SQLite
- JWT

## Scripts

```bash
npm install
npx prisma migrate dev --name init --skip-seed
npx tsx src/seed.ts
npm run dev
```

## API

- `GET /health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/modules`
- `GET /api/modules/:slug`
- `GET /api/progress/me`
- `POST /api/progress/update`
- `GET /api/users/me`
