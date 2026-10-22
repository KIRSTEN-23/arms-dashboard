# ARMS Dashboard — frontend

See the [project README](../README.md) for features, local setup, architecture and design documentation.

From this folder: `npm run dev`, `npm run lint`, `npm run build`, or `npm run preview`.

## GitHub Pages deployment

The repository workflow builds this frontend and publishes `frontend/dist`,
which contains the generated `index.html` and assets. Do not publish the repository
root or the unbuilt `frontend` directory.

1. In repository **Settings → Pages**, select **GitHub Actions** as the source.
2. In **Settings → Secrets and variables → Actions → Variables**, set
   `VITE_API_BASE_URL` to the hosted HTTPS backend URL including `/api`.
   GitHub Pages hosts only the frontend; it cannot run the Express backend.
3. Configure the backend's `FRONTEND_URL` to match the Pages origin, for example
   `https://kirsten-23.github.io` (without the repository path).
4. Push the reviewed changes to `main`, or run the Pages workflow manually.

The workflow uses the repository name for the asset base path and hash routing
for Pages: `/arms-dashboard/#/comparison` and `/arms-dashboard/#/trends`.
Local development retains normal browser routing. The workflow refuses to publish
without a hosted API URL so the deployed application does not call localhost.
