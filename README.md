# SafeHaven

Spring Boot + React platform where the public reports people in need (photo + location), and NGO staff and volunteers pick up the cases and take them to orphanages and old-age homes.

- `src/` Spring Boot 3 (Java 21) REST API, JPA, Postgres (H2 fallback for local runs)
- `frontend/` React + Vite app

## Config (env vars)
`DB_URL` (jdbc url), `DB_USER`, `DB_PASSWORD`, optional `MAIL_USERNAME`, `MAIL_PASSWORD`, `PORT`.
Frontend: `VITE_API_URL` = backend base URL.
