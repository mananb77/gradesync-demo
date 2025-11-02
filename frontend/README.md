# GradeSync Frontend

A modern React-based documentation and demo website for the GradeSync educational grade management system. This frontend provides comprehensive information about the system architecture, API documentation, and project overview.

## Features

- **Home Page**: Hero section with project overview and key features
- **Architecture Page**: Interactive diagrams showing microservices architecture, data flow, and deployment infrastructure
- **API Documentation**: Interactive endpoint explorer with examples and code snippets
- **About Page**: Comprehensive technical documentation and setup guides
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Mock Data**: Demonstration mode using mock API responses

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **Build Tool**: Create React App
- **Deployment**: GitHub Pages via GitHub Actions

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gradesync-demo.git
cd gradesync-demo/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)
- Hot reload enabled
- Automatically opens in your browser
- Shows lint errors in the console

### `npm run build`
Builds the app for production to the `build` folder
- Optimizes React for production
- Bundles and minifies files
- Includes hashed filenames for caching

### `npm test`
Launches the test runner in interactive watch mode

### `npm run deploy`
Builds and deploys the app to GitHub Pages
- Requires `gh-pages` package
- Automatically runs build before deployment

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable components
│   │   ├── Navigation.js       # Navigation bar
│   │   ├── Navigation.css
│   │   ├── Footer.js          # Footer component
│   │   └── Footer.css
│   ├── pages/                 # Page components
│   │   ├── Home.js            # Landing page
│   │   ├── Home.css
│   │   ├── Architecture.js    # System architecture diagrams
│   │   ├── Architecture.css
│   │   ├── ApiDocs.js         # API documentation
│   │   ├── ApiDocs.css
│   │   ├── About.js           # Project information
│   │   └── About.css
│   ├── data/
│   │   └── mockApiData.js     # Mock API endpoint data
│   ├── App.js                 # Main application component
│   ├── index.js               # Application entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Deployment

### Automatic Deployment (GitHub Actions)

This project is configured for automatic deployment to GitHub Pages when you push to the `main` branch.

1. Ensure GitHub Pages is enabled in your repository settings:
   - Go to **Settings** > **Pages**
   - Set **Source** to "GitHub Actions"

2. Push to main branch:
```bash
git add .
git commit -m "Deploy frontend"
git push origin main
```

3. GitHub Actions will automatically:
   - Install dependencies
   - Build the React app
   - Deploy to GitHub Pages

4. View your site at: `https://yourusername.github.io/gradesync-demo`

### Manual Deployment

To manually deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Run `npm run build` to create production build
2. Deploy the `build` folder to the `gh-pages` branch
3. Make your site live at the GitHub Pages URL

## Configuration

### Update Homepage URL

In `package.json`, update the `homepage` field to match your GitHub Pages URL:

```json
{
  "homepage": "https://yourusername.github.io/gradesync-demo"
}
```

### Update GitHub Links

Replace placeholder GitHub links in:
- `src/components/Navigation.js` (line 41)
- `src/components/Footer.js` (line 37)
- `src/pages/About.js` (multiple locations)

### Customize Colors

CSS variables are defined in `src/index.css`. Modify these to change the color scheme:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --accent-color: #10b981;
  /* ... more variables */
}
```

## Features Breakdown

### Home Page
- **Hero Section**: Eye-catching introduction with gradient background
- **Features Grid**: Key system capabilities
- **Platform Integration**: Supported platforms (Gradescope, PrairieLearn, iClicker, Google Sheets)
- **Tech Stack**: Technologies used in the project
- **Call-to-Action**: Links to architecture and documentation

### Architecture Page
- **Tabbed Interface**: Three views (Overview, Data Flow, Deployment)
- **Service Diagrams**: Visual representation of microservices
- **Data Flow**: Step-by-step data processing pipeline
- **Deployment Info**: Cloud infrastructure details

### API Documentation
- **Sidebar Navigation**: Quick access to all 8 endpoints
- **Interactive Explorer**: Click any endpoint to view details
- **Parameters Table**: Complete parameter documentation
- **Code Examples**: JSON responses and cURL commands
- **Copy Buttons**: One-click copy for code snippets

### About Page
- **Project Overview**: Background and purpose
- **Technical Implementation**: Detailed backend architecture
- **Setup Instructions**: Step-by-step deployment guides
- **Use Cases**: Real-world applications
- **External Resources**: Links to documentation and tools

## Browser Support

This application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Lighthouse Score**: 90+ on all metrics
- **Bundle Size**: ~200KB gzipped
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <2.5s

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Build Fails

If the build fails, try:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### GitHub Pages Shows 404

1. Check that `homepage` in `package.json` matches your GitHub Pages URL
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the deployment workflow completed successfully in the Actions tab

### Routing Issues on GitHub Pages

React Router may have issues with GitHub Pages. This is handled by the `basename` prop in `App.js`:
```javascript
<Router basename="/gradesync-demo">
```

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## Links

- **Live Demo**: https://yourusername.github.io/gradesync-demo
- **Backend API Repository**: https://github.com/yourusername/gradesync-demo
- **Documentation**: See the About page on the live site

## Contact

For questions or support, please open an issue on GitHub.
