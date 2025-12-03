# Gerardo Lopez – Portfolio

This repository contains my personal portfolio website, built with **React + TypeScript** and **Vite**. It focuses on AWS-backed applications for education and research, including LTI 1.3 Canvas integrations, data pipelines, and other backend-heavy projects.

The site is structured as a small single-page app with multiple routes (Home, Projects, Experience, Skills, About) and is designed to be easy to update by editing typed data files.

## 🌐 Live links

- **Portfolio:** https://gerryjr.dev
- **GitHub:** https://github.com/gerryjr
- **LinkedIn:** https://linkedin.com/in/gerryjr

---

## 🧰 Tech stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS with a custom HSL-based design system
- **UI kit:** shadcn/ui (Radix-based headless components)
- **Routing:** React Router
- **State & data:** TanStack Query (React Query) for async data flows
- **Icons:** lucide-react + custom monochrome SVG tech icons
- **Tooling:** ESLint, TypeScript, PostCSS, Autoprefixer

---

## 🚀 Hosting on GitHub Pages

This site is deployed using **GitHub Pages**. The source code lives on the **`main`** branch of the repository, and a **GitHub Actions** workflow builds the Vite app and publishes the contents of `dist/` to GitHub Pages.

The instructions below assume all content is already committed to `main`.

### 1. Verify your repository on GitHub

1. Push your local project (this repo) to GitHub if you haven’t already:

   ```bash
   git add .
   git commit -m "Initial commit for portfolio"
   git branch -M main
   git remote add origin git@github.com:<username>/<repo-name>.git
   git push -u origin main
   ```

2. Replace `<username>` and `<repo-name>` with your GitHub username and repository name.

For this repo, the GitHub URL is:

```text
https://github.com/GerryJr/Portfolio-Website
```

### 2. Configure Vite base path

How you configure Vite’s `base` depends on where the site will ultimately be hosted.

- **If you use a custom domain at the root**, such as `https://gerryjr.dev`, the site is served from `/`, so your `vite.config.ts` should have:

  ```ts
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";
  import { componentTagger } from "lovable-tagger";

  export default defineConfig(({ mode }) => ({
    base: "/",
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }));
  ```

- **If you instead deploy as a GitHub project site**, such as `https://<username>.github.io/<repo-name>/`, you would use:

  ```ts
  export default defineConfig(({ mode }) => ({
    base: mode === "production" ? "/<repo-name>/" : "/",
    // ...rest of config...
  }));
  ```

For this portfolio (hosted at `https://gerryjr.dev`), the first option (`base: "/"`) is used.

### 3. Add the GitHub Actions workflow

Create a file at `.github/workflows/deploy.yml` in the root of your repo with the following contents:

```yaml
name: Deploy Vite site to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Create SPA fallback 404.html
        run: cp dist/index.html dist/404.html

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then commit and push:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow"
git push
```

### 4. Enable GitHub Pages in the repo settings

1. In your GitHub repository, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. After your next push to `main`, the `Deploy Vite site to GitHub Pages` workflow will run and publish the `dist/` build to GitHub Pages.
4. GitHub will display the live URL for the Pages site (for example `https://<username>.github.io/<repo-name>/`), even if you later attach a custom domain.

---

## 🌍 Using a Custom Domain (e.g., gerryjr.dev)

This project is hosted at **https://gerryjr.dev**, using **GitHub Pages** as the hosting provider and **Squarespace** as the domain registrar/DNS manager.

You can follow the same pattern to attach your own domain.

### 1. Set the custom domain in GitHub Pages

1. In your GitHub repository, go to **Settings → Pages**.
2. In the **Custom domain** field, enter your domain (for example `gerryjr.dev`).
3. Save. GitHub will:
   - Create or update a `CNAME` file in the repo with the domain name.
   - Show a warning until DNS is correctly configured.

For this portfolio, the custom domain is:

```text
gerryjr.dev
```

### 2. Configure DNS at your registrar (Squarespace example)

If your domain is managed by Squarespace (like `gerryjr.dev`), configure the DNS records to point at GitHub Pages.

For the **apex domain** (`gerryjr.dev`):

1. Go to your domain’s DNS settings in Squarespace.
2. Remove or edit any existing A-records that point to Squarespace’s web hosting.
3. Add **four A records**:

   - Type: `A`
   - Host / Name: `@` (or the empty/apex option)
   - Points to:

     ```text
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

These IPs are GitHub Pages’ IPv4 addresses.

For the **www subdomain** (`www.gerryjr.dev`, optional but recommended):

1. Add a **CNAME** record:
   - Type: `CNAME`
   - Host / Name: `www`
   - Points to: `<username>.github.io` (for example `gerryjr.github.io`)

Squarespace’s UI may differ slightly, but the idea is:

- `@` → four A records → GitHub Pages IPs  
- `www` → CNAME → `<username>.github.io`

### 3. Wait for DNS + HTTPS

- DNS changes can take some time to propagate (anywhere from a few minutes to several hours).
- GitHub will automatically issue and renew an HTTPS certificate for your custom domain.
- In **Settings → Pages**, ensure **“Enforce HTTPS”** is checked once it becomes available.

After DNS and HTTPS are set up, visiting:

```text
https://gerryjr.dev
```

will load the GitHub Pages build of this repository.

### 4. Making future edits

Once everything is configured, deploying updates is simple:

1. Edit React code or data files locally (for example, add a new project to `src/data/projects.ts`).
2. Commit your changes:

   ```bash
   git add .
   git commit -m "Update portfolio content"
   ```

3. Push to `main`:

   ```bash
   git push
   ```

GitHub Actions will automatically:

- Install dependencies  
- Run `npm run build`  
- Publish the new `dist/` build to GitHub Pages  

Your live site at `https://gerryjr.dev` will stay in sync with the `main` branch of this repository.

---
