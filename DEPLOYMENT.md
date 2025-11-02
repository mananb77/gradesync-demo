# GradeSync Deployment Guide

Complete guide for deploying the GradeSync frontend to GitHub Pages with GitHub Actions.

## Quick Start

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Test locally
npm start
# Visit http://localhost:3000

# 3. Build for production
npm run build

# 4. Deploy to GitHub Pages (automatic via GitHub Actions)
git add .
git commit -m "Deploy frontend to GitHub Pages"
git push origin main
```

## Prerequisites

- [x] Node.js 16+ installed
- [x] npm 8+ installed
- [x] Git configured
- [x] GitHub account
- [x] Repository access

## Step-by-Step Deployment

### 1. Configure GitHub Repository

#### Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** > **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

#### Update Repository Settings

In `frontend/package.json`, update the `homepage` field:

```json
{
  "homepage": "https://YOUR-USERNAME.github.io/gradesync-demo"
}
```

Replace `YOUR-USERNAME` with your actual GitHub username.

### 2. Update GitHub Links

Update the following files to use your actual GitHub repository URL:

**`frontend/src/components/Navigation.js`** (line ~41):
```javascript
href="https://github.com/YOUR-USERNAME/gradesync-demo"
```

**`frontend/src/components/Footer.js`** (line ~37):
```javascript
href="https://github.com/YOUR-USERNAME/gradesync-demo"
```

**`frontend/src/pages/About.js`** (multiple locations):
```javascript
href="https://github.com/YOUR-USERNAME/gradesync-demo"
```

### 3. Local Development & Testing

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start development server
npm start

# App opens at http://localhost:3000
```

Test the following:
- [x] Home page loads correctly
- [x] Navigation works between all pages
- [x] Architecture diagrams render properly
- [x] API documentation is interactive
- [x] About page displays correctly
- [x] Responsive design works on mobile

### 4. Build & Deploy

#### Option A: Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys when you push to the `main` branch.

```bash
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
```

**GitHub Actions will automatically:**
1. Install Node.js and dependencies
2. Build the React application
3. Deploy to GitHub Pages
4. Make your site live at `https://YOUR-USERNAME.github.io/gradesync-demo`

**Monitor deployment:**
1. Go to your repository on GitHub
2. Click **Actions** tab
3. Watch the "Deploy Frontend to GitHub Pages" workflow
4. Green checkmark = successful deployment

#### Option B: Manual Deployment

If you prefer manual deployment:

```bash
cd frontend

# Install gh-pages package (if not already installed)
npm install --save-dev gh-pages

# Build and deploy
npm run deploy
```

This will:
1. Build the production version
2. Push to the `gh-pages` branch
3. Deploy to GitHub Pages

### 5. Verify Deployment

1. Visit `https://YOUR-USERNAME.github.io/gradesync-demo`
2. Check all pages:
   - Home (/)
   - Architecture (/architecture)
   - API Docs (/api)
   - About (/about)
3. Verify navigation works
4. Test responsive design on mobile

## GitHub Actions Workflow

The deployment workflow is defined in `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
      - '.github/workflows/deploy.yml'

# Builds React app and deploys to GitHub Pages
```

**Triggers:**
- Push to `main` branch
- Changes in `frontend/` directory
- Changes to the workflow file itself
- Manual trigger via GitHub UI

**Permissions Required:**
- `contents: read` - Read repository files
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Generate deployment token

## Troubleshooting

### Issue: Build Fails

**Solution:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: GitHub Pages Shows 404

**Causes & Solutions:**

1. **Wrong homepage URL:**
   - Check `package.json` `homepage` field
   - Must match `https://YOUR-USERNAME.github.io/gradesync-demo`

2. **GitHub Pages not enabled:**
   - Go to Settings > Pages
   - Set source to "GitHub Actions"

3. **Deployment failed:**
   - Check Actions tab for errors
   - Review workflow logs

### Issue: Routing Doesn't Work

**Solution:**

React Router is configured with `basename="/gradesync-demo"` in `src/App.js`:

```javascript
<Router basename="/gradesync-demo">
```

If you renamed the repository, update this line.

### Issue: Assets Not Loading

**Solution:**

Ensure all imports use relative paths:
```javascript
// Good
import logo from './logo.png';

// Bad
import logo from '/logo.png';
```

## Advanced Configuration

### Custom Domain

To use a custom domain:

1. Add `CNAME` file to `frontend/public/`:
   ```
   www.yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`

3. Update `package.json`:
   ```json
   {
     "homepage": "https://www.yourdomain.com"
   }
   ```

### Environment Variables

For production environment variables:

1. Create `.env.production` in `frontend/`:
   ```
   REACT_APP_API_URL=https://your-api.com
   ```

2. Use in code:
   ```javascript
   const apiUrl = process.env.REACT_APP_API_URL;
   ```

### Build Optimization

Optimize the build:

```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build -- --stats

# Remove unused dependencies
npm prune

# Update dependencies
npm update
```

## Production Checklist

Before deploying to production:

- [ ] Update all GitHub links to your repository
- [ ] Update `homepage` in `package.json`
- [ ] Test all pages locally
- [ ] Verify responsive design
- [ ] Check for console errors
- [ ] Test navigation between pages
- [ ] Verify API documentation examples
- [ ] Ensure architecture diagrams render
- [ ] Check external links work
- [ ] Run production build locally
- [ ] Review GitHub Actions permissions
- [ ] Enable GitHub Pages in settings
- [ ] Test deployed site after first deployment

## Continuous Deployment

Once set up, your deployment workflow is:

```bash
# 1. Make changes
# Edit files in frontend/src/

# 2. Test locally
npm start

# 3. Commit and push
git add .
git commit -m "Your changes"
git push origin main

# 4. Wait for automatic deployment
# Check GitHub Actions tab

# 5. Verify at https://YOUR-USERNAME.github.io/gradesync-demo
```

## Security Notes

1. **Never commit secrets:**
   - Use `.gitignore` for sensitive files
   - Use GitHub Secrets for API keys

2. **CORS Configuration:**
   - If connecting to a real backend API
   - Configure CORS to allow your GitHub Pages domain

3. **Content Security Policy:**
   - Consider adding CSP headers for production

## Support

- **GitHub Issues**: https://github.com/YOUR-USERNAME/gradesync-demo/issues
- **Frontend README**: `frontend/README.md`
- **GitHub Pages Docs**: https://docs.github.com/pages

## Next Steps

After successful deployment:

1. **Share Your Site:**
   - Add link to repository README
   - Share with team or stakeholders

2. **Monitor Performance:**
   - Use Lighthouse for performance audits
   - Check Google Analytics (if configured)

3. **Iterate:**
   - Make updates as needed
   - Push to main for automatic deployment

4. **Backend Integration:**
   - Deploy FastAPI backend to cloud platform
   - Update API calls to use production URL
   - Configure CORS on backend

---

**Deployment URL Template:**
```
https://YOUR-USERNAME.github.io/gradesync-demo
```

**Repository URL Template:**
```
https://github.com/YOUR-USERNAME/gradesync-demo
```

Happy deploying! 🚀
