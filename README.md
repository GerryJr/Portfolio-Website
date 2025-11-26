# Gerardo Lopez - Portfolio

Professional portfolio website showcasing AWS-backed applications for education and research.

## 🚀 Features

- **Clean, Professional Design** - Inspired by minimal academic portfolios with serif/sans-serif typography
- **Structured Project Case Studies** - Each project includes:
  - Visual tech stack with monochrome SVG icons
  - Structured content (title, role, challenges, impact)
  - Character limits for consistency
  - Accessibility-first icon implementation
- **SEO Optimized** - Open Graph tags, JSON-LD structured data, sitemap
- **Fully Accessible** - Skip links, ARIA labels, keyboard navigation, focus indicators
- **Responsive** - Mobile-first design with breakpoints for all screen sizes

## 📋 Project Structure

```
src/
├── components/
│   ├── Footer.tsx          # Auto-updating date footer
│   ├── JsonLd.tsx          # Structured data for SEO
│   ├── Layout.tsx          # Main layout wrapper
│   ├── Navigation.tsx      # Responsive nav with active states
│   ├── ProjectCard.tsx     # Project case-study card
│   └── TechIcon.tsx        # Accessible tech stack icons
├── data/
│   └── projects.ts         # Project data with validation
├── pages/
│   ├── Home.tsx           # Hero with dual CTAs
│   ├── Projects.tsx       # Project grid
│   ├── About.tsx          # About page
│   └── NotFound.tsx       # 404 page
├── types/
│   └── project.ts         # TypeScript types + validation
└── index.css              # Design system tokens
```

## 🎨 Design System

The site uses a minimal, professional design system defined in `src/index.css`:

- **Typography**: Lora (headings) + Inter (body)
- **Colors**: Neutral grays with subtle blue-gray accent
- **Icons**: Monochrome with hover states
- **Spacing**: Strict rhythm (8px, 12px increments)

All colors use HSL values and semantic tokens for consistency.

## 🧪 Project Data Validation

Each project entry is validated on import:
- No more than 4 challenges
- Stack icons and text must match 1:1
- Character limits enforced

## 📦 Tech Stack

- **React** 18 + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component primitives
- **Lucide React** - Icons
- **React Router** - Routing

## 🚀 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Adding Projects

Edit `src/data/projects.ts`:

```typescript
{
  id: "unique-id",
  title: "Project Title", // ≤ 50 chars
  whatItIs: "One sentence description", // ≤ 140 chars
  role: "Your Role",
  stackIcons: [...], // Array of tech icons
  challenges: ["Challenge 1", "Challenge 2"], // Exactly 2, ≤ 90 chars each
  impact: "Quantified impact", // 1 line with number
  links: { live?, repo?, demo? }
}
```

## 📄 Resume

Replace `public/Gerardo-Lopez-Resume.pdf` with your actual resume. The file is:
- Linked in navigation and hero
- Named for discoverability (hyphenated)
- ATS-friendly naming convention

## 🔍 SEO

- **Meta tags**: Configured in `index.html`
- **Open Graph**: Social media preview image at `/og-image.png`
- **JSON-LD**: Person schema in `JsonLd.tsx`
- **Sitemap**: Available at `/sitemap.xml`
- **Robots**: Configured in `/robots.txt`

## ♿ Accessibility

- **Skip link** for keyboard navigation
- **ARIA labels** on all interactive elements
- **Focus indicators** meet WCAG contrast requirements
- **Semantic HTML** throughout
- **Tech icons** are keyboard navigable with tooltips

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌐 Deployment

This site is optimized for GitHub Pages deployment:

1. Build: `npm run build`
2. The `dist` folder contains production assets
3. Ensure filenames match exactly (case-sensitive)
4. All routes handled by React Router

## 📊 Performance

- **Lazy loading**: Images load on-demand
- **Tree-shaking**: Only imported icons are bundled
- **Optimized fonts**: Subsetted webfonts with `display=swap`
- **Minimal bundle**: ~150KB gzipped

## 🔗 Links

- [Portfolio](https://gerryjr.github.io)
- [GitHub](https://github.com/gerryjr)
- [LinkedIn](https://linkedin.com/in/gerardolopez)

---

Built with [Lovable](https://lovable.dev) ✨
